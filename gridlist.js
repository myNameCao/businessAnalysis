const { stock } = require('tushare')
const { isArray } = require('util')
const length = 60

const getHistory = async (options, b, t) => {
  console.log(options.name, options.code, '====', b + '/' + t)
  await stock.getHistory(options).then(({ data }) => {
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
    // console.log(list.length)
    // console.log(list)
  })
}

// let num = []
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
  let num = []
  stock.getSinaIndustryClassified().then(async ({ data }) => {
    console.log('共' + data.length + '行业')
    for (let a = 0; a < data.length; a++) {
      // console.log(a + 1, data[a].tag, data[a].name)
      num.push({ tag: data[a].tag, name: data[a].name })
      // await getSinaClassifyDetails(data[a])
    }
    console.log(num)
    // console.log('共', num.length)
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
      console.log(
        classObj.name,
        classObj.tag,
        index + '/' + T,
        '===============',
        data.length,
        '只'
      )
      for (let b = 0; b < data.length; b++) {
        await getHistory(
          { code: data[b].symbol, name: data[b].name },
          b + 1,
          data.length
        )
      }
    })
    .catch(e => {
      console.log(e)
    })
}
// 按行业查询
// getSinaIndustryClassified()

const test = async calslists => {
  let classList = calslists || [
    // { tag: 'new_fjzz', name: '飞机制造' },
    // { tag: 'new_hghy', name: '化工行业' },
    // { tag: 'new_jdhy', name: '家电行业' },
    // { tag: 'new_jdly', name: '酒店旅游' },
    // { tag: 'new_jxhy', name: '机械行业' },
    // { tag: 'new_nlmy', name: '农林牧渔' },
    // { tag: 'new_nyhf', name: '农药化肥' },
    // { tag: 'new_qczz', name: '汽车制造' },
    // { tag: 'new_sphy', name: '食品行业' },
    // { tag: 'new_syhy', name: '石油行业' },

    // { tag: 'new_swzz', name: '生物制药' },
    // { tag: 'new_ylqx', name: '医疗器械' },
    { tag: 'new_ysjs', name: '有色金属' }
  ]
  for (let b = 0; b < classList.length; b++) {
    let { tag, name } = classList[b]
    await getSinaClassifyDetails({ tag, name }, b + 1, classList.length)
  }
}

test()

//
