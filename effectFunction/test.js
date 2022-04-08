let { Effect } = require('./index')
function fZero() {
  console.log('Starting with nothing')
  return 0
}

const double = x => x * 2
const increment = x => x + 1
const cube = x => Math.pow(x, 3)

// 用法一:

// const eight = Effect(fZero).map(increment).map(double).map(cube)
// console.log(eight.runEffects())

const incDoubleCube = x => cube(double(increment(x)))

// 用法二:
const eight = Effect(fZero).map(incDoubleCube).jion()
console.log(eight.runEffects())
let window = {}
window.myAppConf = {
  selectors: {
    'user-bio': '.userbio',
    'article-list': '#articles',
    'user-name': '.userfullname'
  },
  templates: {
    greet: 'Pleased to meet you, {name}',
    notify: 'You have {n} alerts'
  }
}

const win = Effect.of(window)
userBioLocator = win.map(x => x.myAppConf.selectors['user-bio'])
console.log(userBioLocator.runEffects())
