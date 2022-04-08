// .d.ts 文件中的顶级申明 必须 以 declare 或 export 修饰符开头

//  declare  申明一个类型 定义全局的类型
declare type Asd = {
  name: string
}

// 在include包含的文件范围内可以直接使用Asd这个type

// 2 declare 申明一个模块

declare module '*.css'
declare module '*.png'
declare module '*.png'

// 在编辑ts文件的时候，如果你想导入一个.css/.less/.png格式的文件，
// 如果没有经过declare的话是会提示语法错误的

// declare声明一个作用域

declare namespace API {
  interface ResponseList {}
}

// 声明完之后在其他地方的ts就可以直接API.ResponseList引用到这个接口类型
