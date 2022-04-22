const fs = require('fs')
const readable = fs.createReadStream('./interview3.js')
const writeable = fs.createWriteStream('./copy代理.js')

readable.pipe(writeable)
