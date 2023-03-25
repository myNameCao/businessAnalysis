let msg = {
  fileName: '',
  p_change: 0,
  last_day: 5,
  max_min_prices: [40, 5], //  范围大小 最好调节这个参数
  band: 0.2, // 起伏程度 越小数量越多
  diff: 0.2, //低差  越大数量越多
  bandNumber: 4, // 起伏次数
  activeNumber: 0, //  默认值 15 达标 7% 数量 可以是 0
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
