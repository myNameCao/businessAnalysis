let { getHistory } = require('./getHistory')

let { writeList } = require('./wirter')

let { list } = require('./myselect')
let { msg } = require('../msg')

const testList = async () => {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    await getHistory(item)
  }

  let { myselect } = msg

  writeList(myselect, 'myselect_show')
}
testList()
