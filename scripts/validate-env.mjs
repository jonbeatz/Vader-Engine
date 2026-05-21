#!/usr/bin/env node
/**
 * MSC validate-env — scan tracked env surfaces for secret leaks vs placeholders
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs'

import fs from 'node:fs'
import path from 'node:path'
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs'

const BANNER = '[msc:validate-env]'
const PLACEHOLDER_RE = /^(YOUR_[A-Z0-9_]+|CHANGE_ME|your_[a-z0-9_]+|placeholder)$/i
const SUSPECT_PATTERNS = [
  /\b(sk_live|sk_test|rk_live|pk_live)_[a-zA-Z0-9]{10,}\b/,
  /\bghp_[a-zA-Z0-9]{20,}\b/,
  /\bAIza[0-9A-Za-z_-]{20,}\b/,
  /\bBearer\s+[a-zA-Z0-9._-]{20,}\b/i,
]

const SCAN_FILES = [
  '.env.example',
  '.cursor/mcp.json',
]

const SCAN_DIRS = ['.cursor']

function isPlaceholder(value) {
  if (!value || typeof value !== 'string') return true
  const v = value.trim()
  if (v.length === 0) return true
  if (PLACEHOLDER_RE.test(v)) return true
  if (/^YOUR_/i.test(v)) return true
  if (/CHANGE_ME/i.test(v)) return true
  return false
}

function scanJsonEnv(filePath) {
  const issues = []
  const raw = fs.readFileSync(filePath, 'utf8')
  const rel = path.relative(MSC_PROJECT_ROOT, filePath)
  let data
  try {
    data = JSON.parse(raw)
  }
  catch {
    issues.push(`${rel}: invalid JSON`)
    return issues
  }
  const walk = (obj, keyPath = '') => {
    if (obj && typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) {
        const p = keyPath ? `${keyPath}.${k}` : k
        if (k === 'env' && v && typeof v === 'object') {
          for (const [ek, ev] of Object.entries(v)) {
            if (typeof ev === 'string' && !isPlaceholder(ev)) {
              for (const pat of SUSPECT_PATTERNS) {
                if (pat.test(ev)) {
                  issues.push(`${rel}: env.${ek} looks like a live secret`)
                }
              }
              if (/^[a-zA-Z0-9_-]{24,}$/.test(ev) && !isPlaceholder(ev) && !ev.includes('workspaceFolder')) {
                issues.push(`${rel}: env.${ek} must use YOUR_* placeholder in committed config`)
              }
            }
          }
        }
        else if (typeof v === 'object') {
          walk(v, p)
        }
      }
    }
  }
  walk(data)
  for (const pat of SUSPECT_PATTERNS) {
    if (pat.test(raw)) {
      issues.push(`${rel}: file content matches live secret pattern`)
    }
  }
  return issues
}

function scanEnvExample(filePath) {
  const issues = []
  const rel = path.relative(MSC_PROJECT_ROOT, filePath)
  const lines = fs.readFileSync(filePath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 0) continue
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (!val) continue
    for (const pat of SUSPECT_PATTERNS) {
      if (pat.test(val)) {
        issues.push(`${rel}: value looks like a live secret`)
      }
    }
  }
  return issues
}

const allIssues = []

for (const rel of SCAN_FILES) {
  const full = path.join(MSC_PROJECT_ROOT, rel)
  if (!fs.existsSync(full)) continue
  if (rel.endsWith('.json')) {
    allIssues.push(...scanJsonEnv(full))
  }
  else {
    allIssues.push(...scanEnvExample(full))
  }
}

if (allIssues.length > 0) {
  console.error(`${BANNER} FAIL — ${allIssues.length} issue(s):`)
  for (const i of allIssues) console.error(`  - ${i}`)
  process.exit(1)
}

console.log(`${BANNER} PASS — committed env surfaces use placeholders only`)
