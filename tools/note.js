const axios = require('axios')
const url =
  'https://oapi.dingtalk.com/robot/send?access_token=87b87743b7f62e5cd10d5bafc69f3b92329102ce00a39695a1022274a0e62199'
const project = {
  test_new: '考试安排',
  report: '过程与阶段性报告',
  base: '教学数据|设置',
  node: '测试项目',
  exam: '题库|教辅系统',
  mark: '在线阅卷',
  datacenter: '学情分析',
  check: '晓羊策学——公众号',
  center: '后台管理系统',
  unionexam: '区域联考',
  pay: '支付列表',
  answersheet: '答题卡'
}

const note = (name, text, emoji) => {
  axios
    .post(url, {
      markdown: {
        title: name + '发版完成',
        text: `# [${project[name] || name}] \n> ${emoji} \n> \n>
        修改内容如下: \n> 
        \n>${text}`
      },
      headers: { 'Content-Type': 'application/json' },
      msgtype: 'markdown'
    })
    .then(function (res) {
      console.log(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
exports.note = note
