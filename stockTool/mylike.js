let { getBank } = require('./getbank')
let { ceateExcel, writeList } = require('./wirter')

let { list } = require('./list')
let { list: list_8 } = require('./list_8')
const testList = async () => {
  console.log(
    'DONE',
    list.length,
    'MACD',
    list.filter(item => !!item['MACD']).length,
    'KDJ',
    list.filter(item => !!item['KDJ']).length
  )
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    await getBank(item)
  }
  console.log('=====================')
  for (let i = 0; i < list_8.length; i++) {
    let item = list_8[i]
    await getBank(item)
  }
  let sortList = list.sort((a, b) => {
    return b['BK_code'].slice(2) * 1 - a['BK_code'].slice(2) * 1
  })
  let sortList_8 = list_8.sort((a, b) => {
    return b['BK_code'].slice(2) * 1 - a['BK_code'].slice(2) * 1
  })
  writeList(sortList, 'list')
  writeList(sortList_8, 'list_8')
  ceateExcel(sortList, new Date().toLocaleDateString().replace(/\//g, '-'))
}
testList()
