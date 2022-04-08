let num = 0
let addtotal = 0
let marry = 0
let nian = 2021
let yue = 4

function a(total, x) {
  if (total <= 0) return
  num++
  yue++
  if (yue == 13) {
    nian++
    yue = 1
  }
  let add = (total * 0.0539) / 12
  addtotal += add
  marry += (x - add).toFixed(2) * 1
  console.log(
    '期数:' + num,
    '日期：' + nian + '年' + yue + '月',
    '本金：' + (x - add).toFixed(2),
    '利息：' + add.toFixed(2),
    '利息累计：' + addtotal.toFixed(2),

    '本金累加：' + marry.toFixed(2),
    '本金剩余：' + (total - (x - add)).toFixed(2)
  )
  a(total - (x - add), x)
}
a(306880.08, 2268.57)
