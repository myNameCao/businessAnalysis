let { composeAsync } = require('./index')
let a = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('xhr1')
      resolve('xhr1 失败')
    }, 2000)
  })
}

let b = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('xhr2')
      resolve('xhr2')
    }, 3000)
  })
}
const transformData = composeAsync(a, b)
const result3 = transformData()
  .then(data => console.log(data))
  .catch(err => {
    console.log(err)
  })
