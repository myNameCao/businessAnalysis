let Client = require('ssh2-sftp-client')
let client = new Client()

let localFile = '/Users/caohefei/work'
let remoteFile = '/usr/share/nginx/html/'

exports.upload = async name => {
  try {
    await client.connect({
      host: '124.71.153.152',
      port: '22',
      username: 'root',
      password: 'xyadm01$'
    })
    return await client.fastPut(`./${name}.zip`, remoteFile + name + '.zip')
  } finally {
    client.end()
  }
}
