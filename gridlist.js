const { stock } = require('tushare')

const { check } = require('./checkGridlist')
const { writeFile } = require('./wirter')

const process = require('process')

writeFile('process id is ' + process.pid)

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
    // console.log(list.length)
    check(list, options.name)
  })
}

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
        classObj.tag,
        index + '/' + T,
        '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
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
  let classList = calslists || [
    { tag: 'new_blhy', name: '玻璃行业' },
    { tag: 'new_cbzz', name: '船舶制造' },
    { tag: 'new_cmyl', name: '传媒娱乐' },
    { tag: 'new_dlhy', name: '电力行业' },
    { tag: 'new_dqhy', name: '电器行业' },
    { tag: 'new_dzqj', name: '电子器件' },
    { tag: 'new_dzxx', name: '电子信息' },
    { tag: 'new_fdc', name: '房地产' },
    { tag: 'new_fdsb', name: '发电设备' },
    { tag: 'new_fjzz', name: '飞机制造' },
    { tag: 'new_fzhy', name: '纺织行业' },
    { tag: 'new_fzjx', name: '纺织机械' },
    { tag: 'new_fzxl', name: '服装鞋类' },
    { tag: 'new_glql', name: '公路桥梁' },
    { tag: 'new_gsgq', name: '供水供气' },
    { tag: 'new_gthy', name: '钢铁行业' },
    { tag: 'new_hbhy', name: '环保行业' },
    { tag: 'new_hghy', name: '化工行业' },
    { tag: 'new_hqhy', name: '化纤行业' },
    { tag: 'new_jdhy', name: '家电行业' },
    { tag: 'new_jdly', name: '酒店旅游' },
    { tag: 'new_jjhy', name: '家具行业' },
    { tag: 'new_jrhy', name: '金融行业' },
    { tag: 'new_jtys', name: '交通运输' },
    { tag: 'new_jxhy', name: '机械行业' },
    { tag: 'new_jzjc', name: '建筑建材' },
    { tag: 'new_kfq', name: '开发区' },
    { tag: 'new_ljhy', name: '酿酒行业' },
    { tag: 'new_mtc', name: '摩托车' },
    { tag: 'new_mthy', name: '煤炭行业' },
    { tag: 'new_nlmy', name: '农林牧渔' },
    { tag: 'new_nyhf', name: '农药化肥' },
    { tag: 'new_qczz', name: '汽车制造' },
    { tag: 'new_qtxy', name: '其它行业' },
    { tag: 'new_slzp', name: '塑料制品' },
    { tag: 'new_snhy', name: '水泥行业' },
    { tag: 'new_sphy', name: '食品行业' },
    { tag: 'new_stock', name: '次新股' },
    { tag: 'new_swzz', name: '生物制药' },
    { tag: 'new_sybh', name: '商业百货' },
    { tag: 'new_syhy', name: '石油行业' },
    { tag: 'new_tchy', name: '陶瓷行业' },
    { tag: 'new_wzwm', name: '物资外贸' },
    { tag: 'new_ylqx', name: '医疗器械' },
    { tag: 'new_yqyb', name: '仪器仪表' },
    { tag: 'new_ysbz', name: '印刷包装' },
    { tag: 'new_ysjs', name: '有色金属' },
    { tag: 'new_zhhy', name: '综合行业' },
    { tag: 'new_zzhy', name: '造纸行业' }
  ]
  for (let b = 0; b < classList.length; b++) {
    let { tag, name } = classList[b]
    await getSinaClassifyDetails({ tag, name }, b + 1, classList.length)
  }
}

test()

//
