const spawn = require('child_process').spawn

function starDaemon() {
  const daemon = spawn('node', ['daemon.js'], {
    cwd: '/Users/caohefei/work/node/node/process',
    detached: true,
    stdio: 'ignore'
  })
  console.log(
    '守护进程开启 父进程 pid: %s, 守护进程 pid: %s',
    process.pid,
    daemon.pid
  )
  daemon.unref()
}

starDaemon()
