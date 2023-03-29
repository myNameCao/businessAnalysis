const dip = require('dipiper')
let { list } = require('./list')
let getBank = async item => {
  await dip.stock.symbols.getBoards(item.symbol.slice(2)).then(data => {
    item.BK = data[0].name
  })
}
exports.getBank = getBank
