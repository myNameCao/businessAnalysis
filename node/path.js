const { resolve } = require('path')
let path = require('path')

console.log('当前路径', __filename)
console.log('当前目录', __dirname)
console.log('执行 node 的目录', process.execPath)
console.log('node 运行目录', process.cwd())

console.log('当前目录', path.dirname('a/b/c'))
console.log('扩展名', path.extname('a/b/c.chris.js'))
console.log('路径对象', path.parse(__filename))
let obj = path.parse(__filename)

// 序列化路径
console.log(path.format(obj))
console.log('是不是绝对目录', path.isAbsolute('/a'))

// 拼接路径
console.log(path.join('/a', 'b', 'index.html'))

// 规范化路径
console.log(path.normalize('a/b/c'))

//  返回的绝对目录

console.log(path.resolve('/a/c', '../'))
// resolve(from,to)
console.log(path.resolve('./node', 'path.js'), 1)