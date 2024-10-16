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

let { msg } = require('../msg')
let { band } = require('./band')
let { MACD, KDJ, OBV } = require('./indicator')

let name = ''
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
  // 1  '26.880',开
  //2   '27.150', 高
  // 3  '26.200',收
  //4   '26.200',低
  //5   '313286.69',量
  // 6   '-0.480',价格变动
  // 7  '-1.80', 涨幅
  //   '26.760', 5日
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

  let gain_time = list.map(item => ({
    time: item[0],
    gain: item[7] * 1,
    openP: item[1] * 1,
    closeP: item[3] * 1,
    highP: item[2] * 1,
    lowP: item[4] * 1
  }))

  // 价格
  let prices = list.map(item => item[3] * 1)

  let up_data_num = gain.slice(-msg.last_day[0]).filter(i => i > 0).length

  console.log(
    `${name} ==  ${prices.slice(-1)},   ${list[0][0]}-${list.slice(-1)[0][0]} `
  )

  // 价格过滤
  if (
    prices.slice(-1)[0] >= msg.max_min_prices[0] ||
    prices.slice(-1)[0] <= msg.max_min_prices[1]
  ) {
    return
  }

  // 量
  let amount = list.map(item => item[6] * 1)

  let { isDown, diffnum, result_list } = band(prices, name)

  // 历史最低
  let ishistoryMin = historyMin(prices)
  // 获得金叉
  let { have_fork, macd_list } = Macd_fork(name, prices)
  let max_min_close = list.map(item => [item[2] * 1, item[4] * 1, item[3] * 1])
  let { is_kdj_Fork, kdj_list } = KDJ_fork(name, max_min_close)

  let close_volume = list.map(item => [item[3] * 1, item[5] * 1])

  OBV_fork(name, close_volume)

  // 比较活跃
  let { isActive, plus, maxList } = activeLength(gain)
  // 最近几天刚表现出来
  console.log(name, `活跃值 ${maxList}`)
  let obj_atcive = {
    symbol,
    name,
    BK: '',
    price: prices.slice(-1)[0] * 1,
    gains: gain.slice(-10),
    diffnum,
    band: '',
    plus_active: plus,
    active: maxList,
    KDJ: '',
    MACD: ''
  }

  let lock_list = []
  for (let i = 1; i < gain_time.length; i++) {
    let pre_item = gain_time[i - 1]
    let item = gain_time[i]
    if (isLock(pre_item, item)) {
      let temp_l = []
      temp_l.push(pre_item.gain, item.gain)
      for (let t = 0; t < 5; t++) {
        i++
        item = gain_time[i]
        item && temp_l.push(item.gain)
      }
      lock_list.push(temp_l)
    }
  }

  let { noteList, list_8, myselect } = msg
  // 所有都 向上

  let [a, b] = gain_time.slice(-2)

  if (isLock(a, b)) {
    obj_atcive.lock_list = lock_list
    list_8.push(obj_atcive)
  }

  if (have_fork) obj_atcive.MACD = macd_list.join('|')

  if (is_kdj_Fork) obj_atcive.KDJ = kdj_list.join('|')

  if (have_fork && is_kdj_Fork) obj_atcive.note = true

  myselect.push(obj_atcive)

  if (isDown) {
    obj_atcive.band = result_list.join('|')
  }
  //  活跃值切 波低
  if (isActive && isDown) {
    // 大于 要求的天数
    if (up_data_num >= msg.last_day[1] && gain.slice(-1) * 1 > msg.p_change) {
      if (msg.onMacd_Kdj && (have_fork || is_kdj_Fork)) {
        noteList.push(obj_atcive)
      }
      if (!msg.onMacd_Kdj) {
        noteList.push(obj_atcive)
      }
    }
  }
}

//  倒 T 字形 分析
const isLock1 = (a, b) => {
  let { openP, closeP, highP, lowP } = b
  let up = (highP - closeP) / closeP
  let op = openP != highP
  let isred = closeP > openP

  if (up >= 0.04 && op && isred) {
    return true
  }
  false
}

//  Steady to the top
const isLock2 = (a, b) => {
  let { highP, lowP, gain } = b
  if (gain > 9 && highP == lowP) {
    return true
  }
  false
}

const isLock = (a, b) => {
  let { highP, lowP, gain } = b
  return gain >= 9
}

const isLock0 = (a, b) => {
  let { openP, closeP, highP, lowP } = b
  let up = (highP - lowP) / closeP
  // 按价格算
  let p_change = (closeP - lowP) / closeP <= 0.03
  let isred = closeP > openP
  if (up >= 0.08 && p_change && isred) {
    return true
  }
  false
}

/**
 *
 * @param {*} list
 * @returns
 */
const historyMin = list => {
  let minPrice = Math.min(...list)
  let average = comT(list) / list.length
  let price = list.slice(-1)[0]
  let isMIn = minPrice === price
  if (isMIn) {
    console.log(
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
const Macd_fork = (name, prices) => {
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
  let kdjs = KDJ(prices)
  let r_list = kdjs.slice(-3)
  let kdj_list = []
  let is_fork = r_list.some(({ k, d, j }, i) => {
    // 金叉
    if (Math.abs(k - d) < 5 && Math.abs(d - j) < 5) {
      let { j: j1 } = r_list[i - 1] || kdjs[kdjs.length - 4]
      // 上升金叉
      if (j1 <= j) {
        kdj_list = [k, d, j]
        console.log(`${name}: KDJ   ${k + ' ' + d + ' ' + j}`)
        return true
      }
    }
    return false
  })
  return { is_kdj_Fork: is_fork, kdj_list }
}

const activeLength = list => {
  let { maxList, plus } = maxL(list, 7)
  let isActive = maxList.length >= msg.activeNumber
  return { isActive, plus: plus.length, maxList: maxList.length }
}

/**
 * OBV 金叉
 * @param {*} name
 * @param {*} prices
 * [[ close,volume]]
 * @returns
 * 返回一个 对象包含运行的结果和最近的obv
 */
OBV_fork = (name, close_volume) => {
  // console.log(name,OBV(close_volume))
  // let obv_list = obv.slice(-5)
  // let obv_ma_list = obv_ma.slice(-5)
  // let is_fork = obv_list.some((item, i) => {
  //   let p = obv_list[i - 1]
  //   if (p && p <= 0 && item >= 0 && obv_ma_list[i] < 0) {
  //     console.log(`${name}: OBV   ${obv_list}`)
  //     return true
  //   }
  //   return false
  // })
}

exports.check = check
