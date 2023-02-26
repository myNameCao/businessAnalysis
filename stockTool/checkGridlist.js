// 目前只看一年的数据

const comT = i => {
  return i.reduce((a, b) => a + b)
}

const maxL = (i, p) => {
  let maxList = i.filter(i => Math.abs(i) >= p)
  let plus = maxList.filter(i => i > 0) // 正
  return {
    maxList,
    plus
  }
}

let { msg } = require('./msg')

let { band } = require('./band')
let { MACD } = require('./indicator')

let name = ''
const { writeFile } = require('./wirter')
const check = (list, N, symbol) => {
  // ;[
  //0   '2022-10-21',
  // 1  '26.880',
  //2   '27.150',
  // 3  '26.200',
  //4   '26.200',
  //5   '313286.69',
  // 6   '-0.480',
  // 7  '-1.80',
  //   '26.760',
  //   '26.503',
  //   '27.396',
  //   '307,350.03',
  //   '415,196.28',
  //   '433,029.18',
  //   '0.86'
  // ]
  //
  //  全局设置 名字
  name = N

  // 涨幅
  let gain = list.map(item => item[7] * 1)
  // 价格
  let prices = list.map(item => item[3] * 1)
  // console.log(`${name} ======  ${prices.slice(-1)}`)
  // 量
  let amount = list.map(item => item[6] * 1)

  let { isDown, diffnum, str } = band(prices, name)

  // 历史最低
  let ishistoryMin = historyMin(prices)
  // 获得金叉
  let { have_fork, last_7_macd } = golden_fork(name, prices)
  // 比较活跃
  let { isActive, plus, maxList } = activeLength(gain)
  // 最近几天刚表现出来
  let is_lastRise = last_rise(gain)

  if (isActive && isDown && have_fork) {
    str =
      name +
      '    ' +
      diffnum +
      '  ' +
      str +
      '  活跃值： ' +
      plus +
      ' / ' +
      maxList +
      ' macd [' +
      last_7_macd.join(',') +
      '  ]'
    let { noteList } = msg
    noteList.push({ name, symbol })
    writeFile(str)
  }
}

//  具体当前的表现  一个月
const last_rise = list => {
  //  最近两天的数据
  let length = list.length
  let weeklist = list.slice(-5)
  return comT(weeklist) < 0 && list[length - 1] > 0 && list[length - 2] > 0
}
const historyMin = list => {
  let minPrice = Math.min(...list)
  let average = comT(list) / list.length
  let price = list.pop()
  let isMIn = minPrice === price
  if (isMIn) {
    writeFile(
      name + ' 历史最低, 区间均值 / 当前 ' + average.toFixed(2) + '/' + price
    )
  }
  return isMIn
}

const golden_fork = (name, prices) => {
  // console.log(prices.slice(-5))
  // 最近 7 天
  let { diffs, deas, bars } = MACD(prices)
  //  macd
  const last_7_bars = bars.map(i => Math.round(i * 1000) / 1000).slice(-5) || []
  // dif
  const last_7_diff =
    diffs.map(i => Math.round(i * 1000) / 1000).slice(-5) || []
  // dea
  const last_7_dea = deas.map(i => Math.round(i * 1000) / 1000).slice(-5) || []
  // 上升金叉
  let have_fork = last_7_bars.some((item, i) => {
    let p = last_7_bars[i - 1]
    if (p && p <= 0 && item >= 0) {
      console.log(`${name}:  ${last_7_bars}`)
      return true
    }
    return false
  })
  return { have_fork, last_7_macd: last_7_bars, last_7_diff, last_7_dea }
}
const activeLength = list => {
  let { maxList, plus } = maxL(list, 7)
  let isActive = maxList.length > msg.activeNumber
  return { isActive, plus: plus.length, maxList: maxList.length }
}

exports.check = check
