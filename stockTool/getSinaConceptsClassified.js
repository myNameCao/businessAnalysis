const { stock } = require('tushare')
const process = require('process')
const iconv = require('iconv-lite')

const { writeFile } = require('./wirter')

const { test } = require('./getSinaClassifyDetails.js')

writeFile(process.pid + '                    概念分类')

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
