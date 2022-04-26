const Koa = require('koa')
const serve = require('koa-static')
var Router = require('koa-router')
const app = new Koa()

console.log(process.pid)

app.use(serve('public/'))

var router = new Router()

router.get('/login', (ctx, next) => {
  ctx.cookies.set('user', 'jay', { maxAge: 2000000, httpOnly: true })
  ctx.body = { code: 0, message: '登录成功' }
})

// // 此接口是检测`cookie`是否设置成功，如果设置成功的话，浏览器会自动携带上`cookie`
router.get('/user', ctx => {
  // req.headers.cookie: user=jay
  const user = ctx.headers.cookie.split('=')[1]
  ctx.body = { code: 0, user }
})

// app.use('/static', express.static('public'))
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8000, () => {
    console.log('appA running at port 8000')
  })
