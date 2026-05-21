#!/usr/bin/env node
/**
 * Append a changelog row to .cursor/docs/project-log.md.
 * Usage: npm run log -- --type feat --msg "Short description"
 *        node scripts/msc-log-event.mjs --type fix --msg "Repair MCP gate"
 */

import './lib/msc-load-env.mjs'

import fs from 'node:fs'
import path from 'node:path'
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs'

const LOG_PATH = path.join(MSC_PROJECT_ROOT, '.cursor', 'docs', 'project-log.md')
const CHANGELOG_HEADING = '## 🪵 Development Changelog'
const ALLOWED_TYPES = new Set(['feat', 'fix', 'chore'])

function parseArgs(argv) {
  let type = ''
  let msg = ''
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--type' && argv[i + 1]) {
      type = argv[++i].toLowerCase()
    }
    else if (arg === '--msg' && argv[i + 1]) {
      msg = argv[++i]
    }
    else if (arg.startsWith('--type=')) {
      type = arg.slice('--type='.length).toLowerCase()
    }
    else if (arg.startsWith('--msg=')) {
      msg = arg.slice('--msg='.length)
    }
  }
  return { type, msg }
}

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function buildEntry(date, type, message) {
  return `### [${date}] - [${type}] - [${message}]`
}

function findLastChangelogEntry(body) {
  const idx = body.indexOf(CHANGELOG_HEADING)
  if (idx === -1) return null
  const after = body.slice(idx + CHANGELOG_HEADING.length)
  const match = after.match(/### \[\d{4}-\d{2}-\d{2}\][^\n]*/)
  return match ? match[0].trim() : null
}

function insertEntry(body, entryLine) {
  const idx = body.indexOf(CHANGELOG_HEADING)
  if (idx === -1) {
    return `${body.trimEnd()}\n\n${CHANGELOG_HEADING}\n\n${entryLine}\n`
  }
  const insertAt = idx + CHANGELOG_HEADING.length
  const before = body.slice(0, insertAt)
  const after = body.slice(insertAt).replace(/^\s*/, '\n\n')
  return `${before}\n\n${entryLine}${after.startsWith('\n') ? after : `\n${after}`}`
}

function main() {
  const { type, msg } = parseArgs(process.argv)
  if (!ALLOWED_TYPES.has(type)) {
    console.error('[msc:log-event] --type must be one of: feat, fix, chore')
    process.exit(1)
  }
  if (!msg || !msg.trim()) {
    console.error('[msc:log-event] --msg is required')
    process.exit(1)
  }

  const message = msg.trim()
  const date = todayIso()
  const entryLine = buildEntry(date, type, message)

  if (!fs.existsSync(LOG_PATH)) {
    console.error('[msc:log-event] missing log file:', LOG_PATH)
    process.exit(1)
  }

  const body = fs.readFileSync(LOG_PATH, 'utf8')
  const last = findLastChangelogEntry(body)
  if (last === entryLine) {
    console.log('[msc:log-event] skip duplicate (matches last changelog heading):', entryLine)
    process.exit(0)
  }

  const next = insertEntry(body, entryLine)
  fs.writeFileSync(LOG_PATH, next.endsWith('\n') ? next : `${next}\n`, 'utf8')
  console.log('[msc:log-event] appended:', entryLine)
}

main()
