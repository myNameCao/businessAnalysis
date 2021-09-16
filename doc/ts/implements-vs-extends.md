# extends 与 implements 的区别

- 在类的声明中，通过关键字 extends 来创建一个类的子类

- 一个类通过关键字 implements 声明自己使用一个或者多个接口

## extneds

- 继承，一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法

## implements

- 实现，一个新的类，从父类或者接口实现所有的属性和方法，同时可以重写属性和方法，包含一些新的功能

```js
interface IPerson {
  age: number;
  name: string;
}

interface IPeoPle extends IPerson {
  sex: string;
}

class User implements IPerson {
  age: number
  name: string
}
interface IRoles extends User {}
class Roles extends User {}

// 错误语法

// 类不能 继承 接口
class a extends IPerson {}

// 接口不能实现 类 和 接口
;`interface  b implements User{
    age:string,
    name:string
}`
```

## 注意点

- 接口不能实现接口或者类,接口可以继承接口或类
- 类可以实现接口或类,类不可以继承接口，类能继承类,
- 可多继承或者多实现
