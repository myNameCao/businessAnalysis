let msg = {
  p_change: -2,
  last_day: [5, 3],
  max_min_prices: [30, 5],
  band: 0.2, // 起伏 越小越多
  diff: 0.15, //低差 越大越多
  bandNumber: 4, //起伏次数
  activeNumber: 15, //默认值 15 达标 7%
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
