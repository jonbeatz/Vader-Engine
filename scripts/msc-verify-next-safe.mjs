#!/usr/bin/env node
/**
 * Safe Next build gate: kill dev port → clean caches → consumer runs `next build`.
 * Template repo exits after prep unless MSC_VERIFY_NEXT_RUN_BUILD=1 and next is installed.
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const BANNER = '[msc:verify-next-safe]'
const port = process.env.MSC_DEV_PORT?.trim() || '3000'
const scriptsDir = path.dirname(fileURLToPath(import.meta.url))

spawnSync(process.execPath, [path.join(scriptsDir, 'msc-kill-dev-port.mjs'), port], {
  stdio: 'inherit',
  env: process.env,
})

spawnSync(process.execPath, [path.join(scriptsDir, 'msc-clean-next-cache.mjs'), '--force'], {
  stdio: 'inherit',
  env: { ...process.env, MSC_CLEAN_NEXT: '1' },
})

if (process.env.MSC_VERIFY_NEXT_RUN_BUILD === '1') {
  const r = spawnSync('npx', ['next', 'build'], { stdio: 'inherit', shell: true, cwd: process.cwd() })
  process.exit(r.status ?? 1)
}

console.log(`${BANNER} prep complete — in consumer app: npm run build or npx next build`)
process.exit(0)
