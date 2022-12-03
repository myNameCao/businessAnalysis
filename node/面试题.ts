// 1. 剖析Vue原理&实现双向绑定MVVM

import { ChildProcess } from 'child_process'
import { stdin } from 'process'

type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer U}${From}${infer V}`
  ? From extends ''
    ? `${U}${From}${V}`
    : `${U}${To}${V}`
  : S

type replaced = Replace<'types are fun', 'fun', 'awesome'>

type CamelCase<S> = S extends `${infer S1}-${infer S2}`
  ? S2 extends Capitalize<S2>
    ? `${S1}-${CamelCase<S2>}`
    : `${S1}${CamelCase<Capitalize<S2>>}`
  : S

// 2. 组件通讯

// 3. css 布局三栏布局  清楚浮动

// 4. tcp  三次握手 四次挥手

// 5. mvc mvvm

// 6 闭包原 型和原型链

// 7 虚拟dom 和真实dom的区别

// 8 key

// 9 typeof null nan 是判断数组

// 10 this 指向

// 11 单线程  异步方案 和实现原理

// 12 async 和 await的原理

// 13  web sock

