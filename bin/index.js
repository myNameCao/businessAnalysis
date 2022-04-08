#!/usr/bin/env node
var inquirer = require('inquirer')
const { task } = require('../tools/pubish')
const { composeAsync } = require('../composeAsync')

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
        'unionexam',
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
