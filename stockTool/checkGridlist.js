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

let name = ''
const { writeFile } = require('./wirter')
const check = (list, N, price, symbol) => {
  name = N
  msg.number += 1
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

  let gain = list.map(item => item[7] * 1)

  let prices = list.map(item => item[3] * 1)

  band(prices)

  // 历史最低
  let ishistoryMin = historyMin(prices)
  // 和最高值比较相比低
  let isMin = activeMax(prices)
  // 比较活跃
  let isActive = activeLength(gain)
  // 最近几天刚表现出来
  let is_lastRise = last_rise(gain)

  if (isActive && isMin && is_lastRise) {
    let str =
      '请注意 ========================================= ' +
      name +
      '  ' +
      symbol +
      '   ' +
      price
    console.log(str)
    let { noteList } = msg
    noteList.push({ name, symbol, price })
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

const activeLength = list => {
  let { maxList, plus } = maxL(list, 7)
  let isActive = maxList.length > 7
  if (isActive) {
    writeFile(name + ' 较活跃， 值： ' + plus.length + ' / ' + maxList.length)
  }
  return isActive
}
const activeMax = list => {
  let maxPrice = Math.max(...list)
  let price = list.pop()
  let isminPrice = maxPrice - 1.5 * price > 0
  if (isminPrice) {
    writeFile(name + ' 比较低， 最高/当前   ' + maxPrice + ' / ' + price)
  }
  return isminPrice
}

exports.check = check
