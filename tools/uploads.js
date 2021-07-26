const { NodeSSH } = require('node-ssh')

const ssh = new NodeSSH()

let remoteFile = '/usr/share/nginx/html'

const task = async name => {
  try {
    await ssh
      .connect({
        host: '124.71.153.152',
        port: 22,
        username: 'root',
        password: 'xyadm01$'
      })
      .then(() => {
        return ssh.putFile(`./${name}.zip`, `${remoteFile}/${name}.zip`)
      })
      .then(() => {
        return ssh.execCommand(`rm -rf ${name}`, {
          cwd: remoteFile
        })
      })
      .then(() => {
        return ssh.execCommand(`unzip  ${name}.zip`, {
          cwd: remoteFile
        })
      })
      .then(() => {
        return ssh.execCommand(`rm -rf ${name}.zip`, {
          cwd: remoteFile
        })
      })
      .catch(err => {
        console.log('上传失败', err)
      })
  } finally {
    ssh.dispose()
  }
}

exports.upload = task
