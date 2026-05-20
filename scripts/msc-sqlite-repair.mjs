#!/usr/bin/env node
/**
 * Backup-first SQLite additive repair (generic manifest).
 * Consumer extends via MSC_SQLITE_REPAIR_MANIFEST (JSON path) — see .cursor/docs/sqlite-repair-manifest.md
 *
 * Built-in: optional payload_locked_documents_rels polymorphic columns from manifest.
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { msc_resolveSqliteDatabaseFilePath } from './lib/msc-sqlite-path.mjs'

const BANNER = '[msc:sqlite-repair]'
const dryRun = process.env.MSC_SQLITE_REPAIR_DRY_RUN === '1' || process.argv.includes('--dry-run')

function loadManifest() {
  const manifestPath = process.env.MSC_SQLITE_REPAIR_MANIFEST?.trim()
  if (!manifestPath) {
    return { addColumns: [], addIndexes: [] }
  }
  const abs = path.isAbsolute(manifestPath)
    ? manifestPath
    : path.resolve(process.cwd(), manifestPath)
  if (!fs.existsSync(abs)) {
    console.error(`${BANNER} manifest not found: ${abs}`)
    process.exit(1)
  }
  return JSON.parse(fs.readFileSync(abs, 'utf8'))
}

async function tableColumns(client, table) {
  const r = await client.execute({ sql: `PRAGMA table_info(${JSON.stringify(table)})`, args: [] })
  return r.rows.map((row) => row.name)
}

async function addColumnIfMissing(client, table, existing, column, definition) {
  if (existing.includes(column)) {
    console.log(`${BANNER} skip ${table}.${column}`)
    return
  }
  if (dryRun) {
    console.log(`${BANNER} [dry-run] ALTER ${table} ADD ${column}`)
    return
  }
  await client.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`)
  existing.push(column)
  console.log(`${BANNER} added ${table}.${column}`)
}

async function createIndexIfMissing(client, indexName, sql) {
  const r = await client.execute({
    sql: 'SELECT name FROM sqlite_master WHERE type = ? AND name = ?',
    args: ['index', indexName],
  })
  if (r.rows.length > 0) {
    console.log(`${BANNER} skip index ${indexName}`)
    return
  }
  if (dryRun) {
    console.log(`${BANNER} [dry-run] ${sql}`)
    return
  }
  await client.execute(sql)
  console.log(`${BANNER} added index ${indexName}`)
}

async function main() {
  let createClient
  try {
    ;({ createClient } = await import('@libsql/client'))
  } catch {
    console.error(`${BANNER} install @libsql/client in consumer app (Payload SQLite dependency)`)
    process.exit(1)
  }

  const dbPath = msc_resolveSqliteDatabaseFilePath()
  if (!fs.existsSync(dbPath)) {
    console.error(`${BANNER} database not found: ${dbPath}`)
    process.exit(1)
  }

  const manifest = loadManifest()
  if (!manifest.addColumns?.length && !manifest.addIndexes?.length) {
    console.log(`${BANNER} no manifest entries — set MSC_SQLITE_REPAIR_MANIFEST or ship consumer manifest`)
    process.exit(0)
  }

  if (!dryRun) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backup = `${dbPath}.bak.${stamp}`
    fs.copyFileSync(dbPath, backup)
    console.log(`${BANNER} backup: ${backup}`)
  }

  const url = `file:${dbPath.replace(/\\/g, '/')}`
  const client = createClient({ url })

  try {
    for (const entry of manifest.addColumns || []) {
      const { table, column, definition } = entry
      const cols = await tableColumns(client, table)
      await addColumnIfMissing(client, table, cols, column, definition)
    }
    for (const entry of manifest.addIndexes || []) {
      await createIndexIfMissing(client, entry.name, entry.sql)
    }
  } finally {
    client.close()
  }
  console.log(`${BANNER} complete${dryRun ? ' (dry-run)' : ''}`)
}

main().catch((e) => {
  console.error(BANNER, e)
  process.exit(1)
})
