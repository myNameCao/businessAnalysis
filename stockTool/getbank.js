const dip = require('dipiper')
let { list } = require('./list')
let getBank = async item => {
  console.log(item.symbol.slice(2))
  await dip.stock.symbols.getBoards(item.symbol.slice(2)).then(data => {
    item.BK = data[0].name
    item.BK_code = data[0].code
  })
}
exports.getBank = getBank
