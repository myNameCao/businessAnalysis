const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const note = name => {
  try {
    let text = fs.readFileSync('./CHANGELOG.md', 'utf8')
    console.log(text)
    axios
      .post(
        'https://oapi.dingtalk.com/robot/send?access_token=87b87743b7f62e5cd10d5bafc69f3b92329102ce00a39695a1022274a0e62199',
        {
          markdown: {
            title: name + '发版',
            text
          },
          headers: { 'Content-Type': 'application/json' },
          msgtype: 'markdown'
        }
      )
      .then(function (res) {
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  } catch (err) {
    console.error(err)
  }
}

const conventionalChangelog = require('conventional-changelog')

let data = conventionalChangelog({
  preset: 'angular'
}).pipe(process.stdout)

// const rs = fs.createReadStream('./pubish')
// rs.pipe(process.stdout)

exports.note = note
