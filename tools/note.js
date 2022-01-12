const axios = require('axios')
const url =
  'https://oapi.dingtalk.com/robot/send?access_token=87b87743b7f62e5cd10d5bafc69f3b92329102ce00a39695a1022274a0e62199'

const { projectName } = require('./projectName')

const note = (name, text, emoji) => {
  axios
    .post(url, {
      markdown: {
        title: name + '发版完成',
        text: `## [${
          projectName[name] || name
        }] \n> \n> ## ${emoji} \n> #### 修改内容如下: \n> \n>${text}`
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
exports.note = note
