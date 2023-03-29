const { stock } = require('tushare')

const { check } = require('./checkGridlist')

let { msg } = require('../msg')

const getHistory = async ({ name, symbol }) => {
  if (!symbol) return
  let { furthest_time, recent_time, temp, disabledtemp, checktemp } = msg
  // 去重复
  if (temp[symbol]) {
    console.log('重复了')
    return
  }
  temp[symbol] = true
  await stock.getHistory({ code: symbol }).then(({ data }) => {
    if (!data) {
      console.log(name + '           没有数据')
      disabledtemp[symbol] = name
      return
    }

    let list = data?.record || []
    if (!Array.isArray(list)) {
      console.log(name + '           没有数据')
      disabledtemp[symbol] = name
      return
    }
    list = list.filter(item => {
      let IndexTime = new Date(item[0]).getTime()

      let furthest = new Date(furthest_time).getTime()
      let recent = recent_time
        ? new Date(recent_time).getTime()
        : new Date().getTime()
      return IndexTime >= furthest && IndexTime <= recent
    })
    checktemp[symbol] = name
    check(list, name, symbol)
  })
}

exports.getHistory = getHistory
