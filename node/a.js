// a.js
console.log('a模块start')

exports.test = 1

undeclaredVariable = 'a模块未声明变量'

const b = require('./b')

exports.test1 = 1

console.log('a模块加载完毕: b.test值：', b.test)
