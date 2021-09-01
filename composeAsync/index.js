const composeAsync = funcs => x =>
  funcs.reduce((acc, val) => acc.then(val), Promise.resolve(x))
exports.composeAsync = composeAsync
