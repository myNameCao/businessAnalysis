let num = 0

let nian = 2021
let yue = 4

function a(total, x) {
  console.log()
  if (total <= 0) return
  num++
  yue++
  if (yue == 13) {
    nian++
    yue = 1
  }
  let add = (total * 0.0539) / 12
  console.log(
    '期数:' + num,
    '日期：' + nian + '年' + yue + '月',
    '本金：' + (x - add).toFixed(2),
    '利息：' + add.toFixed(2),
    '剩余：' + (total - (x - add)).toFixed(2)
  )
  a(total - (x - add), x)
}
a(306880.08, 2268.57)
