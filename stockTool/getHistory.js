const { stock } = require('tushare')

const { check } = require('./checkGridlist')

let { msg } = require('./msg')

const getHistory = async (options, b, t) => {
  let { name, price, symbol } = options

  if (!symbol) return
  let { furthest_time, recent_time, temp } = msg
  console.log(name, '价格：' + price, '====', b + '/' + t)
  // 去重复
  if (temp[symbol]) {
    console.log('重复了')
    return
  }
  temp[symbol] = true
  await stock.getHistory({ code: symbol }).then(({ data }) => {
    if (!data) {
      console.log('没有数据')
      return
    }
    let list = data?.record || []
    if (!Array.isArray(list)) {
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
    check(list, name, price, symbol)
  })
}

exports.getHistory = getHistory
