const dip = require('dipiper')

const { writeAll } = require('./wirter')

dip.stock.symbols.getStockList().then(data => {
  //数据存储、处理逻辑，请自行实现
  if (data?.length) {
    console.log(data.length)
    writeAll(data)
  }
})
