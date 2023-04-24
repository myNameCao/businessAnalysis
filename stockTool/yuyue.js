const axios = require('axios')

const token = '011XgvGa1UmgaF0nkZHa10Btf83XgvG8'

const url = ''

// [
//   { V: '黑龙江公司', K: 'MT_HLJHEB1001' },
//   { V: '贵阳公司商务中心店', K: 'MT_GZGY1001' },
//   { V: '安徽公司', K: 'MT_AHHF1001' },
//   { V: '福建厦门公司', K: '103502060001' }
// ]

const headers = {
  Host: 'reserve.moutai.com.cn',
  Accept: 'application/json, text/plain, */*',
  'Cache-Control': 'no-cache',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090217) XWEB/6763',
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  Origin: 'https://reserve.moutai.com.cn',
  'Sec-Fetch-Site': 'same-origin',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  Referer: `https://reserve.moutai.com.cn/mconsumer/?a=1&token=${token}`,
  'Accept-Language': 'zh-CN,zh',
  Cookie: `lambo-sso-key_0_=${token}#Kdd1iK3EB5x9xASir5pOJuSvSVGvbMapibv/AGtYMfg=`
}

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
        // note('测试')
      }
    })
    .catch(error => {
      console.log(error)
    })
}

getShops()
