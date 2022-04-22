const fs = require('fs')
const readable = fs.createReadStream('./ipc.js')
const writeable = fs.createWriteStream('./copy代理.js')

// readable.pipe(writeable)
readable.pipe(writeable, {
  end: false
})
readable.on('end', function () {
  writeable.end('结束')
})
