type First<T extends any[]> = T extends [] ? never : T[0]
// 你的答案
type Length<T extends readonly any[]> = T extends [] ? 0 : T['length']

type MyAwaited<T extends Promise<any>> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? MyAwaited<U>
    : U
  : never

type Concat<T extends any[], U extends any[]> = [...T, ...U]

// type Result = Concat<[1], [2]> // expected to be [1, 2]

// type Includes<T extends readonly any[], U> = U extends T[number] ? true : false

type IsEqual<T, U> = (<Intern>() => Intern extends T ? true : false) extends <
  Intern
>() => Intern extends U ? true : false
  ? true
  : false

type Includes<T extends any[], U> = {
  [K in T[number]]: true
}[U] extends true
  ? true
  : false
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Santana'>

type Push<T extends any[], U> = [...T, U]
type Result = Push<[1, 2], '3'> // [1, 2, '3']
