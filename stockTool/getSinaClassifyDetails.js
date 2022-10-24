const { stock } = require('tushare')

const { writeFile } = require('./wirter')
const { getHistory } = require('./getHistory')

const getSinaClassifyDetails = async (classObj, index, T) => {
  var options1 = {
    tag: classObj.tag
  }
  return await stock
    .getSinaClassifyDetails(options1)
    .then(async ({ data }) => {
      writeFile(
        classObj.name + '***********************有   ' + data.length + '   个'
      )

      console.log(
        classObj.tag,
        index + '/' + T,
        '***************************************************************************',
        classObj.name
      )
      for (let b = 0; b < data.length; b++) {
        await getHistory(data[b], b + 1, data.length)
      }
    })
    .catch(e => {
      console.log(e)
    })
}
// 按行业查询

const test = async classList => {
  if (!classList.length) return
  for (let b = 0; b < classList.length; b++) {
    let { tag, name } = classList[b]
    await getSinaClassifyDetails({ tag, name }, b + 1, classList.length)
  }
  writeFile('检查完成')
}

// test()
exports.test = test
