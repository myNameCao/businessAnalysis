const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

let version = process.argv[2] || ''

updatePackage(version)

console.log(version)

execSync(`git tag 'eeeeeee' `)

execSync(
  `yarn changelog && git add . && git commit -m 'release(自动化): ${new Date().toDateString()}' && git push`
)

function updatePackage(version) {
  const pkgPath = path.resolve('./', 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}
