const path = require('path')
const fs = require('fs')
const currentVersion = require('../package.json').version
console.log(currentVersion)
function updatePackage(version) {
  const pkgPath = path.resolve('./', 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

updatePackage('8.0.0')
