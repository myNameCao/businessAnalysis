// merge  通知

const axios = require('axios')
const url =
  'https://oapi.dingtalk.com/robot/send?access_token=ccef6c7ba8b462141fa0824a6cbae7f989d9dbedaa460a6dcb41ab6c4f63e09a'

const { projectName } = require('./projectName')

const note = (name, text, emoji) => {
  axios
    .post(url, {
      markdown: {
        title: name + '',
        text: `## [${name}] \n> \n> ## ${emoji} \n> #### 修改内容如下: \n> \n>${text}`
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

note('exam', 'ddd', 'dd')
