//  多个文件 合并

const fs = require('fs')

const path = require('path')

function streamMerge(sourceFiles, targetFile) {
  const scripts = fs.readdirSync(path.resolve(__dirname, sourceFiles)) // 获取源文件目录下的所有文件
  const fileWriteStream = fs.createWriteStream(
    path.resolve(__dirname, targetFile)
  ) // 创建一个可写流

  streamMergeRecursive(scripts, fileWriteStream, sourceFiles)
}

function streamMergeRecursive(scripts = [], fileWriteStream, sourceFiles) {
  console.log(scripts)
  // 递归到尾部情况判断
  if (!scripts.length) {
    return fileWriteStream.end("console.log('Stream 合并完成')") // 最后关闭可写流，防止内存泄漏
  }

  const currentFile = path.resolve(__dirname, sourceFiles, scripts.shift())
  const currentReadStream = fs.createReadStream(currentFile) // 获取当前的可读流

  currentReadStream.pipe(fileWriteStream, { end: false })
  currentReadStream.on('end', function () {
    streamMergeRecursive(scripts, fileWriteStream)
  })

  currentReadStream.on('error', function (error) {
    // 监听错误事件，关闭可写流，防止内存泄漏
    console.error(error)
    fileWriteStream.close()
  })
}

// streamMerge('../../scripts', './script.js')
exports.streamMerge = streamMerge
