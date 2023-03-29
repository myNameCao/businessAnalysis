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

  let up_data_num = gain.slice(-msg.last_day[0]).filter(i => i > 0).length

  console.log(`${name} ======  ${prices.slice(-1)},${list.slice(-1)[0][0]} `)

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

  if (isActive && isDown) {
    let { noteList } = msg
    let obj_atcive = {
      symbol,
      name,
      BK: '',
      DIFFPRICE: diffnum,
      last_up_num: up_data_num,
      p_change: gain.slice(-1)[0] * 1,
      price: prices.slice(-1)[0] * 1,
      band: result_list.join('|'),
      KDJ: '',
      MACD: '',
      plus_active: plus,
      active: maxList
    }
    if (have_fork) {
      obj_atcive.MACD = macd_list.join('|')
    }
    if (is_kdj_Fork) {
      obj_atcive.KDJ = kdj_list.join('|')
    }
    if (have_fork && is_kdj_Fork) {
      obj_atcive.note = true
    }

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
  let isActive = maxList.length > msg.activeNumber
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
