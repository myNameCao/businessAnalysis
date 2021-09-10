const composeAsync = funcs => x =>
  funcs.reduce((acc, val) => acc.then(val), Promise.resolve(x))
exports.composeAsync = composeAsync

// let result;
// for (const f of [func1, func2, func3]) {
//   result = await f(result);
// }
