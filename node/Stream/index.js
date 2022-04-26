//  多个文件 合并

const fs = require('fs')

const path = require('path')

function streamMerge(sourceFiles, targetFile) {
  // 当前进程 目录
  const scripts = fs.readdirSync(path.resolve(process.cwd(), sourceFiles)) // 获取源文件目录下的所有文件
  const fileWriteStream = fs.createWriteStream(
    path.resolve(process.cwd(), targetFile)
  ) // 创建一个可写流

  streamMergeRecursive(scripts, fileWriteStream, sourceFiles)
}

function streamMergeRecursive(scripts = [], fileWriteStream, sourceFiles) {
  // 递归到尾部情况判断
  if (!scripts.length) {
    return fileWriteStream.end("console.log('Stream 合并完成')") // 最后关闭可写流，防止内存泄漏
  }
  const currentFile = path.resolve(process.cwd(), sourceFiles, scripts.shift())
  const currentReadStream = fs.createReadStream(currentFile) // 获取当前的可读流

  currentReadStream.pipe(fileWriteStream, { end: false })
  currentReadStream.on('end', () => {
    streamMergeRecursive(scripts, fileWriteStream, sourceFiles)
  })

  currentReadStream.on('error', error => {
    // 监听错误事件，关闭可写流，防止内存泄漏
    console.error(error)
    fileWriteStream.close()
  })
}

// streamMerge('../../scripts', './script.js')
exports.streamMerge = streamMerge
