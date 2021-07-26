// module.exports 与 exports 的区别？

// const exports = modules.exports

// export: 使用 export 方式导出的，导入时要加上 {} 需预先知道要加载的变量名，在一个文件中可以使用多次。
// export default: 为模块指定默认输出，这样加载时就不需要知道所加载的模块变量名，一个文件中仅可使用一次。

// caculator.js
export function add(a, b) {
  return a + b
}

export function subtract(a, b) {
  return a - b
}

const caculator = {
  add,
  subtract
}

export default caculator

// import 导入
// import 语句用于导入另一个模块导出的绑定，三种导入方式：

// 导入默认值：导入在 export default 定义的默认接口。
// as 别名导入：在导入时可以重命名在 export 中定义的接口。
// 单个或多个导入：根据需要导入 export 定一个的一个或多个接口。
// import { add } from './caculator.js';
// import caculator from './caculator.js';
// import * as caculatorAs from './caculator.js';

add(4, 2)
caculator.subtract(4, 2)
caculatorAs.subtract(4, 2)
