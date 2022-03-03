// as const 断言

// 在数组 中的类型

// let m = 100
// let n = 'abc'
// let array = [m, n]
// let f = array[0]
// f = 2000
// f = 'aaa'

let m = 100
let n = 'abc'
let array = [m, n] as const
let f = array[0]
f = 200 // 只能是number 类型

//  1 通过as const限定后，数组类型变为readonly [number, string]
//  2 准确来说，数组被限定成了一个元组，第一个数据的类型number，第二个是string
//  3  f变量被数组的一个变量赋值后，其类型也就被限定成了一个数值类型。
//  4  as const实现了从string | number到readonly [number, string]转化。

// 对象结构

// function asConst() {
//   let a: string = 'abc'
//   let b = (firstname: string, lastname: string): string => firstname + lastname
//   return [a, b]
// }

// let [p, q] = asConst()
// console.log(q('Green', 'Tom')) // error

// 写法一
// function asConst() {
//   let a: string = 'abc'
//   let b = (firstname: string, lastname: string): string => firstname + lastname
//   return [a, b] as const
// }

// let [p, q] = asConst()
// console.log(q('Green', 'Tom'))

// 写法二
function asConst() {
  let a: string = 'abc'
  let b = (firstname: string, lastname: string): string => firstname + lastname
  return [a, b] as [typeof a, typeof b]
}

let [p, q] = asConst()
console.log(q('Green', 'Tom'))

// as const断言，可以将代码中宽泛的数据类型定义具体话，
// 从而避免我们在开发过程中，因为定义过于宽泛，造成的各种数据处理的错误，
// 通过精准的数据类型定义，更好的管理我们前端代码。
