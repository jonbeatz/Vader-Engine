#!/usr/bin/env node
/**
 * MSC kill-ports — cross-platform clearance for 3000, 3001, 8080
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs'

import { execSync } from 'node:child_process'

const BANNER = '[msc:kill-dev-port]'
const PORTS = [3000, 3001, 8080]

console.log(`${BANNER} clearing ports: ${PORTS.join(', ')}`)

for (const port of PORTS) {
  try {
    execSync(`npx --yes kill-port ${port}`, {
      stdio: 'inherit',
      shell: true,
    })
  }
  catch {
    console.log(`${BANNER} port ${port} — no listener or already free`)
  }
}

console.log(`${BANNER} done`)
