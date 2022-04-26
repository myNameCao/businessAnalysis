const Koa = require('koa')
var Router = require('koa-router')
const app = new Koa()
console.log(process.pid)

var router = new Router()

// router.all('/*', async (ctx, next) => {
//   console.log(ctx)
//   // *代表允许来自所有域名请求
//   // ctx.set('Access-Control-Allow-Origin', '*') // 允许跨域
//   // ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE') //  允许的方法
//   // ctx.set('Access-Control-Allow-Headers', 'Content-Type') // 允许 head 的字段
//   await next()
// })
router.get('/anotherService', ctx => {
  ctx.body = { code: 0, msg: '这是8003端口返回的' }
})

app
  .use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    // ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    )
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

    if (ctx.method == 'OPTIONS') {
      ctx.body = 200
    } else {
      await next()
    }
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8003, () => {
    console.log('appB running at port 8003')
  })
