let msg = {
  fileName: '',
  p_change: 3,
  max_min_prices: [30, 5], //  范围大小 最好调节这个参数
  band: 0.3, // 波距起伏的程度 越小数量越多
  diff: 0.07, // 目前与波的差距  越大数量越多
  bandNumber: 4, // 波数
  activeNumber: 25, // 活跃值 默认值 15 可以理解为连续上涨达标 7% 的天数 最好调节这个参数来筛选 可以是 0
  noteList: [],
  temp: {},
  checktemp: {},
  disabledtemp: {},
  path: '../../Desktop/look/',
  furthest_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)
    .toLocaleDateString()
    .replace(/\//g, '-'),
  // 默认是今天
  recent_time: ''
}

exports.msg = msg
