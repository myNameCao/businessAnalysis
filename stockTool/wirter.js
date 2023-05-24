let { rmSync: rm, writeFile: wf } = require('fs') // 引入fs模块

var XLSX = require('xlsx-js-style')

let { msg } = require('../msg')

const writeList = (L, name) => {
  rm(`./stockTool/${name}.js`, { force: true })
  let content = `let  list = ${JSON.stringify(L)}

  exports.list = list
  `
  // 写入文件内容（如果文件不存在会创建一个文件）
  wf(`./stockTool/${name}.js`, content, { flag: 'a' }, err => {
    if (err) console.log(err)
  })
}

/**
 *
 * @param {*} data
 * @param {*} name
 */
const ceateExcel = (data, name) => {
  let { path } = msg
  let writer_path = `${path}${name}.xlsx`

  const sheetOptions = [
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 30 },
    { wch: 8 },
    { wch: 8 },
    { wch: 50 },
    { wch: 10 },
    { wch: 10 },
    { wch: 40 },
    { wch: 40 },
    { wch: 10 },
    { wch: 10 }
  ]
  // 如果文件存在，先删除
  rm(writer_path, { force: true })
  let num = data.length
  while (num--) {
    let item = data[num]
    for (let key in item) {
      item[key] = {
        v: item[key],
        t: key === 'name' ? 's' : 'n',
        s: {
          font: {
            sz: '12',
            color: { rgb: item.note ? 'FF0000' : '' }
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center'
          }
        }
      }
    }
  }

  var wb = XLSX.utils.book_new()
  var ws = XLSX.utils.json_to_sheet(data)

  // 设置表头样式
  ws['!cols'] = sheetOptions
  ws['!rows'] = data.map(() => ({ hpx: 30 }))
  ws['!rows'].unshift({ hpx: 20 })
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, writer_path, {
    compression: true
  })
}
exports.ceateExcel = ceateExcel
exports.writeList = writeList
