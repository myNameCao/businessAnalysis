let { msg } = require('./msg')

let { writeFile } = require('./wirter')

const comT = i => {
  return i.reduce((a, b) => a + b)
}

const band = (list, name) => {
  if (!list.length) return false
  let { band, diff } = msg

  let result_list = [list[0]]

  let length = list.length
  let lastItem = list[length - 1]
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
    if (
      Math.abs(item - result_list[result_list.length - 1]) >
      band * lastItem
    ) {
      result_list.push(item)
      add = subAdd
    }
  }
  if (result_list.length > msg.bandNumber) {
    let [a, b] = result_list.slice(-2)
    console.log(result_list)
    let isDown = a - b > 0
    let diffnum = (Math.abs(lastItem - b) / b).toFixed(4) * 1
    if (diffnum <= diff) {
      let str = `波动分布： ${name}  [ ${result_list.join(' | ')} ]`
      let srtba = isDown ? ' 波低 ' : ' 波顶 '
      console.log(srtba, result_list, diffnum)
      writeFile(diffnum + '  ' + str)
      return true
    }
  }
  return false
}

exports.band = band

// band([1, 4, 6, 7, 9, 3, 6, 10, 8, 8, 7, 6, 4, 2, 1, 20, 19.9])
