const { stock } = require('tushare')

const { test } = require('./getSinaClassifyDetails.js')
const { writeFile, rmSync } = require('./wirter')

let { msg } = require('./msg')

let str = '行业分类'
msg[process.pid] = str
msg.fileName = str
msg.temp = {}
rmSync()
let data1 = msg.recent_time || '今天'
writeFile(
  process.pid +
    '                    ' +
    str +
    '                             区间 ' +
    msg.furthest_time +
    '    到   ' +
    data1
)

stock.getSinaIndustryClassified().then(async ({ data }) => {
  if (data?.length) {
    test(data)
  }
})
