# 接口 vs 类型别名

- 如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。

```ts
type Alias = { num: number }

interface Interface {
  num: number
}
declare function aliased(arg: Alias): Alias
declare function interfaced(arg: Interface): Interface
```

```ts
// 接口继承别名
type PartialPointX = { x: number }
interface Point extends PartialPointX {
  y: number
}

class a implements PartialPointX {
  x: 1
}
```
