const { stock } = require('tushare')

const options = {
  code: '603078',
  start: '2022-1-11'
}

const getHistory = () => {
  stock.getHistory(options).then(({ data }) => {
    let list = data.record.filter(item => {
      return new Date(item[0]).getTime() > new Date(options.start).getTime()
    })
    console.log(list.length)
    console.log(list)
  })
}

// stock.getHS300().then(({ data }) => {
//   console.log(data)
//   console.log(data.length)
// })

// stock.getHS300().then(({ data }) => {
//   console.log(data)
//   console.log(data.length)
// })

let num = 0
// 获取行业信息
// {
//   tag: 'new_blhy',
//   name: '玻璃行业',
//   num: '19',
//   price: '15.805789473684',
//   changePrice: '-0.062105263157895',
//   changePercent: '-0.39138943248532',
//   volume: 2368517.03,
//   amount: 249027.6675,
//   leadingSymbol: 'sz300160',
//   leadingChangePercent: '1.906',
//   leadingPrice: '6.950',
//   leadingChangePrice: '0.130',
//   leadingName: '秀强股份'
// }

const getSinaIndustryClassified = () => {
  num = 0
  stock.getSinaIndustryClassified().then(async ({ data }) => {
    for (let a = 0; a < data.length; a++) {
      await getSinaClassifyDetails(data[a])
    }
    console.log(('共', num))
  })
}

// 获取行业 包含的股票信息

//{
//   symbol: 'sz000571',
//   name: 'ST大洲',
//   price: '2.600',
//   changePrice: -0.04,
//   changePercent: -1.515  ,
//   open: '2.630',
//   high: '2.680',
//   low: '2.550',
//   volume: 167347.25,
//   amount: 4389.8841,
//   tickTime: '15:00:00'
//   }
const getSinaClassifyDetails = async classObj => {
  var options1 = {
    tag: classObj.tag
  }
  return await stock.getSinaClassifyDetails(options1).then(async ({ data }) => {
    console.log(classObj.name, data.length, '只')
    for (let b = 0; b < data.length; b++) {
      let item = data[b]
      num++
      console.log(item.name, item.symbol, item.price)
    }
  })
}

getSinaIndustryClassified()
