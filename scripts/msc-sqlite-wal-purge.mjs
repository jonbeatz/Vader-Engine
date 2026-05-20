#!/usr/bin/env node
/**
 * Remove SQLite WAL/SHM sidecars before deploy or file copy.
 * Set MSC_SQLITE_WAL_PURGE=1 or pass --force
 */
import './lib/msc-load-env.mjs'

import fs from 'node:fs'
import process from 'node:process'
import { msc_resolveSqliteDatabaseFilePath } from './lib/msc-sqlite-path.mjs'

const BANNER = '[msc:sqlite-wal-purge]'
const force = process.argv.includes('--force') || process.env.MSC_SQLITE_WAL_PURGE === '1'

if (!force) {
  console.log(`${BANNER} dry-run (set MSC_SQLITE_WAL_PURGE=1 or --force)`)
  process.exit(0)
}

const base = msc_resolveSqliteDatabaseFilePath()
for (const suffix of ['-wal', '-shm']) {
  const p = `${base}${suffix}`
  if (fs.existsSync(p)) {
    fs.rmSync(p, { force: true })
    console.log(`${BANNER} removed ${p}`)
  }
}
console.log(`${BANNER} done`)
