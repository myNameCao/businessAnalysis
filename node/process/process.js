// process.js
const { ChildProcess } = require('child_process')
const http = require('http')

http.createServer().listen(3000, () => {
  process.title = '测试进程 Node.js' // 进程进行命名
  console.log(`process.pid: `, process.pid) // process.pid: 20279
})

Child_Process.fork 可以开启多个进程 

// 开启多进程 不是 为了解决 高并发 
// 主要是 解决单进程模式下  node.js  cpu 利用率 不足的 情况




console.log(process.env)
//：环境变量，例如通过 process.env.NODE_ENV 获取不同环境项目配置信息
console.log(process.nextTick)
//：这个在谈及 Event Loop 时经常为会提到
console.log(process.pid)
//：获取当前进程id
console.log(process.ppid)
//：当前进程对应的父进程
console.log(process.cwd())
//：获取当前进程工作目录
console.log(process.platform)
//：获取当前进程运行的操作系统平台
console.log(process.uptime())
//：当前进程已运行时间，例如：pm2 守护进程的 uptime 值