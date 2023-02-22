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
  let gain = list.map(item => item[7] * 1)

  let prices = list.map(item => item[3] * 1)

  // console.log(`${name} ======  ${prices.slice(-1)}`)

  // 量
  let amount = list.map(item => item[6] * 1)

  let { isDown, diffnum, str } = band(prices, name)

  // 历史最低
  let ishistoryMin = historyMin(prices)
  // 比较活跃
  let { isActive, plus, maxList } = activeLength(gain)
  // 最近几天刚表现出来
  let is_lastRise = last_rise(gain)

  if (isActive && isDown) {
    str =
      name +
      '    ' +
      diffnum +
      '  ' +
      str +
      '  活跃值： ' +
      plus +
      ' / ' +
      maxList
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

const activeLength = list => {
  let { maxList, plus } = maxL(list, 7)
  let isActive = maxList.length > msg.activeNumber
  return { isActive, plus: plus.length, maxList: maxList.length }
}

exports.check = check
