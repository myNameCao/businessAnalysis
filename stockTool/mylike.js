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
    'done',
    noteList.length,
    'macd',
    noteList.filter(item => item['macd']).length,
    'kdj',
    noteList.filter(item => !!item['kdj']).length
  )
  ceateExcel(noteList, new Date().toLocaleDateString().replace(/\//g, '-'))
}
testList()
