/**
 * @param {*} i
 * 累计求和
 * @returns
 */
const comT = i => {
  return i.reduce((a, b) => a + b)
}

/**
 *
 * @param {*} i
 * list 列表
 * @param {*} p
 * 幅度
 * @returns
 */
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
let { MACD, KDJ } = require('./indicator')

let name = ''
const { writeFile } = require('./wirter')
/**
 *
 * @param {*} list
 * 列表
 * @param {*} N
 * name
 * @param {*} symbol
 * code
 */
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

  console.log(`${name} ======  ${prices.slice(-1)}`)
  // 量
  let amount = list.map(item => item[6] * 1)
  let { isDown, diffnum, str } = band(prices, name)

  // 历史最低
  let ishistoryMin = historyMin(prices)
  // 获得金叉
  let { have_fork, macd_list } = golden_fork(name, prices)
  let max_min_close = list.map(item => [item[2], item[4], item[3]])
  let { is_kdj_Fork, kdj_list } = KDJ_fork(name, max_min_close)

  // 比较活跃
  let { isActive, plus, maxList } = activeLength(gain)
  // 最近几天刚表现出来
  let is_lastRise = last_rise(gain)
  if (isActive && isDown) {
    let { noteList } = msg
    str =
      name + '' + diffnum + '  ' + str + '  活跃值： ' + plus + ' / ' + maxList
    if (have_fork) {
      noteList.push({ name, symbol })
      writeFile(str + ' macd [' + macd_list.join(',') + '  ]')
    }
    if (is_kdj_Fork) {
      noteList.push({ name, symbol })
      writeFile((str += ' kdj [' + kdj_list.join(',') + '  ]'))
    }
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
  let price = list.slice(-1)[0]
  let isMIn = minPrice === price
  if (isMIn) {
    writeFile(
      name + ' 历史最低, 区间均值 / 当前 ' + average.toFixed(2) + '/' + price
    )
  }
  return isMIn
}
/**
 * macd 金叉
 * @param {*} name
 * @param {*} prices
 * @returns
 * 返回一个 对象包含运行的结果和最近的macd
 */
const golden_fork = (name, prices) => {
  // 最近 7 天
  let { diffs, deas, bars } = MACD(prices)
  //  macd
  const last_7_bars = bars.slice(-5).map(i => Math.round(i * 1000) / 1000) || []
  // dif
  const last_7_diff =
    diffs.slice(-5).map(i => Math.round(i * 1000) / 1000) || []
  // dea
  const last_7_dea = deas.slice(-5).map(i => Math.round(i * 1000) / 1000) || []
  // 上升金叉
  let have_fork = last_7_bars.some((item, i) => {
    let p = last_7_bars[i - 1]
    if (p && p <= 0 && item >= 0 && last_7_diff[i] < 0) {
      console.log(`${name}: MACD   ${last_7_bars}`)
      return true
    }
    return false
  })
  return { have_fork, macd_list: last_7_bars, last_7_diff, last_7_dea }
}
/**
 * kdj 金叉
 * @param {*} name
 * @param {*} prices
 * [[max, min, close]]
 * @returns
 * 返回一个 对象包含运行的结果和最近的kdj
 */
const KDJ_fork = (name, prices) => {
  // 最近 7 天
  let kdjs = KDJ(prices)
  let r_list = kdjs.slice(-3)
  let is_fork = r_list.some(({ k, d, j }, i) => {
    // 金叉
    if (Math.abs(k - d) < 3 && Math.abs(d - j) < 3) {
      let { j: j1 } = r_list[i - 1] || kdjs[kdjs.length - 4]
      // 上升金叉
      if (j1 <= j) {
        console.log(`${name}: KDJ   ${k + ' ' + d + ' ' + j}`)
        return true
      }
    }
    return false
  })
  return { is_kdj_Fork: is_fork, kdj_list: r_list }
}

const activeLength = list => {
  let { maxList, plus } = maxL(list, 7)
  let isActive = maxList.length > msg.activeNumber
  return { isActive, plus: plus.length, maxList: maxList.length }
}

exports.check = check
