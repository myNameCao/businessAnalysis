const conventionalChangelog = require('conventional-changelog')

// const { chdir } = require('process')

const changeLog = async name => {
  // 注意 必须a
  // chdir(`/Users/caohefei/work/${name}`)
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
