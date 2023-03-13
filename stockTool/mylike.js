let { getHistory } = require('./getHistory')

let { ceateExcel } = require('./wirter')

let { list } = require('./list')
let { msg } = require('./msg')
const testList = async () => {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    await getHistory(item)
  }
  let { noteList } = msg

  console.log(
    'DONE',
    noteList.length,
    'MACD',
    noteList.filter(item => !!item['MACD']).length,
    'KDJ',
    noteList.filter(item => !!item['KDJ']).length
  )
  let sortList = noteList.sort((a, b) => {
    return b['active'] - a['active']
  })
  ceateExcel(sortList, new Date().toLocaleDateString().replace(/\//g, '-'))
}
testList()
