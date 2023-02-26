let msg = {
  fileName: '注意',
  band: 0.3, // 波距  起伏的程度
  diff: 0.2, // 目前与波的差距 查看现在的状态
  bandNumber: 3, // 波数
  activeNumber: 5, // 活跃值
  noteList: [],
  temp: {},
  checktemp: {},
  disabledtemp: {},
  path: '../../Desktop/look/',
  furthest_time: '2022-01-01',
  // 默认是今天
  recent_time: ''
}

exports.msg = msg
