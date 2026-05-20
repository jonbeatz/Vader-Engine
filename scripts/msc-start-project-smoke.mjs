#!/usr/bin/env node
/**
 * Pluggable start-project health checks (template-safe).
 * Always: structural MCP verify. Optional: MSC_SMOKE_RUN_TYPECHECK=1, MSC_SMOKE_RUN_MIGRATIONS=path
 */
import './lib/msc-load-env.mjs'
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs'

import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const BANNER = '[msc:start-project-smoke]'
const scriptsDir = path.dirname(fileURLToPath(import.meta.url))
let failed = false

function run(label, cmd, args, opts = {}) {
  console.log(`${BANNER} ${label}`)
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: false, ...opts })
  if (r.status !== 0) failed = true
}

run('verify:mcp structure', process.execPath, [path.join(scriptsDir, 'msc-verify-mcp.mjs')])

const root = process.env.MSC_PROJECT_ROOT?.trim() || MSC_PROJECT_ROOT
if (process.env.MSC_SMOKE_RUN_TYPECHECK === '1' && fs.existsSync(path.join(root, 'tsconfig.json'))) {
  run('typecheck', 'npx', ['tsc', '--noEmit'], { cwd: root, shell: true })
}

const mig = process.env.MSC_SMOKE_RUN_MIGRATIONS?.trim()
if (mig && fs.existsSync(path.resolve(root, mig))) {
  run('migrations', process.execPath, [path.resolve(root, mig)], { cwd: root })
}

process.exit(failed ? 1 : 0)
