const { stock } = require('tushare')
const { writeList } = require('./wirter')

console.log(stock)

// stock.getAllStocks().then(({ data }) => {
//   console.log(data)
//   writeList(data, 'all1')
// })

const axios = require('axios')

let url = 'http://218.244.146.57/static/all.csv'
axios.get(url).then(res => {
  console.log(res)
})
