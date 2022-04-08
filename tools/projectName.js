const projectName = {
  viewbase: '登录页面',
  test_new: '考试安排',
  test: '考试安排老版',
  report: '过程与阶段性报告',
  base: '教学数据|公共设置',
  node: '测试项目',
  exam: '题库组卷|教辅系统',
  mark: '在线阅卷',
  datacenter: '学情分析',
  check: '晓羊策学——公众号',
  center: '后台管理系统',
  unionexam: '区域联考',
  pay: '支付列表',
  answersheet: '答题卡'
}

const setVersion = v => {
  v = v + ''
  let list = v.split('.')
  let a = list[0] * 1
  let b = list[1] * 1
  let c = list[2] * 1
  c += 1
  if (c === 100) {
    b += 1
    c = 0
  }
  if (b == 10 && c == 0) {
    a += 1
    b = 0
    c = 0
  }
  return `${a}.${b}.${c}`
}

exports.projectName = projectName
exports.setVersion = setVersion

console.log(1)
