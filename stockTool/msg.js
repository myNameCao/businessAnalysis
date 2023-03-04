let msg = {
  fileName: '注意',
  max_min_prices: [30, 5], //  最高价格
  band: 0.2, // 波距  起伏的程度
  diff: 0.2, // 目前与波的差距 查看现在的状态
  bandNumber: 3, // 波数
  activeNumber: 15, // 活跃值
  noteList: [],
  temp: {},
  checktemp: {},
  disabledtemp: {},
  path: '../../Desktop/look/',
  // 大概是一年前 到现在
  furthest_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 400)
    .toLocaleDateString()
    .replace(/\//g, '-'),
  // 默认是今天
  recent_time: ''
}

exports.msg = msg
