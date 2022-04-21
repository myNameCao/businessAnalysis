const http = require('http')
function sendRequest() {
  const req = http.request(
    {
      method: 'GET',
      host: 'https://xyapicenter.xycxedu.cn',
      port: 3010,
      path: '/api/user/getuserinfo',
      headers: {
        CXTOKEN: '42d301fdc8ca438a9589ec86b3d0e2ed' // 方式一设置
      }
    },
    res => {
      let data = ''
      res.on('data', chunk => {
        data += chunk.toString()
        console.log(data)
      })
      res.on('end', () => {
        console.log('response body: ', data)
        console.log('response cookie: ', res.headers['set-cookie'])
      })
    }
  )
  //   req.setHeader('Cookie', ['b=222', 'c=333']) // 方式二设置
  req.on('error', console.error)
  req.end()
}
sendRequest()
