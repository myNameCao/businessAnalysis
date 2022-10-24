var iconv = require('iconv-lite')

let buffer = iconv.encode('绋€缂鸿祫婧�', 'gbk')
str = iconv.decode(Buffer.from(buffer), 'utf8')

console.log(str)
