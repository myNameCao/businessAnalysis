const { stock } = require('tushare')

const { check } = require('./checkGridlist')
const { writeFile } = require('./wirter')

const { Classlist } = require('./classList.js')

const process = require('process')

writeFile(process.pid)

// 区间数据
const length = 12 * 30

const getHistory = async (options, b, t) => {
  console.log(options.name, '价格：' + options.price, '====', b + '/' + t)
  await stock.getHistory({ code: options.symbol }).then(({ data }) => {
    if (!data) {
      console.log('没有数据')
      return
    }
    let list = data?.record || []
    if (!Array.isArray(list)) {
      return
    }
    list = list.filter(item => {
      return (
        new Date(item[0]).getTime() >
        new Date().getTime() - length * 24 * 60 * 60 * 1000
      )
    })
    check(list, options.name)
  })
}

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
const getSinaClassifyDetails = async (classObj, index, T) => {
  var options1 = {
    tag: classObj.tag
  }
  return await stock
    .getSinaClassifyDetails(options1)
    .then(async ({ data }) => {
      writeFile(classObj.name + '*************有   ' + data.length + '   个')

      console.log(
        classObj.tag,
        index + '/' + T,
        '***************************************************************************',
        classObj.name
      )
      for (let b = 0; b < data.length; b++) {
        await getHistory(data[b], b + 1, data.length)
      }
    })
    .catch(e => {
      console.log(e)
    })
}
// 按行业查询
// getSinaIndustryClassified()

const test = async calslists => {
  let classList = calslists || Classlist
  for (let b = 0; b < classList.length; b++) {
    let { tag, name } = classList[b]
    await getSinaClassifyDetails({ tag, name }, b + 1, classList.length)
  }
}

test()

//
