let { getHistory } = require('./getHistory')

let { getBank } = require('./getbank')

let { ceateExcel } = require('./wirter')

let { list } = require('./list')
let { msg } = require('./msg')
const testList = async () => {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    await getHistory(item)
  }
  let { noteList } = msg
  let sortList = noteList.sort((a, b) => {
    return b['active'] - a['active']
  })
  for (let i = 0; i < sortList.length; i++) {
    let item = sortList[i]
    await getBank(item)
  }
  console.log(
    'DONE',
    noteList.length,
    'MACD',
    noteList.filter(item => !!item['MACD']).length,
    'KDJ',
    noteList.filter(item => !!item['KDJ']).length
  )
  ceateExcel(sortList, new Date().toLocaleDateString().replace(/\//g, '-'))
}
testList()
