const fork = require('child_process').fork

const cpus = require('os').cpus()

for (let i = 0; i < cpus.length; i++) {
  const worker = fork('work3.js')
  console.log(
    'worker process created, pid: %s ppid: %s',
    worker.pid,
    process.pid
  )
}
