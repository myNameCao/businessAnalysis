//TCP 服务器端代码实现

const net = require('net')
const HOST = '127.0.0.1'
const PORT = '3000'
const serve = net.createServer()
serve.listen(PORT, HOST)
console.log(process.pid)

serve.on('listening', () => {
  console.log(`服务已开启在 ${HOST}:${PORT}`)
})

serve.on('connection', socket => {
  socket.on('data', buffer => {
    const ms = buffer.toString()
    console.log(ms)
    socket.write(Buffer.from('你好' + ms))
  })
})

serve.on('close', () => {
  console.log('Server Close')
})

serve.on('error', err => {
  if (err.code == 'EADDRINUSE') {
    console.log('地址被使用 重试中 。。。')
    setTimeout(() => {
      serve.close()
      serve.listen(PORT, HOST)
    }, 1000)
  }
})
