let MiddleWare = require('./middlewares.js')

let instance = function () {
  //初始化
  let middleware = new MiddleWare()

  middleware.use(async function (ctx, next) {
    console.log('step 001')
    ctx.info = 'go through middleware1'
    await next()
    console.log('step 006')
  })

  middleware.use(async function (ctx, next) {
    console.log('step 002')
    await next()
    console.log('step 005')
  })

  middleware.use(async function (ctx, next) {
    console.log('step 003')
    await next()
    console.log('step 004')
  })
  middleware.start = middleware.compose()
  return middleware
}
let a = {}
instance()
  .start(a)
  .then(res => {
    console.log(a)
  })
  .catch(err => {
    console.log(err)
  })
