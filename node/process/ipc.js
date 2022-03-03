// IPC 进程间 通信技术

// IPC 的方式有多种 有管道 消息队列 信号量 domian  socket 、 node 是使用过pipe 来实现的

const spawn = require('child_process').spawn

const child = spawn('node', ['work4.js'])
child.stdout.pipe(process.stdout)
console.log(process.pid, child.pid)
