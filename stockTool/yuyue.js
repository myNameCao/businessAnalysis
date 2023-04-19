const axios = require('axios')

const Cookie =
  'lambo-sso-key_0_=001bU70w3FUju03lpm1w3klSVJ1bU70O#6Xy5fCzePSsn/7ZyhCkFk2zSApYp+DLOnu7BxonpVfw='
const Referer =
  'https://reserve.moutai.com.cn/mconsumer/?a=1&token=031UcI000AypOP18i430016u080UcI0t'

const url =
  'https://oapi.dingtalk.com/robot/send?access_token=87b87743b7f62e5cd10d5bafc69f3b92329102ce00a39695a1022274a0e62199'

const note = name => {
  axios
    .post(url, {
      markdown: {
        title: '发版完成',
        text: name
      },
      headers: { 'Content-Type': 'application/json' },
      msgtype: 'markdown'
    })
    .then(function (res) {
      console.log(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
const getShops = () => {
  const headers = {
    Host: 'reserve.moutai.com.cn',
    Accept: 'application/json, text/plain, */*',
    'Cache-Control': 'no-cache',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090217) XWEB/6763',
    token: '',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    Origin: 'https://reserve.moutai.com.cn',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    Referer,
    'Accept-Language': 'zh-CN,zh',
    Cookie
  }
  const data = 'custId=******'
  axios
    .post(
      'https://reserve.moutai.com.cn/api/rsv-server/anon/consumer/getShops',
      data,
      { headers }
    )
    .then(response => {
      let { data } = response.data
      console.log(response.data)
      if (data.length) {
        note('测试')
      }
    })
    .catch(error => {
      console.log(error)
    })
}

getShops()

setInterval(() => {
  getShops()
}, 1000 * 60 * 30)

Cookie: 'lambo-sso-key_0_=031UcI000AypOP18i430016u080UcI0t#6Xy5fCzePSsn/7ZyhCkFk2zSApYp+DLOnu7BxonpVfw='
