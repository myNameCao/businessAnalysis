const fork = require('child_process').fork

const cpus = require('os').cpus()
const server = require('net').createServer()

server.listen(3000)
process.title = 'node-master'

const works = {}

const createWorker = () => {
  const work = fork('work.js')
  work.on('message', function (message) {
    if (message.act === 'suicide') {
      createWorker()
    }
  })
  work.on('exit', function (code, signal) {
    console.log('worker process exited, code: %s signal: %s', code, signal)
    delete works[work.pid]
  })
  work.send('server', server)
  works[work.pid] = work
  console.log('worker process created, pid: %s ppid: %s', work.pid, process.pid)
}
for (let i = cpus.length; i > 0; i--) {
  createWorker()
}

process.once('SIGINT', close.bind(this, 'SIGINT')) // kill(2) Ctrl-C
process.once('SIGQUIT', close.bind(this, 'SIGQUIT')) // kill(3) Ctrl-\
process.once('SIGTERM', close.bind(this, 'SIGTERM')) // kill(15) default
process.once('exit', close.bind(this))

function close(code) {
  console.log('进程退出！', code)

  if (code !== 0) {
    for (let pid in workers) {
      console.log('master process exited, kill worker pid: ', pid)
      workers[pid].kill('SIGINT')
    }
  }

  process.exit(0)
}

process.once('SIGINT', close.bind(this, 'SIGINT')) // kill(2) Ctrl-C
process.once('SIGQUIT', close.bind(this, 'SIGQUIT')) // kill(3) Ctrl-\
process.once('SIGTERM', close.bind(this, 'SIGTERM')) // kill(15) default
process.once('exit', close.bind(this))

function close(code) {
  console.log('进程退出！', code)

  if (code !== 0) {
    for (let pid in workers) {
      console.log('master process exited, kill worker pid: ', pid)
      workers[pid].kill('SIGINT')
    }
  }

  process.exit(0)
}
