const { chdir } = require('process')

const { execSync } = require('child_process')

Promise.resolve('test')
  .then(name => chdir(`/Users/caohefei/work/${name}`))
  .then(() => {
    return execSync('git pull origin develop')
  })
  .then(res => {
    console.log(res.toString())
  })
  .then(() => {
    return execSync('git log -1')
  })
  .then(res => {
    console.log(res.toString())
  })
  .catch(err => {
    console.log(err)
  })
