#!/usr/bin/env node
/**
 * MSC quickstart — install deps, bootstrap .env.local, sanity checks
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs'

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs'

const BANNER = '[msc:quickstart]'

function log(msg) {
  console.log(`${BANNER} ${msg}`)
}

function copyEnvTemplate() {
  const localPath = path.join(MSC_PROJECT_ROOT, '.env.local')
  const examplePath = path.join(MSC_PROJECT_ROOT, '.env.example')
  if (fs.existsSync(localPath)) {
    log('.env.local already exists — skipping copy')
    return
  }
  if (!fs.existsSync(examplePath)) {
    log('warning: .env.example not found')
    return
  }
  fs.copyFileSync(examplePath, localPath)
  log('created .env.local from .env.example — assign live values locally')
}

function runInstall() {
  log('installing root dependencies...')
  execSync('npm install', {
    cwd: MSC_PROJECT_ROOT,
    stdio: 'inherit',
    shell: true,
  })
}

function installExampleWorkspace(relDir) {
  const exampleDir = path.join(MSC_PROJECT_ROOT, relDir)
  if (!fs.existsSync(path.join(exampleDir, 'package.json'))) {
    return
  }
  log(`installing ${relDir} dependencies...`)
  execSync('npm install', {
    cwd: exampleDir,
    stdio: 'inherit',
    shell: true,
  })
}

console.log(`${BANNER} starting boilerplate quickstart`)
copyEnvTemplate()
runInstall()
installExampleWorkspace('examples/nextjs-minimal')
installExampleWorkspace('examples/nextjs-payload')

log('running environment validation...')
execSync('node scripts/validate-env.mjs', {
  cwd: MSC_PROJECT_ROOT,
  stdio: 'inherit',
  shell: true,
})

console.log('\n========================================')
console.log('  ✅ MSC BOOTSTRAP QUICKSTART COMPLETE')
console.log('  Dev:  npm run msc:dev:example  (port 3000)')
console.log('========================================\n')
