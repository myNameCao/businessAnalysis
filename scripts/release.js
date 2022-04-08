const path = require('path')
const fs = require('fs')

const pkgPath = path.resolve('./', 'package.json')
const { version } = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
const { execSync } = require('child_process')
execSync(
  `yarn changelog && git add . && git commit -m 'release(自动化): ${version}' && git push`
)
execSync(`git tag '${version}' && git push origin --tags `)
