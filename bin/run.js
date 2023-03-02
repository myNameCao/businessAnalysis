#!/usr/bin/env node

const { execSync } = require('child_process')
//TODO: add a check for yarn
execSync('yarn start', { stdio: 'inherit' })
