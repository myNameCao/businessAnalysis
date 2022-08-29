const conventionalChangelog = require('conventional-changelog')

const path = require('path')
const { rootPath } = require('./projectName')
const { chdir } = require('process')

const changeLog = async name => {
  // 注意 必须
  chdir(path.join(rootPath, name))
  let stream = conventionalChangelog({
    preset: 'angular'
  })
  const chunks = []
  for await (let chunk of stream) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString('utf-8')
}

exports.changeLog = changeLog
