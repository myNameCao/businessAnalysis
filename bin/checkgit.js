#!/usr/bin/env node
const { composeAsync } = require('../composeAsync')

const chalk = require('chalk')

const { execSync } = require('child_process')

const { chdir } = require('process')

let PATH = '/Users/caohefei/work'

let check = name => {
  return Promise.resolve()
    .then(() => {
      chdir(`${PATH}/${name}`)
    })
    .then(() => {
      return execSync('git pull origin develop')
    })
    .then(res => {
      console.log(res.toString())
    })
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
        console.log(`${chalk.bgRed.white(name)} ${chalk.red('改动内容如下')}`)
        console.log(txt.toString())
      }
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
