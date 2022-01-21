#!/usr/bin/env node
const { composeAsync } = require('../composeAsync')
const { check } = require('../tools/check')
let prodocts = [
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
  'answersheet'
]
composeAsync(
  prodocts.map(name => {
    return check.bind(null, name)
  })
)()
