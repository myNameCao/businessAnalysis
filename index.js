const ora = require('ora')
const spinner = ora().start()

setTimeout(() => {
  spinner.succeed(`  上传完成`)
  spinner.start('wwww')
  setTimeout(() => {
    spinner.succeed(`  上传完成111`)
  }, 3000)
}, 3000)
