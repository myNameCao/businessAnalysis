const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

myEmitter.on('event', () => {
  console.log('触发')
})
myEmitter.emit('event')

myEmitter.on('error', err => {
  console.error(err)
})

myEmitter.emit('error', 1)
