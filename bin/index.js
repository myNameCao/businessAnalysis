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
        'port',
        'test',
        'test_new',
        'report',
        'base',
        'exam',
        'data',
        'check',
        'center',
        'pay',
        'answersheet'
      ]
    }
  ])
  .then(answers => {
    let list = answers.checkbox.map(name => {
      return task.bind(null, name)
    })
    console.log(
      composeAsync(list)().then(res => {
        console.log(res)
      })
    )
    // return composeAsync(list)()
  })
  .catch(error => {})
