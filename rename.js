const fs = require('fs')
const path = require('path')
const currentPath = path.join(process.cwd(), 'test')
fs.readdir(currentPath, (err, files) => {
  files.forEach(file => {
    fs.rename(
      path.join(currentPath, file),
      path.join(currentPath, 'chris' + file),
      err => {
        console.log(err)
      }
    )
  })
})
