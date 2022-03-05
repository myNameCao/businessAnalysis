type a = [1, 3, 4]
//  数组转集合
type a1 = a[number]

interface Todo {
  title: string
  description: string
}
type b = { a: string; b: string; c: string }
// 对象转集合
type b1 = keyof Todo

type MyReadonly<T> = {
  readonly [key in keyof T]: T[key]
}

// type Arrayish = { [n: number]: unknown }
// type A = keyof Arrayish

type Mapish = { [k: string]: boolean }
type M = keyof Mapish
