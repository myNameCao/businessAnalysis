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
const getSinaIndustryClassified = () => {
  num = 0
  stock.getSinaIndustryClassified().then(({ data }) => {
    console.log(data)
    // data.forEach(element => {
    //   // getSinaClassifyDetails(element)
    // })
  })
}

// 获取行业 包含 的股票信息
const getSinaClassifyDetails = classObj => {
  console.log(classObj)

  var options1 = {
    tag: classObj.tag
  }
  stock.getSinaClassifyDetails(options1).then(({ data }) => {
    console.log(classObj.tag, ':', data.length, '只')
    data.forEach(i => {
      num++

      console.log(i.name, i.symbol)
    })
  })

  console.log(num)
}

getSinaIndustryClassified()
