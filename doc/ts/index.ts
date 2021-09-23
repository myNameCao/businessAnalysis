type A1 = 'x' extends 'x' ? 1 : 2
type A2 = 'x' | 'y' extends 'x' ? 1 : 2

type P<T> = T extends 'x' ? 1 : 2
type A3 = P<'x' | 'y'>

type A4 = 'x' & 'y' extends 'x' ? 1 : 2

type PartialOptional<T, K extends keyof T> = {
  [P in K]?: T[P]
}

type Eg1 = PartialOptional<
  {
    key1: string
    key2: number
    key3: ''
  },
  'key1' | 'key2'
>

type a = Exclude<keyof { a: 'e'; b: 'a' }, 'a'>

type b = keyof any

interface ErrorConstructor {
  new (message?: string): Error
  (message?: string): Error
  readonly prototype: Error
}
type Eg = ConstructorParameters<ErrorConstructor>

/**
 * @example
 * type Eg2 = [name: string, sex?: number];
 */
type Eg2 = ConstructorParameters<typeof People>

class MyClass {}

abstract class myAbstractClass {}

const c1: typeof MyClass = MyClass
const c2: typeof MyClass = myAbstractClass

const c3: typeof myAbstractClass = MyClass

const c4: typeof myAbstractClass = myAbstractClass

class People {
  name: string
  age: number
  constructor() {}
}

const p1: People = new People()
const p2: People = {
  name: '',
  age: 1
}
const p3: typeof People = new People()
const p4: typeof People = People

// 当把类直接作为类型时，改类型约束的是该类型必须是类的实例； 即该类型获取的是该类上的实例属性和实例方法

// 当把 typeof 类 作为类型时，约束的满足该类的类型；即该类型获取的是该类上的静态属性和方法

type TTuple = [string, number]
type Res = TTuple[number] // string | number
