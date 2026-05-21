#!/usr/bin/env node
import './lib/msc-load-env.mjs'

import { execSync } from 'node:child_process'
import path from 'node:path'
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs'

const searchTargets = ['.', 'examples/nextjs-minimal', 'examples/nextjs-payload']

console.log('\x1b[36mInitiating multi-workspace package audit across ecosystem targets...\x1b[0m')
for (const target of searchTargets) {
  try {
    console.log(`\n\x1b[33mScanning target directory scope: [${target}]\x1b[0m`)
    execSync('npx npm-check-updates -u', {
      cwd: path.resolve(MSC_PROJECT_ROOT, target),
      stdio: 'inherit',
    })
  }
  catch {
    console.log(`Bypassed target upgrade verification loop for ${target} (Manifest stub initialized/empty).`)
  }
}
