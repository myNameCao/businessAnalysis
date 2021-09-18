const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const conventionalChangelog = require('conventional-changelog')

const { chdir } = require('process')

const project = {
  test_new: '考试安排',
  report: '过程与阶段性报告',
  base: '教学数据',
  node: '测试项目',
  exam: '题库组卷及教辅系统',
  mark: '在线阅卷',
  datacenter: '学情分析',
  check: '晓羊策学——公众号',
  center: '后台管理系统',
  unionexam: '区域联考',
  pay: '支付列表',
  answersheet: '答题卡'
}

const note = async name => {
  // 版本修改到最新的一个tag
  chdir(`/Users/caohefei/work/${name}`)
  let stream = conventionalChangelog({
    preset: 'angular'
  })
  const chunks = []
  for await (let chunk of stream) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)
  const text = buffer.toString('utf-8')
  try {
    axios
      .post(
        'https://oapi.dingtalk.com/robot/send?access_token=87b87743b7f62e5cd10d5bafc69f3b92329102ce00a39695a1022274a0e62199',
        {
          markdown: {
            title: name + '  发版完成',
            text: `# [ ${project[name] || name} ] 发版成功 \n>  \n>${text}  `
          },
          headers: { 'Content-Type': 'application/json' },
          msgtype: 'markdown'
        }
      )
      .then(function (res) {
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  } catch (err) {
    console.error(err)
  }
}
exports.note = note
