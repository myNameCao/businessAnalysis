// 检查代码的更新情况

const chalk = require('chalk')

const { execSync } = require('child_process')

const { chdir } = require('process')

const { projectName } = require('./projectName')

const inquirer = require('inquirer')

const PATH = '/Users/caohefei/work'

const check = name => {
  return Promise.resolve()
    .then(() => chdir(`${PATH}/${name}`))
    .then(() => console.log(chalk.red(`${name}    扫描中........ \n`)))
    .then(() => execSync('git pull origin develop'))
    .then(res => console.log(res.toString()))
    .then(() => {
      let endtag = execSync(`git rev-list --tags --max-count=1`)
        .toString()
        .trim() // 最后的tag 的commitId
      let head = execSync(`git rev-parse HEAD`).toString().trim() // 最后一次提交
      let txt = execSync(`git log ${endtag}..HEAD`) //buffer
      return { txt, endtag, head }
    })
    .then(({ txt, endtag, head }) => {
      if (endtag !== head) {
        console.log(chalk.red(`【${projectName[name]}】 改动内容如下 \n`))
        console.log(txt.toString())
        return true
      }
      return false
    })
    .then(res => {
      if (res) {
        return inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'test',
              message: `${chalk.red(
                projectName[name]
              )} Are you  update  to  master?`,
              default: false
            }
          ])
          .then(i => {
            if (i.test) {
              execSync(`git checkout master`)
              execSync(`git merge develop`)
              execSync(`git checkout develop`)
              console.log(chalk.red('master updataed'))
            }
          })
      }
    })
}

exports.check = check
