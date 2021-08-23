const execa = require('execa')
const chalk = require('chalk')
let isDryRun = 0
const step = msg => console.log(chalk.cyan(msg))

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })

const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)

const runIfNotDry = isDryRun ? dryRun : run

step('\nPushing to GitHub...')
let targetVersion = '2.9.1'
runIfNotDry('git', ['tag', `v${targetVersion}`])
const { stdout } = run('git', ['diff'], { stdio: 'pipe' })
