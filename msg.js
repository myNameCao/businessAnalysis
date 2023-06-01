let msg = {
  p_change: 1,
  toUpNumber: 2, // 最近几天的
  last_day: [2, 2],
  max_min_prices: [30, 5],
  band: 0.15, // 趋向小
  diff: 0.15, // 趋向大
  bandNumber: 4, //次数
  onMacd_Kdj: false,
  activeNumber: 10, //默认值 15  7%
  noteList: [],
  list_8: [],
  myselect: [],
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
