const { NodeSSH } = require('node-ssh')

const ssh = new NodeSSH()

let remoteFile = '/usr/share/nginx/html/'

exports.upload = async name => {
  try {
    ssh
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
      .then(res => {
        console.log('上传成功')
      })
  } finally {
    ssh.dispose()
  }
}
