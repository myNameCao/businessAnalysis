const { stock } = require('tushare')

const { test } = require('./getSinaClassifyDetails.js')
const { writeFile } = require('./wirter')

writeFile(process.pid + '                         行业分类')

stock.getSinaIndustryClassified().then(async ({ data }) => {
  if (data?.length) {
    test(data)
  }
})
