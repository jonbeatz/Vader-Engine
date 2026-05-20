#!/usr/bin/env node
/**
 * Validate .cursor/mcp.json structure and placeholder hygiene.
 * Optional network probe: node scripts/msc-verify-mcp.mjs --probe
 * (first --probe run may download packages via npx; slow on cold cache)
 */

import { execFile } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mcpPath = join(root, '.cursor', 'mcp.json')
const probeOnline = process.argv.includes('--probe')

const EXPECTED_SERVERS = [
  'payload',
  'github',
  'playwright',
  'filesystem',
  'fetch',
  'tavily',
  'firecrawl',
  'resend',
  'sequential-thinking',
  'wordpress-local',
  'neon-postgres',
]

function loadMcp() {
  const raw = readFileSync(mcpPath, 'utf8')
  return JSON.parse(raw)
}

function collectPlaceholders(obj, path = '') {
  const hits = []
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      const p = path ? `${path}.${k}` : k
      if (typeof v === 'string' && /YOUR_|REPLACE_WITH/i.test(v)) {
        hits.push({ path: p, value: v })
      }
      else if (v && typeof v === 'object') {
        hits.push(...collectPlaceholders(v, p))
      }
    }
  }
  return hits
}

async function probeOne(pkg) {
  if (process.platform === 'win32') {
    await execFileAsync('cmd.exe', ['/c', 'npx', '-y', pkg, '--version'], {
      timeout: 120_000,
      windowsHide: true,
    })
  }
  else {
    await execFileAsync('npx', ['-y', pkg, '--version'], { timeout: 120_000 })
  }
}

console.log('[msc:mcp-verify] config:', mcpPath)
let failed = 0

let config
try {
  config = loadMcp()
}
catch (e) {
  console.error('[msc:mcp-verify] FAIL invalid JSON:', e.message)
  process.exit(1)
}

const servers = Object.keys(config.mcpServers ?? {})
console.log(`[msc:mcp-verify] servers (${servers.length}):`, servers.join(', '))

for (const name of EXPECTED_SERVERS) {
  if (!servers.includes(name)) {
    console.warn(`[msc:mcp-verify] WARN missing expected server: ${name}`)
    failed += 1
  }
}

const placeholders = collectPlaceholders(config.mcpServers)
if (placeholders.length > 0) {
  console.log('[msc:mcp-verify] placeholders (fill before production MCP use):')
  for (const h of placeholders) {
    console.log(`  - ${h.path} = ${h.value}`)
  }
}
else {
  console.log('[msc:mcp-verify] no YOUR_/REPLACE_WITH placeholders in mcp.json')
}

const fsArg = config.mcpServers?.filesystem?.args?.at(-1)
if (fsArg === 'REPLACE_WITH_ABSOLUTE_PROJECT_ROOT') {
  console.warn(
    '[msc:mcp-verify] WARN filesystem path still placeholder — set to this repo absolute path',
  )
  failed += 1
}

if (probeOnline) {
  console.log('[msc:mcp-verify] --probe: checking npx can reach @modelcontextprotocol/server-github ...')
  try {
    await probeOne('@modelcontextprotocol/server-github@latest')
    console.log('[msc:mcp-verify] --probe: npx OK (network + registry reachable)')
  }
  catch (e) {
    console.error('[msc:mcp-verify] --probe FAIL:', e.message?.slice(0, 200))
    failed += 1
  }
}
else {
  console.log('[msc:mcp-verify] skip npx download (pass --probe to test registry)')
  console.log('[msc:mcp-verify] confirm green status in Cursor → Settings → MCP after filling keys')
}

console.log('')
console.log(
  `[msc:mcp-verify] done — ${failed === 0 ? 'structure OK' : `${failed} warning(s)`}`,
)
process.exit(failed > 0 ? 1 : 0)
