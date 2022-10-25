const { stock } = require('tushare')

const { test } = require('./getSinaClassifyDetails.js')
const { writeFile, rmSync } = require('./wirter')

let { msg } = require('./msg')

let str = '行业分类'
msg[process.pid] = str
msg.fileName = str

rmSync()

writeFile(process.pid + '                         行业分类')

stock.getSinaIndustryClassified().then(async ({ data }) => {
  if (data?.length) {
    test(data)
  }
})
