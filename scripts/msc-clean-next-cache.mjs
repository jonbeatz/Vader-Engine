#!/usr/bin/env node
/**
 * Deep-remove Next/Payload build caches (safe when dev server is stopped).
 * Enable via MSC_CLEAN_NEXT=1 or --force
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const BANNER = '[msc:clean-next]'
const force = process.argv.includes('--force') || process.env.MSC_CLEAN_NEXT === '1'
const root = process.env.MSC_PROJECT_ROOT?.trim() || path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

if (!force) {
  console.log(`${BANNER} dry-run — set MSC_CLEAN_NEXT=1 or --force`)
  process.exit(0)
}

for (const rel of ['.next', path.join('node_modules', '.cache'), '.turbo', '.payload']) {
  const p = path.join(root, rel)
  try {
    fs.rmSync(p, { recursive: true, force: true })
    console.log(`${BANNER} removed ${rel}`)
  } catch {
    // ignore
  }
}
console.log(`${BANNER} done`)
