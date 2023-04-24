const axios = require('axios')

// [
//   { V: '北京', K: 'MT_BJ1001' },
//   { V: '黑龙江公司', K: 'MT_HLJHEB1001' },
//   { V: '贵阳公司商务中心店', K: 'MT_GZGY1001' },
//   { V: '安徽公司', K: 'MT_AHHF1001' },
//   { V: '福建厦门公司', K: '103502060001' }
// ]
// "note": "抱歉，由于名额有限，您的预约未被系统抽中，请明天重新预约，感谢您的参与！",
// "approvalDate": null,
// "approvalTime": null,
// "custName": "曹合飞",
// "creaDate": "20230414173207",
// "statuaValue": "未成功",
// "lwId": "1646808542232002560",
// "approvalTimeName": null,
// "tenantId": "MT_BJ",
// "pickupDate": null,
// "shopId": "MT_BJ1001",
// "applyDate": "20230414",
// "applyTime": "17:32:07",
// "status": "90"
// }

let a = {
  token: '001gaY00030UQP1EtJ200jfbbP0gaY0e',
  key: '6Xy5fCzePSsn/7ZyhCkFk2zSApYp+DLOnu7BxonpVfw='
}
let { token, key } = a

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
  Cookie: `lambo-sso-key_0_=${token}#${key}`
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

const add = () => {
  axios
    .post(
      'https://reserve.moutai.com.cn/api/rsv-server/anon/reserve/add',
      'reserveInfo=%7B%22custId%22%3A%22******%22%2C%22tenantId%22%3A%22MAOTAI%22%2C%22shopId%22%3A%22MT_BJ1001%22%2C%22itemList%22%3A%5B%7B%22itemCode%22%3A%22LiXI5MVKe6hVUWmmA4wdIg%3D%3D%22%2C%22qty%22%3A1%7D%5D%7D&code=104%3A122%3B214%3A72%3B271%3A43',
      {
        headers: headers
      }
    )
    .then(res => {
      console.log(res.data)
    })
}

const getcode = () => {
  axios
    .post(
      'https://reserve.moutai.com.cn/api/rsv-server/anon/consumer/getClickCode',
      '',
      {
        headers: headers
      }
    )
    .then(res => {
      console.log(res.data)
    })
}
// getShops()
getcode()
add()
