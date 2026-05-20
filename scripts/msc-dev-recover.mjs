#!/usr/bin/env node
/**
 * One-shot dev recovery: kill dev port → optional clean next → hint to restart dev.
 * MSC_DEV_PORT (default 3000), MSC_DEV_RECOVER_CLEAN=1 to run clean-next after kill.
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const BANNER = '[msc:dev-recover]'
const port = process.env.MSC_DEV_PORT?.trim() || '3000'
const scriptsDir = path.dirname(fileURLToPath(import.meta.url))

spawnSync(process.execPath, [path.join(scriptsDir, 'msc-kill-dev-port.mjs'), port], {
  stdio: 'inherit',
  env: { ...process.env, MSC_DEV_PORT: port },
})

if (process.env.MSC_DEV_RECOVER_CLEAN === '1') {
  spawnSync(process.execPath, [path.join(scriptsDir, 'msc-clean-next-cache.mjs'), '--force'], {
    stdio: 'inherit',
    env: { ...process.env, MSC_CLEAN_NEXT: '1' },
  })
}

console.log(`${BANNER} port ${port} cleared — start consumer dev server when ready`)
