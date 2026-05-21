#!/usr/bin/env node
/**
 * MSC Jedi-Health — JSON-hookable console diagnostic engine (Roadmap §3.3)
 * Socket probes: 3000, 3001, 8080 · .env.local · .nvmrc
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs'

import net from 'node:net'
import fs from 'node:fs'
import path from 'node:path'
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs'

const targetPorts = [3000, 3001, 8080]
const isJsonOutput = process.argv.includes('--json')

function probeSocket(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket()
    socket.setTimeout(400)
    // Fires when a service accepts connections actively
    socket.on('connect', () => { socket.destroy(); resolve('OCCUPIED') })
    // Unbound or TIME_WAIT recycling windows
    socket.on('error', () => { socket.destroy(); resolve('AVAILABLE') })
    socket.on('timeout', () => { socket.destroy(); resolve('TIMEOUT') })
    socket.connect(port, '127.0.0.1')
  })
}

async function runSystemDiagnostics() {
  const reports = {}
  for (const port of targetPorts) {
    reports[`port_${port}`] = await probeSocket(port)
  }
  reports.env_file = fs.existsSync(path.join(MSC_PROJECT_ROOT, '.env.local'))
    ? 'CONFIGURED'
    : 'MISSING'
  reports.nvm_lock = fs.existsSync(path.join(MSC_PROJECT_ROOT, '.nvmrc'))
    ? 'LOCKED'
    : 'UNSAFE'

  if (isJsonOutput) {
    console.log(JSON.stringify({ status: 'SUCCESS', diagnostics: reports }, null, 2))
  }
  else {
    console.log('\x1b[35m=== MSC MEDIA PRO JEDI-HEALTH LOG ===\x1b[0m')
    console.table(reports)
  }
}

runSystemDiagnostics().catch((err) => {
  console.error('[msc:health] diagnostic failure:', err.message)
  process.exit(1)
})
