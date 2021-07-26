#!/usr/bin/env node
var inquirer = require('inquirer')
const { task } = require('../tools/pubish')
inquirer
  .prompt([
    {
      type: 'checkbox',
      name: 'checkbox',
      message: 'Select your product',
      choices: [
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
    answers.checkbox
      .map(name => {
        return task.bind(null, name)
      })
      .reduce((p, f) => p.then(f), Promise.resolve())
  })
  .catch(error => {})
