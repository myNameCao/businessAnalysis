let { getHistory } = require('./getHistory')

let { writeFile, ceateExcel } = require('./wirter')

let { list } = require('./list')
let { msg } = require('./msg')

writeFile('                     日期: ' + new Date().toLocaleDateString())
const testList = async () => {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    await getHistory(item)
  }

  let { noteList } = msg
  ceateExcel(noteList, new Date().toLocaleDateString().replace(/\//g, '-'))
}
testList()
