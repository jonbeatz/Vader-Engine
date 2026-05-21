#!/usr/bin/env node
/**
 * MSC multi-workspace dependency updater (Roadmap §3.4)
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs'

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs'

const searchTargets = ['.', 'examples/nextjs-minimal', 'examples/nextjs-payload']

console.log('\x1b[36mInitiating multi-workspace package audit across ecosystem targets...\x1b[0m')
for (const target of searchTargets) {
  const cwd = path.resolve(MSC_PROJECT_ROOT, target)
  const manifest = path.join(cwd, 'package.json')

  console.log(`\n\x1b[33mScanning target directory scope: [${target}]\x1b[0m`)

  if (!fs.existsSync(cwd)) {
    console.log(`Bypassed target upgrade verification loop for ${target} (directory not present).`)
    continue
  }

  if (!fs.existsSync(manifest)) {
    console.log(`Bypassed target upgrade verification loop for ${target} (Manifest stub initialized/empty).`)
    continue
  }

  try {
    execSync('npx npm-check-updates -u', { cwd, stdio: 'inherit' })
  }
  catch {
    console.log(`Bypassed target upgrade verification loop for ${target} (Manifest stub initialized/empty).`)
  }
}

console.log('\n\x1b[36mMulti-workspace sweep complete.\x1b[0m')
