interface IPerson {
  age: number
  name: string
}

interface IPeoPle extends IPerson {
  sex: string
}

class User implements IPerson {
  age: number
  name: string
}
interface IRoles extends User {}

class Roles extends User {}

type LinkedList<T> = T & { next: LinkedList<T> }

interface Person {
  name: string
}
type Yikes = Array<Yikes>

interface lengthwise {
  length: number
}

interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>
}
let createArray: CreateArrayFunc
createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray(3, 'x') // ['x', 'x', 'x']

type Alias = { num: number }
interface Interface {
  num: number
}
declare function aliased(arg: Alias): Alias
declare function interfaced(arg: Interface): Interface

aliased({
  num: 1
})

interfaced({
  num: 1
})
