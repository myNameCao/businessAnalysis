let fs = require('fs') // 引入fs模块

const writeFile = name => {
  // 写入文件内容（如果文件不存在会创建一个文件）

  // 传递了追加参数 { 'flag': 'a' }
  let path = process.argv.splice(2)[0] || '暂时文件'

  fs.writeFile(`./${path}.js`, name + '\n', { flag: 'a' }, err => {})
}
exports.writeFile = writeFile
