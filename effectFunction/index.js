const Effect = f => {
  return {
    map(g) {
      return Effect(x => g(f(x)))
    },

    jion(x) {
      return f(x)
    },
    runEffects(x) {
      return f(x)
    }
  }
}
//  惰性函数
Effect.of = function of(val) {
  return Effect(() => val)
}

exports.Effect = Effect
