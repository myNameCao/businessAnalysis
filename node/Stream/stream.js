// 开启一个服务
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const { promisify } = require('util')
const { resolve } = require('path')
const readFile = promisify(fs.readFile)

app.use(async ctx => {
  try {
    const readable = fs.createReadStream(resolve(__dirname, 'test.json'))
    ctx.body = readable
  } catch (err) {
    ctx.body = err
  }
})
app.listen(3000)
