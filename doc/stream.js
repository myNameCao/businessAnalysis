const stream = fs.createReadStream('./tools/pubish.js')

var string = ''
stream.on('data', function (data) {
  string += data.toString()
  console.log('stream data ', 1111)
})
stream.on('end', function () {
  console.log('final output ' + string)
})
