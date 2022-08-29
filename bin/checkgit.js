#!/usr/bin/env node
const { composeAsync } = require('../composeAsync')
const { check } = require('../tools/check')

let name = process.argv[2]
let prodocts = [
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
  'answersheet'
]

if (name) {
  prodocts.includes(name) ? check(name) : console.log('参数错误')
  return
}
composeAsync(
  prodocts.map(name => {
    return check.bind(null, name)
  })
)()
