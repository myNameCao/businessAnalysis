// 目前只看一年的数据

const comT = i => {
  return i.reduce((a, b) => a + b)
}

const maxL = (i, p) => {
  return i.filter(i => Math.abs(i) >= p)
}

const { writeFile } = require('./wirter')
const check = (list, name, price) => {
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
  // console.log('最远时间：', list.slice(-100)[0][0])
  let gain_20 = gain.slice(-20) // 最近二十次  大概是1个月的数据
  let gain_10 = gain.slice(-10) // 最近二十次  大概是半个月的数据
  let gain_5 = gain.slice(-5) // 最近二十次  大概是半个月的数据

  if (active_90(gain_40, name) && active_5(gain_20)) {
    console.log(
      name,

      '======================================================',
      '满足要求'
    )
    writeFile(
      '请注意 ==================================================================================== ' +
        name +
        '   ' +
        price
    )
  }
}

// 最近一周的表现
const active_5 = list => {
  return comT(list) < -10 && list[4] > 0 && list[3] > 0
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
  console.log('活跃值:', maxList.length)
  let isActive = maxList.length > 7
  if (isActive) {
    writeFile(name + '  活跃值: ' + maxList.length)
  }
  return isActive
}

exports.check = check
