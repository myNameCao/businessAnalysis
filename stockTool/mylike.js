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
  ceateExcel(noteList, new Date().toLocaleDateString().replace(/\//g, '-'))
  console.log('done', noteList.length)
}
testList()
