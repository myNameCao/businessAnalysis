import { red } from "chalk"

//   1   断言
interface Foo {
  bar: number
  bas: string
}

// 有提示 接口
const foo: Foo = {
  // 编译器将会提供 Foo 属性的代码提示
}
// 没提示  断言是没有提示的
const abc = <Foo>{}

// 断言是没有提示的

const a = { bas: '2' } as Foo

//   2    Freshness

function logName(something: { name: string }) {
  console.log(something.name)
}

const person = { name: 'matt', job: 'being awesome' }
const animal = { name: 'cow', diet: 'vegan, but has milk of own specie' }
const randow = { note: `I don't have a name property` }

logName(person) // ok
logName(animal) // ok
logName(randow) // Error: 没有 `name` 属性

// 误导你认为 某些东西接收的数据比实际的要多
logName({ name: 'matt' }) // ok
logName({ name: 'matt', job: 'being awesome' })

let x: { foo: number; [x: string]: any }

x = { foo: 1, baz: 2 } // ok, 'baz' 属性匹配于索引签名

//  3   类型保护

class Foo {
  foo = 123
}

class Bar {
  bar = 123
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo) // ok
    console.log(arg.bar) // Error
  } else {
    // 这个块中，一定是 'Bar'
    console.log(arg.foo) // Error
    console.log(arg.bar) // ok
  }
}

doStuff(new Foo())
doStuff(new Bar())

//  字面量类型保护
type a = {
  kind: 'foo' // 字面量类型
  foo: number
}

type b = {
  kind: 'bar' // 字面量类型
  bar: number
}

function difss(arg: a | b) {
  if (arg.kind === 'foo') {
    console.log(arg.foo) // ok
    console.log(arg.bar) // Error
  } else {
    // 一定是 Bar
    console.log(arg.foo) // Error
    console.log(arg.bar) // ok
  }
}

//  4 字面量类型

function iTakeFoo(foo: 'foo') {}

const test = {
  someProp: 'foo' as 'foo'
}

iTakeFoo(test.someProp) // ok

type Test = {
  someProp: 'foo'
}

const test1: Test = {
  // 推断 `someProp` 永远是 'foo'
  someProp: 'foo'
}

iTakeFoo(test1.someProp) // ok

//   5  readonly

// readonly  vs const

// 1. const 用于变量
// 2. 变量不能重复赋值 给其他任何事物

// readonly  用于属性  用于别名 可以修改属性

const foot1: {
  readonly bar: number
} = {
  bar: 123
}

// 没有提示
function iMutateFoo(foo: { bar: number }) {
  foo.bar = 456
}

iMutateFoo(foot1)
console.log(foot1.bar) // 456

interface Foo2 {
  readonly bar: number
}

let foo3: Foo2 = {
  bar: 123
}

// 有提示
function iTakeFoo2(foo: Foo2) {
  foo.bar = 456 // Error: bar 属性只读
}

iTakeFoo2(foo3)

// ##   6 泛型

// 设计

class QueueNumber {
  private data = []
  push = (item: number) => this.data.push(item)
  pop = (): number => this.data.shift()
}

const queue = new QueueNumber()

queue.push(0)
queue.push('1') // Error: 不能推入

//  ##  7 类型推断

function add(a: number, b: number) {
  return a + b
}

type Adder = (a: number, b: number) => number
let aaa: Adder = (a, b) => a + b

const t7 = {
  a: 123,
  b: 456
}

t7.a = 2

//


 declare namespace UUU{
  let a:number 
}


// ts 3.6 增加了新的功能  function 申明和class 申明可以合并了 新的写法






// 辨析联合类型
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

// 有人仅仅是添加了 `Circle` 类型
// 我们可能希望 TypeScript 能在任何被需要的地方抛出错误
interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.width * s.height;
    case 'circle':
      return Math.PI * s.radius ** 2;
    default:
      const _exhaustiveCheck: never = s;
      return _exhaustiveCheck;
  }
}



// typescript 索引签名  



const obj = {
  toString() {
    return 'Hello';
  }
};

const sign: any = {};

sign[obj.toString()]= 'word'


 // 申明一个索引签名  

 const sign1:{
   [index:string]: {message:string }
 }= {}



 sign1['a']={message: 's'}

 sign1['B'] = {message: 's', messages: 'some message' };

 interface Sign {
   [key:string]:number 
   x:number,
   y:number
 }


 // 
 interface Sign2 {
   [key:string]:number,
   x:number,
   y:string  // Error  y 的属性 必须为number 

 }



 interface  Sign3 {
   [key: string ]:number,
   x:number
 }
 let sign3 :Sign3={
     x:1,
     y:2
 }


 sign3['x']

 const abx = "xs"
 sign3[abx]

 // 使用 一组有限的字符串字面量

 
 type Index ='A'|'b'|'c'
 type  FromIndex = {[k in Index]?: number}

 const  good:FromIndex ={b:1,c:2}

 const bad:FromIndex= {a:1,b:2,c:3}

 //配合 keyof/typeof 来获取变量的类型 来实现 延迟推断

 type FromSomeIndex< K extends string>= {[key in K]:number}

 interface NestedCSS {
  color?: string; // strictNullChecks=false 时索引签名可为 undefined
  [selector: string]: string | NestedCSS;
}




// 设计模式  索引签名的嵌套

const example: NestedCSS = {
  color: 'red',
  '.subclass': {
    color: 'blue'
  }
};
const failsSilently: NestedCSS={
  colour:'red'
}



interface  NestedCss {
  color?:string;
  nest?:{
    [selector:string]:NestedCss
  }
}
const example1:NestedCss ={
  color:"red",
  nest:{
    '.sun':{
      color:"bule"
    }
  }
}


const failsSilently1: NestedCss ={
  colour:'red'
}


type FieldState= {
  value:string
  
}


type  formstate={
  isValid:boolean;
  [fileName:string]:FieldState
}

type FieldState1= {
 isValid 
}&{[fielsName:string]:FieldState}

declare const foo333: formstate

const isValidBool = foo333.isValid

const somethingFieldState = foo333['something']
const br33: FieldState1 ={
  isValid:false,
}



// 流动的类型


const foo23 = 'Hello World';

// 使用一个捕获的类型
let bar: typeof foo23;

// bar 仅能被赋值 'Hello World'
bar = 'Hello World'; // ok
bar = 'anything else'; // Error