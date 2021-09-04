const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const conventionalChangelog = require('conventional-changelog')

const note = async name => {
  // 版本修改到最新的一个tag
  let stream = conventionalChangelog({
    preset: 'angular'
  })
  const chunks = []
  for await (let chunk of stream) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)
  const text = buffer.toString('utf-8')
  try {
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
exports.note = note
