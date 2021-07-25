#!/usr/bin/env node
const ora = require('ora')
const { exec } = require('child_process')
const { chdir } = require('process')
const { unlink, rename, rmdir } = require('fs').promises
const { upload } = require('./uploads')
const compressing = require('compressing')

const zip = (name, spinner) => {
  let path = name
  if (name === 'test' || name === 'data') {
    path = `dist/${name}/`
  }
  return compressing.zip.compressDir(`./${path}`, `./${name}.zip`).then(() => {
    spinner.succeed(`${name} 压缩完成`)
  })
}
const publish = (name, spinner) => {
  spinner.succeed(name + '开始上传')
  return upload(name).then(() => {
    spinner.succeed(`${name}  上传完成`)
  })
}
const task = async name => {
  const spinner = ora('Loading').start()
  await Promise.resolve()
    .then(() => chdir(`/Users/caohefei/work/${name}`))
    .then(() => {
      console.log(`开始编译 ${name}`)
      return new Promise((res, rj) => {
        exec(`yarn com`, (error, stdout, stderr) => {
          if (error) {
            console.log(`${name} 编译失败`)
            rj()
            return
          }
          res()
          spinner.succeed(`${name} 编译完成`)
        })
      })
        .then(() => {
          if (name !== 'data') {
            return rename('./dist', `./${name}`)
          }
        })
        .then(() => zip(name, spinner))
        .then(() => {
          if (name !== 'data') {
            return rmdir(`./${name}`, { recursive: true })
          }
        })
        .then(() => publish(name, spinner))
        .then(() => {
          return unlink(`./${name}.zip`)
          spinner.stop()
        })
        .catch(err => {
          spinner.fail(err + name)
          spinner.stop()
        })
    })
}

exports.task = task
