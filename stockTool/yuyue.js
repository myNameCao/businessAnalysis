const axios = require('axios')

//

// {
// 	"code": "000",
// 	"message": "success",
// 	"data": [{
// 		"V": "黑龙江公司",
// 		"K": "MT_HLJHEB1001"
// 	}]
// }

const headers = {
  Host: 'reserve.moutai.com.cn',
  Accept:
    'application/json, text/pla 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/6.8.0(0x16080000) MacWechat/3.7.1(0x1307010b) XWEB/30414 Flue',
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  Origin: 'https://reserve.moutai.com.cn',
  'Sec-Fetch-Site': 'same-origin',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  Referer:
    'https://reserve.moutai.com.cn/mconsumer/?a=1&token=0716dr000jAiQP14az300EmI4m16dr0Y',
  'Accept-Language': 'zh-CN,zh',
  Cookie:
    'lambo-sso-key_0_=0716dr000jAiQP14az300EmI4m16dr0Y#Kdd1iK3EB5x9xASir5pOJuSvSVGvbMapibv/AGtYMfg='
}

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

// getShops()

const yuyue = () => {
  const response = axios
    .get(
      'https://reserve.moutai.com.cn/api/rsv-server/anon/manage/rimItem/helpBox',
      {
        params: {
          shopId: 'MT_HLJHEB1001'
        },
        headers: {
          Host: 'reserve.moutai.com.cn',
          Accept: 'application/json, text/plain, */*',
          'Cache-Control': 'no-cache',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/6.8.0(0x16080000) MacWechat/3.7.1(0x1307010b) XWEB/30414 Flue',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Dest': 'empty',
          Referer:
            'https://reserve.moutai.com.cn/mconsumer/?a=1&token=0716dr000jAiQP14az300EmI4m16dr0Y',
          'Accept-Language': 'zh-CN,zh',
          Cookie:
            'lambo-sso-key_0_=0716dr000jAiQP14az300EmI4m16dr0Y#Kdd1iK3EB5x9xASir5pOJuSvSVGvbMapibv/AGtYMfg='
        }
      }
    )
    .then(res => {
      console.log(res.data)
    })
}

yuyue()
