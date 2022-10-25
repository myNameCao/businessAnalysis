let { rmSync: rm, writeFile: wf } = require('fs') // 引入fs模块

let { msg } = require('./msg')

const writeFile = name => {
  // 写入文件内容（如果文件不存在会创建一个文件）

  // 传递了追加参数 { 'flag': 'a' }

  // let path = msg.fileName || '自己定义的'

  // 注意时机
  let { path, fileName } = msg
  wf(`${path}${fileName}.txt`, name + '\n', { flag: 'a' }, err => {
    if (err) console.log(err)
  })
}

const rmSync = () => {
  let { path, fileName } = msg
  rm(`${path}${fileName}.txt`, { force: true })
}

exports.writeFile = writeFile
exports.rmSync = rmSync
