let { rmSync: rm, writeFile: wf } = require('fs') // 引入fs模块

var XLSX = require('xlsx')

let { msg } = require('./msg')

const writeFile = (text, feature) => {
  // 传递了追加参数 { 'flag': 'a' }
  // 注意时机
  let { path, fileName } = msg
  let writer_path = feature
    ? `${path}${fileName}_${feature}.txt`
    : `${path}${fileName}.txt`
  wf(writer_path, text + '\n', { flag: 'a' }, err => {
    if (err) console.log(err)
  })
}

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

const rmSync = () => {
  let { path, fileName } = msg
  rm(`${path}${fileName}.txt`, { force: true })
}

const ceateExcel = (data, name) => {
  let { path } = msg
  let writer_path = `${path}${name}.xlsx`

  const sheetOptions = {
    '!cols': [
      { wch: 2 },
      { wch: 2 },
      { wch: 5 },
      { wch: 5 },
      { wch: 40 },
      { wch: 25 },
      { wch: 30 },
      { wch: 5 },
      { wch: 5 }
    ]
  }
  rm(writer_path, { force: true })

  const headerStyle = {
    font: {
      name: '宋体',
      bold: true,
      sz: '20'
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center'
    }
  }

  var wb = XLSX.utils.book_new()
  var ws = XLSX.utils.json_to_sheet(data)

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, writer_path, {
    compression: true
  })
}
exports.writeFile = writeFile
exports.ceateExcel = ceateExcel
exports.writeList = writeList
exports.rmSync = rmSync
