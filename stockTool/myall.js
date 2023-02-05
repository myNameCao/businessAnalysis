let { getHistory } = require('./getHistory')

let { writeFile, rmSync, writeList } = require('./wirter')

let { list } = require('./all')
let { msg } = require('./msg')

let str = '全部'
msg[process.pid] = str
msg.fileName = str

rmSync()

writeFile('                     日期: ' + new Date().toLocaleDateString())
const testList = async () => {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    await getHistory(item)
  }

  let { checktemp, disabledtemp, noteList } = msg
  console.log(
    `有效数据： ${Object.keys(checktemp).length} 条,     无效数据：${
      Object.keys(disabledtemp).length
    } 条`
  )

  writeList(noteList, 'list')
  writeList(disabledtemp, 'disabledtemp')
}
testList()
