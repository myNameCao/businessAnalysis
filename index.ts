type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer Args
) => unknown
  ? Args
  : never

type MyReturnType<T> = T extends (...args: any) => infer R ? R : never

declare function fn(arg: { age: number; name: string }): void

type a = MyParameters<typeof fn>
type b = MyReturnType<typeof fn>

type Unshift<T extends any[], U> = [U, ...T]

type MyReadonly2<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

// type MyReadonly2<T, U extends keyof T = keyof T> = {
//   readonly [K in U]: T[K]
// } & Exclude<T, U>
interface Todo {
  title: string
  description: string
  completed: boolean
}

// type Combine<T> = { [k in keyof T]: T[k] }
// type MyReadonly2<T, K extends keyof T = keyof T> = Combine<
//   T & { readonly [S in K]: T[S] }
// >

type adfdfgd = MyReadonly2<Todo, 'title'>

const todo: adfdfgd = {
  title: 'Hey',
  description: 'foobar',
  completed: false
}

todo.title = 'Hello' // Error: cannot reassign a readonly property
todo.description = 'barFoo' // Error: cannot reassign a readonly property
todo.completed = true // OK

type Arr = ['1', '2', '3']

type TupleToUnion<T extends any[]> = Arr[number]

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'

type DeepReadonly<T> = keyof T extends never
  ? T
  : { readonly [k in keyof T]: DeepReadonly<T[k]> }
type X = [1]
type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}
type ddd = DeepReadonly<X>

//  函数的默认参数

function f1(a: { [prop: string]: any } = {}) {
  console.log(a)
  return a
}

function f2<T extends { [prop: string]: any }>(a: T = {} as T) {
  console.log(a)
}
type PartialPointX = { x: number }

interface Point extends PartialPointX {
  y: number
}

//可串联构造函数

type Chainable<Props = {}> = {
  option<K extends string, T>(
    key: K,
    value: T
  ): Chainable<Props & { [key in K]: T }>
  get(): Props
}

declare const config: Chainable

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

type lastItem<T extends unknown[]> = T extends [...unknown[], infer I]
  ? I
  : never

type arrs = [1, 2, 3]
type asdfsf = lastItem<arrs>

declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>

const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

// expected to be `Promise<[number, number, string]>`
const p = Promise.all([promise1, promise2, promise3] as const)

// lookUp

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}
type LookUp<U, T> = U extends { type: T } ? U : never

type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`

//TrimLeft

type Space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer R}`
  ? TrimLeft<R>
  : S
type trimed = TrimLeft<'  Hello World  '>

// trim

type trim<S extends string> = S extends
  | `${Space}${infer R}`
  | `${infer R}${Space}`
  ? trim<R>
  : S

type trimall = trim<'  Hello    World     '>

// Capitalize
// type Capitalize<S extends string> = S extends `${infer K}${infer tail}`
//   ? `${Uppercase<K>}${tail}`
//   : S
type test1 = Capitalize<'eeer'>

type Poidnt = { c: 1; y: 1 }
type P = keyof Poidnt

let aaa: P = 'c'

type Predicate = (x: unknown) => { x: 1 }
type K = ReturnType<Predicate>

let a = { a: 1 }

type Ks = typeof a

type ToArray<Type> = Type extends any ? Type[] : never

type StrArrOrNumArr = ToArray<string | number>

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never

// // 'StrArrOrNumArr' is no longer a union.
type StrArrOrNumArr1 = ToArrayNonDist<string | number>

// // type StrArrOrNumArr = (string | number)[]

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property]
}

interface Person {
  name: string
  age: number
  location: string
}

type LazyPerson = Getters<Person>

// type LazyPerson = {
//   getName: () => string
//   getAge: () => number
//   getLocation: () => string
// }

type EventConfig<Events extends { kind: string }> = {
  Events['kind']: (event: E) => void
}

type SquareEvent = { kind: 'square'; x: number; y: number }
type CircleEvent = { kind: 'circle'; radius: number }

type Config = EventConfig<SquareEvent | CircleEvent>


const passedObject = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
};


const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});
 
// makeWatchedObject has added `on` to the anonymous Object
 
person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});

type PropEventSource<Type> = {
  on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

/// Create a "watched object" with an 'on' method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;


