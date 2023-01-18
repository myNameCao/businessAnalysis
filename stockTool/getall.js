const dip = require('dipiper')

const { writeList } = require('./wirter')

dip.stock.symbols.getStockList().then(data => {
  //数据存储、处理逻辑，请自行实现
  if (data?.length) {
    console.log(data.length)
    writeList(data, 'all')
  }
})
