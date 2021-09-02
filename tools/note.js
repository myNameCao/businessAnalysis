const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

execSync(`yarn note`)
try {
  let text = fs.readFileSync(path.resolve('./', 'CHANGELOG.js'), 'utf8')
  axios
    .post(
      'https://oapi.dingtalk.com/robot/send?access_token=87b87743b7f62e5cd10d5bafc69f3b92329102ce00a39695a1022274a0e62199',
      {
        markdown: {
          title: '1.0.1',
          text
        },
        headers: { 'Content-Type': 'application/json' },
        msgtype: 'markdown'
      }
    )
    .then(function (res) {
      console.log(res.data)
      fs.unlink(path.resolve('./', 'CHANGELOG.js')
    })
    .catch(function (error) {
      console.log(error, 0)
    })
} catch (err) {
  console.error(err)
}
