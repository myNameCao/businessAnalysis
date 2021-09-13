# 泛型

泛型 是指在定义函数、 接口或类的时候，不预先指定具体的类型，而在使用的时候再制定类型的一种特性

```ts
function creatArray<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
creatArray<string>(3, 'x')

// 也可以不手动指定 ， 而让类型推断自动推算出来：
creatArray(3, 'X') //['X','X','X']
```

### 同样类型数组也可以被类型推断

```ts
function log<T>(value: T): T {
  console.log(value)
  return value
}
```

### 类型约束

- 我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就叫泛型约束

```ts
interface lengthwise {
  length: number
}
function loggingIdentity<T extends lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

### 多个类型之间也可以相互的约束

```ts
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id]
  }
  return target
}

let x = { a: 1, b: 2, c: 3, d: 4 }

copyFields(x, { b: 10, d: 20 }) // { a: 1, b: 10, c: 3, d: 20 }
//  上述例子中，我们使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。
```

## 泛型接口

```ts
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySeach: SearchFunc
mySeach = function (source: string, subString: string) {
  return source.search(subString) !== -1
}
```

同样也可以使用含有泛型的接口 来定义函数的形状

```ts
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
```

进一步，我们可以把泛型参数提前到接口名上

```ts
interface CreatArrayFunc<T>{
    <T>(length:number:value:T):Array<T>
}

let createArray:CreateArrayFunc<any>
createArray = function<T>(length:number,value:T)Array<T>{
    let result:T[]=[]
    for(let i = 0;i<length;i++){
        res

    }
}
```
