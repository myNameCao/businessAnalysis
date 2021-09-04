const ora = require('ora')
const path = require('path')
const fs = require('fs')

const inquirer = require('inquirer')
const { execSync } = require('child_process')
const { chdir } = require('process')
const { unlink, rename, rmdir } = require('fs').promises

const { upload } = require('./uploads')
const { note } = require('./note')
const { composeAsync } = require('../composeAsync')
const compressing = require('compressing')

let PATH = '/Users/caohefei/work'

const gitPull = (name, spinner) => {
  return Promise.resolve()
    .then(() => {
      return chdir(`${PATH}/${name}`)
    })
    .then(() => {
      return execSync('git pull origin develop')
    })
    .then(res => {
      console.log(res.toString())
    })
    .then(() => {
      return execSync('git log -1')
    })
    .then(res => {
      console.log(res.toString())
    })
    .then(res => {
      const currentVersion = require(`${PATH}/${name}/package.json`).version
      spinner.succeed('拉取代码成功')
      return inquirer
        .prompt([
          {
            type: 'input',
            name: 'version',
            message: ` 当前的版本号是 ${currentVersion}，请输入你的版本号？`
          }
        ])
        .then(async i => {
          updatePackage(i.version) // 更新版本
          await note(name) // 发送通知
          return execSync(`yarn release ${i.version} `)
        })
    })
} // 拉取代码
const updatePackage = version => {
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
  pkg.version = version
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n')
}
const build = (name, spinner) => {
  spinner.succeed('开始编译')
  spinner.start('loading....')
  return Promise.resolve()
    .then(() => {
      return execSync(`yarn com`)
    })
    .then(() => {
      spinner.succeed(`${name} 编译完成`)
    })
} // 打包
const renameVue = name => {
  return rename('./dist', `./${name}`)
} // 修改名称
const zip = (name, spinner) => {
  let path = name
  return compressing.zip.compressDir(`./${path}`, `./${name}.zip`).then(() => {
    spinner.succeed(`${name} 压缩完成`)
  })
} // 压缩代码

const rmVue = name => {
  return rmdir(`./${name}`, { recursive: true })
} // 删除 多余文件夹

const publish = (name, spinner) => {
  spinner.start(name + '开始上传')
  return upload(name).then(() => {
    spinner.succeed(`${name}  上传完成`)
  })
} // 上传代码

const rmZip = name => {
  return unlink(`./${name}.zip`)
} // 删除压缩包
const task = name => {
  const spinner = ora().start()
  const funs = composeAsync(
    [gitPull, build].map(fn => {
      return fn.bind(null, name, spinner)
    })
    // [gitPull, build, renameVue, zip, rmVue, publish, rmZip].map(fn => {
    //   return fn.bind(null, name, spinner)
    // })
  )
  return funs()
    .then(() => {
      spinner.succeed(`${name}  发布完成`)
    })
    .catch(err => {
      spinner.fail(err + '    ' + name)
    })
}

exports.task = task
