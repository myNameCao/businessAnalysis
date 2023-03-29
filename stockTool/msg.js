let msg = {
  p_change: -10,
  last_day: [5, 0],
  max_min_prices: [30, 5],
  band: 0.2, // 越小越多
  diff: 0.15, // 越大越多
  bandNumber: 4, //次数
  activeNumber: 15, //默认值 15  7%
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
