let { getHistory } = require('./getHistory')

let { list } = require('./list')

const testList = async () => {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    await getHistory(item)
  }
}
testList()
