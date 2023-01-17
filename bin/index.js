#!/usr/bin/env node
var inquirer = require('inquirer')
const { task } = require('../tools/pubish')
const { composeAsync } = require('../composeAsync')

let falg = process.argv[2]

if (falg && falg !== 'sp') {
  console.log('参数错误 特殊上线是 参数为: sp ')

  return
}

inquirer
  .prompt([
    {
      type: 'checkbox',
      name: 'checkbox',
      message: 'Select your product',
      choices: [
        'viewbase',
        'test_new',
        'test',
        'report',
        'base',
        'exam',
        'mark',
        'datacenter',
        'check',
        'center',
        'pay',
        'answersheet'
      ]
    }
  ])
  .then(answers => {
    composeAsync(
      answers.checkbox.map(name => {
        return task.bind(null, name)
      })
    )()
  })
  .catch(error => {})
