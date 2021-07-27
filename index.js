#!/usr/bin/env node
const ora = require('ora')
const { execSync } = require('child_process')
const { chdir } = require('process')
const { unlink, rename, rmdir } = require('fs').promises

const { upload } = require('./uploads')
const { composeAsync } = require('../composeAsync')
const compressing = require('compressing')
let PATH= '/Users/caohefei/work'

const gitPull = name => {
  chdir(`${PATH}/${name}`)
  return execSync('git pull origin develop')
    .then(res => {
      console.log(res.toString())
    })
    .then(() => {
      return execSync('git log -1')
    })
    .then(res => {
      console.log(res.toString())
    })
}

const build = (name, spinner) => {
  return execSync(`yarn com`).then(() => {
    spinner.succeed(`${name} 编译完成`)
  })
}
const rename = name => {
  if (name !== 'data') {
    return rename('./dist', `./${name}`)
  }
}
const zip = (name, spinner) => {
  let path = name
  if (name === 'data') {
    path = `dist/${name}/`
  }
  return compressing.zip.compressDir(`./${path}`, `./${name}.zip`).then(() => {
    spinner.succeed(`${name} 压缩完成`)
  })
}

const re = name => {
  if (name !== 'data') {
    return rmdir(`./${name}`, { recursive: true })
  }
}

const publish = (name, spinner) => {
  spinner.succeed(name + '开始上传')
  return upload(name).then(() => {
    spinner.succeed(`${name}  上传完成`)
  })
}

const rmZip = name => {
  return unlink(`./${name}.zip`)
  
}
const task = name => {
  const spinner = ora('Loading').start()
   tasks= composeAsync([
    gitPull,
    build,
    rename,
    zip,
    re,
    publish,
    rmZip
  ].map((fn)=>{
    return fn.bind(name,spinner)
  })
  tasks().then(()=>{
    spinner.succeed(`${name}  发布完成`)
    spinner.stop()
  })
  .catch(err => {
    spinner.fail(err + name)
    spinner.stop()
  })
}

exports.task = task
