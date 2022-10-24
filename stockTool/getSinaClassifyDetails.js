// 获取新浪行业分类信息

const { stock } = require('tushare')

const getSinaIndustryClassified = () => {
  let num = []
  stock.getSinaIndustryClassified().then(async ({ data }) => {
    console.log('共' + data.length + '行业')
    for (let a = 0; a < data.length; a++) {
      num.push({ tag: data[a].tag, name: data[a].name })
    }
    console.log(num)
  })
}

exports.getSinaIndustryClassified = getSinaIndustryClassified
