function Axios(instanceConfig) {
  this.defaults = instanceConfig
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}

Axios.prototype.request = function request(config) {
  config = mergeConfig(this.defaults, config)

  // filter out skipped interceptors
  var requestInterceptorChain = []
  var synchronousRequestInterceptors = true
  this.interceptors.request.forEach(function unshiftRequestInterceptors(
    interceptor
  ) {
    if (
      typeof interceptor.runWhen === 'function' &&
      interceptor.runWhen(config) === false
    ) {
      return
    }

    synchronousRequestInterceptors =
      synchronousRequestInterceptors && interceptor.synchronous

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected)
  })

  var responseInterceptorChain = []
  this.interceptors.response.forEach(function pushResponseInterceptors(
    interceptor
  ) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected)
  })

  var promise

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined]

    Array.prototype.unshift.apply(chain, requestInterceptorChain)
    chain.concat(responseInterceptorChain)

    promise = Promise.resolve(config)
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift())
    }

    return promise
  }

  var newConfig = config
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift()
    var onRejected = requestInterceptorChain.shift()
    try {
      newConfig = onFulfilled(newConfig)
    } catch (error) {
      onRejected(error)
      break
    }
  }

  try {
    promise = dispatchRequest(newConfig)
  } catch (error) {
    return Promise.reject(error)
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(
      responseInterceptorChain.shift(),
      responseInterceptorChain.shift()
    )
  }

  return promise
}

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config)
  return buildURL(config.url, config.params, config.paramsSerializer).replace(
    /^\?/,
    ''
  )
}

// Provide aliases for supported request methods
utils.forEach(
  ['delete', 'get', 'head', 'options'],
  function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function (url, config) {
      return this.request(
        mergeConfig(config || {}, {
          method: method,
          url: url,
          data: (config || {}).data
        })
      )
    }
  }
)

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(
      mergeConfig(config || {}, {
        method: method,
        url: url,
        data: data
      })
    )
  }
})

module.exports = Axios
