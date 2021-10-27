// git describe --tags `git rev-list --tags --max-count=1`

const { composeAsync } = require('../composeAsync')

const chalk = require('chalk')

const { execSync } = require('child_process')

const { chdir } = require('process')
const { DH_CHECK_P_NOT_SAFE_PRIME } = require('constants')

let PATH = '/Users/caohefei/work'

let check = name => {
  return Promise.resolve()
    .then(() => {
      chdir(`${PATH}/${name}`)
    })
    .then(() => {
      execSync('git pull origin develop')
    })
    .then(() => {
      let endtag = execSync(`git rev-list --tags --max-count=1`)
      let head = execSync(`git rev-parse HEAD`)
      if (endtag.toString() !== head.toString()) {
        console.error(`${chalk.bgRed.white(name)} ${chalk.red('有变动')}`)
        return execSync(`git diff ${head}`)
      }
    })
    .then(res => {
      //   console.log(res.toString())
    })
}

let prodocts = [
  'test_new',
  'report',
  'base',
  'exam',
  'mark',
  'datacenter',
  'check',
  'center',
  'unionexam',
  'answersheet'
]
composeAsync(
  prodocts.map(name => {
    return check.bind(null, name)
  })
)()
