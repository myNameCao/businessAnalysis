const { stock } = require('tushare')
const process = require('process')
const iconv = require('iconv-lite')
let { msg } = require('./msg')
const { writeFile, rmSync } = require('./wirter')
const { test } = require('./getSinaClassifyDetails.js')
let str = '概念分类'
msg[process.pid] = str
msg.fileName = str
msg.temp = {}
rmSync()
let data1 = msg.recent_time || '今天'

console.log(data1, str)
writeFile(
  process.pid +
    '                    ' +
    str +
    '                             区间  ' +
    msg.furthest_time +
    '    到   ' +
    data1
)

stock.getSinaConceptsClassified().then(({ data }) => {
  for (let i = 0; i < data.length; i++) {
    let buffer = iconv.encode(data[i].name, 'gbk')
    let buffer1 = iconv.encode(data[i].leadingName, 'gbk')
    data[i].name = iconv.decode(Buffer.from(buffer), 'utf8')
    data[i].leadingName = iconv.decode(Buffer.from(buffer1), 'utf8')
  }
  if (data?.length) {
    test(data)
  }
})
