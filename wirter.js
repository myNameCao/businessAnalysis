let fs = require('fs') // 引入fs模块

const writeFile = name => {
  // 写入文件内容（如果文件不存在会创建一个文件）
  // 传递了追加参数 { 'flag': 'a' }
  fs.writeFile('./暂时文件.js', name + '\n', { flag: 'a' }, function(err) {
    console.log('写入成功')
  })
}
exports.writeFile = writeFile
