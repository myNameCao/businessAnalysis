let { getHistory } = require('./getHistory')

let { writeList } = require('./wirter')

let { list } = require('./list_8')
let { msg } = require('../msg')

const testList = async () => {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    await getHistory(item)
  }

  let { list_8 } = msg

  writeList(list_8, 'list_8')
}
testList()
