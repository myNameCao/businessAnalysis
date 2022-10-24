const { stock } = require('tushare')
const process = require('process')
const { writeFile } = require('./wirter')

const { test } = require('./getSinaClassifyDetails.js')

writeFile(process.pid)

stock.getSinaConceptsClassified().then(({ data }) => {
  if (data?.length) {
    test(data)
  }
})
