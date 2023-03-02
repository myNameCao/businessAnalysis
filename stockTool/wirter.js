let { rmSync: rm, writeFile: wf } = require('fs') // 引入fs模块

var XLSX = require('xlsx-js-style')

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

  const sheetOptions = [
    { wch: 5 },
    { wch: 5 },
    { wch: 10 },
    { wch: 10 },
    { wch: 60 },
    { wch: 30 },
    { wch: 40 },
    { wch: 10 },
    { wch: 10 }
  ]

  rm(writer_path, { force: true })

  const headerStyle = {
    font: {
      sz: '14',
      color: { rgb: 'FFFFAA00' }
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center'
    }
  }

  let num = data.length
  while (num--) {
    let item = data[num]
    for (let key in item) {
      item[key] = {
        v: item[key],
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
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, writer_path, {
    compression: true
  })
}

exports.writeFile = writeFile
exports.ceateExcel = ceateExcel
exports.writeList = writeList
exports.rmSync = rmSync
