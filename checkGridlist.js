// 目前只看一年的数据

const comT = i => {
  return i.reduce((a, b) => a + b)
}

const maxL = (i, p) => {
  return i.filter(i => Math.abs(i) > p)
}

const { writeFile } = require('./wirter')
const check = (list, name) => {
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

  let gain_40 = gain.slice(-100) // 最近六十次  大概是6个月的数据
  // console.log('最远时间：', list.slice(-100)[0][0])
  let gain_20 = gain.slice(-20) // 最近二十次  大概是1个月的数据
  let gain_10 = gain.slice(-10) // 最近二十次  大概是半个月的数据
  let gain_5 = gain.slice(-5) // 最近二十次  大概是半个月的数据

  if (active_5(gain_5) && active_10(gain_40)) {
    console.log(
      name,
      '======================================================',
      '满足要求'
    )
    writeFile(
      '请注意 ==================================================================================== ' +
        name
    )
  }
}

// 最近一周的表现
const active_5 = list => {
  return comT(list) < 3 && list[4] > 0 && list[3] > 0 && list[2] > 0
}
const active_10 = list => {
  let a = comT(list)
  console.log(a)
  return 1
}
exports.check = check
