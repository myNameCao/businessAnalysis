const { stock } = require('tushare')

const { test } = require('./getSinaClassifyDetails.js')
const { writeFile } = require('./wirter')
let { rmSync } = require('fs')

let { msg } = require('./msg')

msg[process.pid] = '行业分类'

msg.fileName = '行业分类'

rmSync('./行业分类.js', { force: true })

writeFile(process.pid + '                         行业分类')

stock.getSinaIndustryClassified().then(async ({ data }) => {
  if (data?.length) {
    test(data)
  }
})
