let list = [{ name: '山东黄金', symbol: '600647' }]

let { getHistory } = require('./getHistory')

const testList = async () => {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    await getHistory(item)
  }
}
testList()
