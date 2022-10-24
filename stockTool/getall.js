const { stock } = require('tushare')

stock.getAllStocks().then(({ data }) => {
  console.log(data)
})
