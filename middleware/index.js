class MiddleWare {
  constructor() {
    this.queue = []
  }
  use(fn) {
    this.queue.push(fn)
    return this
  }
  compose() {
    const middleware = this.queue
    if (!Array.isArray(middleware))
      throw new TypeError('Middleware stack must be an array!')
    for (const fn of middleware) {
      if (typeof fn !== 'function')
        throw new TypeError('Middleware must be composed of functions!')
    }
    return function (context, next) {
      // last called middleware #
      let index = -1
      return dispatch(0)
      function dispatch(i) {
        if (i <= index)
          return Promise.reject(new Error('next() called multiple times'))
        index = i
        let fn = i === middleware.length ? next : middleware[i]
        if (!fn) return Promise.resolve()
        try {
          return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
  }
}

module.exports = MiddleWare
