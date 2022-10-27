let { msg } = require('./msg')

const comT = i => {
  return i.reduce((a, b) => a + b)
}

const band = list => {
  if (!list.length) return false
  let { band } = msg

  let result_list = [list[0]]

  let length = list.length
  let add = null
  for (let i = 1; i < length; i++) {
    let item = list[i]

    let subAdd = item - result_list[result_list.length - 1] > 0

    if (add !== null) {
      if (add === subAdd) {
        result_list[result_list.length - 1] = item
        continue
      }
    }
    if (Math.abs(item - result_list[result_list.length - 1]) > band) {
      result_list.push(item)
      add = subAdd
    }
  }
  console.log(result_list)

  return result_list
}

exports.band = band
