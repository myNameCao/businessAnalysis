const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

const currentVersion = require('../package.json').version

let version = '10.0.0'

execSync(`git tag 'v${version}' && git push origin 'v${version}'  `)

updatePackage(version)

function updatePackage(version) {
  const pkgPath = path.resolve('./', 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}
