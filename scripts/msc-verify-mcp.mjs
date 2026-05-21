#!/usr/bin/env node
/**
 * Validate .cursor/mcp.json structure and placeholder hygiene.
 * Dual-pass: JSON placeholders vs hydrated process.env (.env.local).
 * Optional network probe: node scripts/msc-verify-mcp.mjs --probe
 */

import './lib/msc-load-env.mjs'

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

/** Map mcp.json env leaf keys to process.env names (hydrated via msc-load-env). */
const MCP_ENV_KEYS = [
  'GITHUB_PERSONAL_ACCESS_TOKEN',
  'TAVILY_API_KEY',
  'FIRECRAWL_API_KEY',
  'RESEND_API_KEY',
  'WP_API_USERNAME',
  'WP_API_PASSWORD',
  'WORDPRESS_APP_PASSWORD',
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
        hits.push({ path: p, value: v, envKey: k === 'env' ? null : k })
      }
      else if (v && typeof v === 'object') {
        const nested = collectPlaceholders(v, p)
        for (const hit of nested) {
          if (p.endsWith('.env') && typeof hit.value === 'string') {
            hit.envKey = Object.keys(obj).find((key) => obj[key] === hit.value) || hit.envKey
          }
          hits.push(hit)
        }
      }
    }
  }
  return hits
}

function collectPlaceholderEnvKeys(obj, prefix = '') {
  const keys = []
  if (!obj || typeof obj !== 'object') return keys
  if (prefix.endsWith('.env') || prefix === 'env') {
    for (const [envName, val] of Object.entries(obj)) {
      if (typeof val === 'string' && /YOUR_|REPLACE_WITH/i.test(val)) {
        keys.push({ mcpPath: prefix ? `${prefix}.${envName}` : envName, envKey: envName, mcpValue: val })
      }
    }
    return keys
  }
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object') {
      keys.push(...collectPlaceholderEnvKeys(v, p))
    }
  }
  return keys
}

function isLiveRuntimeValue(val) {
  if (!val || typeof val !== 'string') return false
  const t = val.trim()
  if (t.length < 4) return false
  if (/^YOUR_|REPLACE_WITH|your_[a-z_]+$/i.test(t)) return false
  return true
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

const placeholderRows = collectPlaceholderEnvKeys(config.mcpServers)

console.log('[msc:mcp-verify] pass 1 — mcp.json schema placeholders')
if (placeholderRows.length === 0) {
  console.log('[msc:mcp-verify]   no YOUR_/REPLACE_WITH placeholders in committed mcp.json')
}
else {
  for (const row of placeholderRows) {
    console.log(`[msc:mcp-verify]   ${row.mcpPath} = ${row.mcpValue}`)
  }
}

console.log('[msc:mcp-verify] pass 2 — runtime hydration (process.env after .env.local)')
let runtimeReady = 0
let runtimeMissing = 0

for (const envKey of MCP_ENV_KEYS) {
  const runtime = process.env[envKey]
  const mcpRow = placeholderRows.find((r) => r.envKey === envKey)
  if (isLiveRuntimeValue(runtime)) {
    runtimeReady += 1
    if (mcpRow) {
      console.log(
        `[msc:mcp-verify]   OK ${envKey} — active in process.env (mcp.json may keep generic placeholder)`,
      )
    }
    else {
      console.log(`[msc:mcp-verify]   OK ${envKey} — active in process.env`)
    }
  }
  else if (mcpRow) {
    runtimeMissing += 1
    console.log(`[msc:mcp-verify]   — ${envKey} — set value in .env.local (optional until MCP use)`)
  }
}

if (runtimeReady > 0) {
  console.log(`[msc:mcp-verify]   ${runtimeReady} integration key(s) hydrated for script/runtime use`)
}

const fsArg = config.mcpServers?.filesystem?.args?.at(-1)
if (fsArg === 'REPLACE_WITH_ABSOLUTE_PROJECT_ROOT') {
  console.warn(
    '[msc:mcp-verify] WARN filesystem path still placeholder — set to this repo absolute path in mcp.json',
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
  console.log(
    '[msc:mcp-verify] Cursor MCP UI may still need keys in global config; scripts use .env.local via process.env',
  )
}

console.log('')
console.log(
  `[msc:mcp-verify] done — ${failed === 0 ? 'structure OK' : `${failed} warning(s)`}${runtimeMissing ? ` · ${runtimeMissing} optional key(s) unset` : ''}`,
)
process.exit(failed > 0 ? 1 : 0)
