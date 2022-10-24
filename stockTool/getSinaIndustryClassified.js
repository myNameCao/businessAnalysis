//  获取新浪概念分类信息

const { stock } = require('tushare')
stock.getSinaConceptsClassified().then(({ data }) => {
  console.log(data)
})
