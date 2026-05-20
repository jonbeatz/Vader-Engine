#!/usr/bin/env node
/**
 * Universal local HTTP smoke gate
 * Environment-agnostic HTTP verification for dev servers (Next.js, Node, PHP built-in, etc.).
 *
 * Usage:
 *   node scripts/msc-local-http-smoke.mjs [port]
 *
 * Environment (all optional):
 *   MSC_SMOKE_PORT      — target port (or first CLI arg)
 *   MSC_DEV_PORT        — same as kill script; web gate default **3000**
 *   MSC_SMOKE_HOST      — target host (default: 127.0.0.1)
 *   MSC_SMOKE_PATHS     — comma-separated paths (default: /,/admin)
 *   MSC_SMOKE_TIMEOUT_MS — per-request timeout in ms (default: 20000)
 *
 * Exits 0 when all checks pass; 1 otherwise.
 */

import './lib/msc-load-env.mjs'

import http from 'node:http'

const BANNER = '[msc:smoke] local HTTP smoke gate'

function parsePaths() {
  const raw = process.env.MSC_SMOKE_PATHS?.trim()
  if (!raw) return ['/', '/admin']
  return raw
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => (p.startsWith('/') ? p : `/${p}`))
}

function parsePort() {
  const fromArg = process.argv[2]?.trim()
  const raw =
    fromArg ||
    process.env.MSC_SMOKE_PORT ||
    process.env.MSC_DEV_PORT ||
    process.env.DEV_PORT ||
    '3000'
  if (!/^\d{1,5}$/.test(raw)) {
    console.error(`${BANNER}\nInvalid port: ${raw}`)
    process.exit(1)
  }
  return raw
}

const host = (process.env.MSC_SMOKE_HOST || '127.0.0.1').trim()
const port = parsePort()
const paths = parsePaths()
const timeoutMs = Number(process.env.MSC_SMOKE_TIMEOUT_MS || 20_000)

if (!Number.isFinite(timeoutMs) || timeoutMs < 1000) {
  console.error(`${BANNER}\nInvalid MSC_SMOKE_TIMEOUT_MS`)
  process.exit(1)
}

console.log(BANNER)
console.log(`[msc:smoke] target http://${host}:${port} — ${paths.length} path(s)`)

function get(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      res.resume()
      resolve({ status: res.statusCode, url })
    })
    req.on('error', reject)
    req.setTimeout(timeoutMs, () => {
      req.destroy()
      reject(new Error(`timeout after ${timeoutMs}ms`))
    })
  })
}

let failed = 0
let passed = 0

for (const p of paths) {
  const url = `http://${host}:${port}${p}`
  try {
    const { status } = await get(url)
    const ok = status != null && status >= 200 && status < 400
    if (!ok) {
      console.error(`[msc:smoke] FAIL ${status} ${url}`)
      failed += 1
    } else {
      console.log(`[msc:smoke] ok ${status} ${url}`)
      passed += 1
    }
  } catch (e) {
    console.error(`[msc:smoke] FAIL ${url} — ${e?.message || e}`)
    failed += 1
  }
}

console.log('')
if (failed > 0) {
  console.error(
    `[msc:smoke] ${failed} check(s) failed, ${passed} passed. Ensure the dev server is listening on ${host}:${port}.`,
  )
  console.error('[msc:smoke] Tip: free the port, restart dev, then re-run this script.')
  process.exit(1)
}

console.log(`[msc:smoke] All ${passed} check(s) passed.`)
console.log('')
process.exit(0)
