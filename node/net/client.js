//TCP 客户端代码实现
const net = require('net')
const client = net.createServer({
  port: 3000,
  host: '127.0.0.1'
})
console.log(process.pid)
client.on('connection', () => {
  client.write('node 技术栈')
  setTimeout(() => {
    client.write('JavaScript ')
    client.write('TypeScript ')
    client.write('Python ')
    client.write('Java ')
    client.write('C ')
    client.write('PHP ')
    client.write('ASP.NET ')
  }, 1000)
})

client.on('data', buffer => {
  console.log(buffer.toString())
})
client.on('error', err => {
  console.error('服务器异常：', err)
})

client.on('close', err => {
  console.log('客户端链接断开！', err)
})
