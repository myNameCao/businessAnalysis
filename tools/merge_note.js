// merge  通知

const axios = require('axios')
const url =
  'https://oapi.dingtalk.com/robot/send?access_token=ccef6c7ba8b462141fa0824a6cbae7f989d9dbedaa460a6dcb41ab6c4f63e09a'

const project = {
  test_new: '考试安排',
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
  answersheet: '答题卡制作'
}

const note = (name, text, emoji) => {
  axios
    .post(url, {
      markdown: {
        title: name + '',
        text: `## [${name}] \n> \n> ## ${emoji} \n> #### 修改内容如下: \n> \n>${text}`
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

note('exam', 'ddd', 'dd')
