const { NodeSSH } = require('node-ssh')

const ssh = new NodeSSH()

let remoteFile = '/usr/share/nginx/html'

let CONF = require('../config.json')

const task = async name => {
  try {
    await ssh
      .connect(CONF)
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
        return ssh.execCommand(
          `mv ${name}.zip ./xy_back/${new Date().toLocaleDateString()}_${name}.zip`,
          {
            cwd: remoteFile
          }
        )
      })
      .catch(err => {
        console.log('上传失败', err)
      })
  } finally {
    ssh.dispose()
  }
}

exports.upload = task
