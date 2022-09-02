let axios = require('axios')

let sha1 = require('js-sha1')

// var wx = require('weixin-js-sdk')
axios
  .get(
    'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxadb5c034a1281d35&secret=a9fd3dbca138af641d7b27804472a37a'
  )
  .then(res => {
    if (res.data.access_token) return res.data.access_token
  })
  .then(data => {
    return axios.get(
      `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${data}&type=jsapi`
    )
  })
  .then(res => {
    let timestamp = parseInt(new Date().getTime() / 1000)
    let noncestr = 'Wm3WZYTPz0wzccnW'
    let url = 'https://check.xycxedu.com/testImg/'
    let jsapi_ticket = res.data.ticket
    console.log(timestamp)
    console.log(noncestr)
    console.log(url)
    console.log(jsapi_ticket)

    let str = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`

    console.log(str)

    let signature = sha1(str)

    console.log(signature)
  })
