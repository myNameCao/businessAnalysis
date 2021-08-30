const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
console.log(process.argv[2])
let version = process.argv[2] || ''
execSync(`git tag 'v${version}' && git push origin 'v${version}'  `)

execSync(
  `yarn changelog && git add . && git commit -m 'release(自动化): ${new Date().toDateString()}' && git push`
)
updatePackage(version)
function updatePackage(version) {
  const pkgPath = path.resolve('./', 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}
