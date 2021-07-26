// 模块的 exports 对象 未完成的副本。（因此是不会陷入死循环的）
// 然后 b.js 完成加载之后将 exports 对象提供给了 a.js 模块
;(function (exports, require, module, __filename, __dirname) {
  // 模块的代码
})
