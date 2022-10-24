// 目前只看一年的数据

const comT = i => {
  return i.reduce((a, b) => a + b)
}

const maxL = (i, p) => {
  return i.filter(i => Math.abs(i) >= p)
}

const { writeFile } = require('./wirter')
const check = (list, name, price, symbol) => {
  // console.log(list.pop(), price)
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

  let gain = list.map(item => item[7] * 1) // 每天的涨幅

  let prices = list.map(item => item[3] * 1) // 每天的涨幅

  active_10(prices.slice(-60), name)

  let gain_40 = gain.slice(-100) // 最近六十次  大概是6个月的数据
  let price_30 = prices.slice(-60) // 三个月
  let gain_20 = gain.slice(-20) // 最近二十次  大概是1个月的数据

  if (
    active_90(gain_40, name) &&
    active_Max_price(price_30, name) &&
    active_5(gain_20, name)
  ) {
    let str =
      '请注意 ======================================================================== ' +
      name +
      '  ' +
      symbol +
      '   ' +
      price
    console.log(str)
    writeFile(str)
  }
}

//  具体当前的表现  这里是一个月的数据
const active_5 = (list, name) => {
  //  最近两天的数据
  let length = list.length
  return comT(list) < -5 && list[length - 1] > 0 && list[length - 2] > 0
}

// 三个月历史最低
const active_10 = (list, name) => {
  let minPrice = Math.min(...list)
  let price = list.pop()
  if (minPrice === price) {
    writeFile(name + ' 历史最低')
  }
}
// 三个月的数据比较活跃的
const active_90 = (list, name) => {
  let maxList = maxL(list, 7)
  let isActive = maxList.length > 7

  return isActive
}

const active_Max_price = (list, name) => {
  let maxPrice = Math.max(...list)
  let price = list.pop()

  let isminPrice = maxPrice - 1.5 * price > 0

  console.log(maxPrice, price)

  if (isminPrice) {
    writeFile(name + ' 当前比较低迷 ******     ' + maxPrice + '/' + price)
  }

  return isminPrice
}

exports.check = check
