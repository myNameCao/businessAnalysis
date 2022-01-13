const ora = require('ora')

const chalk = require('chalk')

const path = require('path')

const fs = require('fs')

const inquirer = require('inquirer')

const { execSync } = require('child_process')

const { chdir } = require('process')

const { unlink, rename, rmdir } = require('fs').promises

const { upload } = require('./uploads')

const { note } = require('./note')

const { projectName } = require('./projectName')

const { changeLog } = require('./createChangelog')

const { composeAsync } = require('../composeAsync')

// 压缩
const compressing = require('compressing')

let PATH = '/Users/caohefei/work'

let changelogText = ''

const gitPull = (name, spinner) => {
  // 打包只能打包 master 的 内容
  return Promise.resolve()
    .then(() => chdir(`${PATH}/${name}`))
    .then(() => execSync('git checkout master'))
    .then(() => {
      // 打印出上次tag 到 最近的 commitId 的log
      let endtag = execSync(`git rev-list --tags --max-count=1`)
        .toString()
        .trim() // 最后的tag 的commitId
      let head = execSync(`git rev-parse HEAD`).toString().trim() // 最后一次提交
      let txt = execSync(`git log ${endtag}..HEAD`) //buffer
      console.log(txt.toString())
    })
    .then(res => {
      const currentVersion = require(`${PATH}/${name}/package.json`).version
      spinner.succeed('拉取代码成功')
      return inquirer
        .prompt([
          {
            type: 'input',
            name: 'version',
            message: `${chalk.red(
              projectName[name]
            )} 版本号:${currentVersion},请输入新的版本号？`
          }
        ])
        .then(async i => {
          updatePackage(i.version.trim()) // 更新版本
          changelogText = await changeLog(name) // 生成通知信息
        })
    })
} // 拉取代码
const updatePackage = version => {
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
  if (version) {
    pkg.preVersion = pkg.version
    pkg.version = version
  }
  if (!version) {
    pkg.version = pkg.preVersion
  }
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n')
}
const build = (name, spinner) => {
  spinner.succeed('开始编译')
  spinner.start('loading....')
  return Promise.resolve()
    .then(() => execSync(`yarn com`))
    .then(() => spinner.succeed(`${name} 编译完成`))
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
const sameBranch = () => {
  return Promise.resolve()
    .then(() => execSync(`yarn release`))
    .then(() => execSync('git checkout develop '))
    .then(() => execSync('git merge master'))
    .then(() => execSync('git push origin develop '))
}
const task = name => {
  const spinner = ora().start()
  const funs = composeAsync(
    [gitPull, build, renameVue, zip, rmVue, publish, rmZip, sameBranch].map(
      fn => {
        return fn.bind(null, name, spinner)
      }
    )
  )
  return funs()
    .then(() => {
      spinner.succeed(`${name} 发布完成`)
      note(name, changelogText, '👏 👏 👏 👏 👏 👏 👏 👏')
    })
    .catch(err => {
      spinner.fail(`${err}  ${name}  项目`)
      note(name, `发版失败: ${err}`, ' 🥀 🥀 🥀 🥀 🥀 🥀 🥀 🥀 ')
      updatePackage()
    })
}
exports.task = task
