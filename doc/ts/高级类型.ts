// 自定义高级类型

/**
 * 核心实现
 */

// 一 获取没有同时存在于T和U内的类型

type SymmetricDifference<T, U> = Exclude<T | U, T & U>

type Eg1 = SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>

// 二 获取T中所有类型为函数的key组成的联合类型
type NonUndefined<T> = T extends undefined ? never : T

type FunctionKeys<T extends object> = {
  [K in keyof T]: NonUndefined<T[K]> extends Function ? K : never
}[keyof T]

type AType = {
  key1: string
  key2: () => void
  key3: Function
}
type Eg = FunctionKeys<AType>

type Primitive = string | number | bigint | boolean | symbol | null | undefined

type KeysFactory<
  T,
  P extends Primitive | Function | object,
  IsCheckNon extends boolean
> = {
  [K in keyof T]: IsCheckNon extends true
    ? NonUndefined<T[K]> extends P
      ? K
      : never
    : T[K] extends P
    ? K
    : never
}[keyof T]

type FunctionKeys1<T> = KeysFactory<T, Function, true>
type StringKeys<T> = KeysFactory<T, string, true>
type NumberKeys<T> = KeysFactory<T, number, true>

// 三  MutableKeys 查找T所有可选类型的key组成的联合类型。

type MutableKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >
}[keyof T]

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B

type oa = {
  name: string
  age: number
  clore: string
}

type Eg2 = MutableKeys<oa>

// A = <T>() => T extends string ? 1 : 2;
type A = <T>() => T extends string ? 1 : 2
// B = <T>() => T extends number ? 1 : 2;
type B = <T>() => T extends number ? 1 : 2

// C = 2
type C = A extends B ? 1 : 2
