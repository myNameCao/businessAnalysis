const applyAsync = (acc, val) => acc.then(val)
const composeAsync =
  (...funcs) =>
  x =>
    funcs.reduce(applyAsync, Promise.resolve(x))

const transformData = composeAsync(func1, func2, func3)
const result3 = transformData(data)

// 在 ECMAScript 2017 标准中, 时序组合可以通过使用 async/await 而变得更简单：

// note  注意不能使用 forEach 函数

let result
for (const f of [func1, func2, func3]) {
  result = await f(result)
}
