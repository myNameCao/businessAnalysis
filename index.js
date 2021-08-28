// zero :: () -> Number
function fZero() {
  console.log('Starting with nothing')
  // Definitely not launching a nuclear strike here.
  // But this function is still impure.
  return 0
}

// Effect :: Function -> Effect
function Effect(f) {
  return {
    map(g) {
      return Effect(x => g(f(x)))
    },
    runEffects(x) {
      return f(x)
    }
  }
}

const zero = Effect(fZero)

const increment = x => x + 1 // Just a regular function.

const double = x => x * 2

const one = zero.map(increment).map(double)

let a = one.runEffects()

console.log(a)
