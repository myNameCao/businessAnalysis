const { stock } = require('tushare')

const { writeFile } = require('./wirter')
const { getHistory } = require('./getHistory')

const getSinaClassifyDetails = async (classObj, index, T, total) => {
  var options1 = {
    tag: classObj.tag
  }
  return await stock
    .getSinaClassifyDetails(options1)
    .then(async ({ data }) => {
      console.log(data)
      if (!data) return
      writeFile(
        classObj.name + '***********************有   ' + data.length + '   个'
      )

      total.num += data.length

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
  let total = { num: 0 }
  for (let b = 0; b < classList.length; b++) {
    let { tag, name } = classList[b]
    await getSinaClassifyDetails({ tag, name }, b + 1, classList.length, total)
  }
  writeFile('检查完成============================   ' + total.num + '  只')
}

// test()
exports.test = test
