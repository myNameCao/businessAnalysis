function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}
//  keyof T  索引类型查询操作符

// keyof T的结果为 T上已知的公共属性名的联合

for (let a = 0; a < 10; a++) {
  console.log(a)
}
