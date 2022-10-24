const { stock } = require('tushare')

const { check } = require('./checkGridlist')

const length = 12 * 30

const getHistory = async (options, b, t) => {
  let { name, price, symbol } = options

  if (!symbol) return
  console.log(name, '价格：' + price, '====', b + '/' + t)
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
      return (
        new Date(item[0]).getTime() >
        new Date().getTime() - length * 24 * 60 * 60 * 1000
      )
    })
    check(list, name, price, symbol)
  })
}

// getHistory({ symbol: '000530', name: '冰山' })

exports.getHistory = getHistory
