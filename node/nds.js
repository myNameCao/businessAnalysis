const dns = require('dns')

// dns.resolve('www.nodejs.red', (err, records) => {
//   console.log(records)
// })

// dns.lookup('nodejs.red', (err, address, family) => {
//   console.log('地址: %j 地址族: IPv%s', address, family)
// })

dns.resolve('chris.xycxedu.cn', (err, records) => {
  console.log(records)
})

dns.lookup('chris.xycxedu.cn', (err, address, family) => {
  console.log('地址: %j 地址族: IPv%s', address, family)
})

// app.js
const http = require('http')

http
  .createServer((req, res) => {
    console.log('request url: ', req.url)

    res.end('Hello Node.js')
  })
  .listen(9527)

// node app.js 开启服务
