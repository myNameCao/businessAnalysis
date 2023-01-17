// 定义一个 函数

function universalAdd<T extends number | bigint | string>(
  x: T,
  y: T
): literalToPrimitive<T> {
  return x + (y as any)
}
let a = universalAdd('1', '1')

type literalToPrimitive<T> = T extends number
  ? number
  : T extends bigint
  ? bigint
  : T extends string
  ? string
  : never
// 同一基础的字面量联合类型 其可以被认为是此基础类型的子类型  及  999| 1 是number 的子类型

// 更复杂 类型进行比较

type Fun = (...args: any[]) => any

type funtionConditionTpe<T extends Fun> = T extends (...arys: any[]) => string
  ? ' A sring  return  func!'
  : 'A non- string return  func'

type StringResult = funtionConditionTpe<() => string>
// 'A non-string return func!';
type NonStringResult1 = funtionConditionTpe<() => boolean>
// 'A non-string return func!';
type NonStringResult2 = funtionConditionTpe<() => number>

// infer  只能 使用在 判断的语句中

//  支持通过 infer  关键字来 在条件类型 中 提取类型的某一部分信息

// 获得 返回的 类型

type promiseValue<T> = T extends Promise<infer V> ? V : T

// / 类型“V”不满足约束“string | number | symbol”。
type ReverseKeyValue<T extends Record<string, string>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V & string, K>
  : never

// 泛型参数的 来源是从键值类型推导出来的  ts  中 这样对键值类型进行infer推导   将导致类型丢失  而不满足索引签名类型  只允许 是tring|number | symbole  的要求
type Condition<T> = T extends 1 | 2 | 3 ? T : never

// 1 | 2 | 3
type Res1 = Condition<1 | 2 | 3 | 4 | 5>

// 内置工具类型基础

// 工具类型 和 类型变成编程 并不完全等价

// 1、 属性装饰工具类型
// 2、 结构工具类型
// 3、 集合工具类型
// 4、 模式匹配工具类型
// 5、 模板字符串工具类型

// 属性修饰工具类型

// 属性修饰、映射类型 和索引类型

type Partial<T> = {
  [P in keyof T]?: T[P]
}
