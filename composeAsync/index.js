const composeAsync = funcs => x =>
  funcs.reduce((acc, val) => acc.then(val), Promise.resolve(x))
exports.composeAsync = composeAsync

// let result;

// note   不能用 forEach  map
// for (const f of [func1, func2, func3]) {
//   result = await f(result);
// }
