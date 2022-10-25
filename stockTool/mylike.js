let { getHistory } = require('./getHistory')

let { writeFile } = require('./wirter')

let { list } = require('./list')
writeFile(
  '                                            日期: ' +
    new Date().toLocaleDateString()
)
const testList = async () => {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    await getHistory(item)
  }
}
testList()
