let { rmSync: rm, writeFile: wf } = require('fs') // 引入fs模块

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

exports.writeFile = writeFile
exports.writeList = writeList
exports.rmSync = rmSync
