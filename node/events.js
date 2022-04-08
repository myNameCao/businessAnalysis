const { EventEmitter } = require('stream')

const emitter = new EventEmitter()
console.log(emitter)

emitter.on('起床', function (time) {
  console.log('我起床了' + time)
})

emitter.emit('起床', '6:00')

// 其他模块的继承
function OneDayPlan() {
  EventEmitter.call(this)
}

Object.setPrototypeOf(OneDayPlan, EventEmitter)
Object.setPrototypeOf(OneDayPlan.prototype, EventEmitter.prototype)

const oneDayPlan = new OneDayPlan()

oneDayPlan.on('6:00', function (time) {
  console.log('我起床了' + time)
})

oneDayPlan.emit('6:00', '6:6eee0')

// node  事件是同步 还是异步
// EventEmitter 会按照监听器注册的顺序同步地调用所有监听器。 所以必须确保事件的排序正确，且避免竞态条件
const events = require('events')
const emitter = new events.EventEmitter()

emitter.on('test', function () {
  console.log(111)
})
emitter.emit('test')
console.log(222)

// 错误的处理
