import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export function msc_resolveSqliteDatabaseUrl() {
  return (
    process.env.DATABASE_URI?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    'file:./data/payload.sqlite'
  )
}

export function msc_resolveSqliteDatabaseFilePath(cwd = process.cwd()) {
  const raw = msc_resolveSqliteDatabaseUrl()
  let rest = raw.trim()
  if (rest.startsWith('file:')) rest = rest.slice('file:'.length)
  if (rest.startsWith('///')) rest = rest.slice(2)
  else if (rest.startsWith('//')) rest = rest.slice(1)
  rest = rest.replace(/^\/+/, '')
  if (/^[A-Za-z]:[\\/]/.test(rest)) return path.normalize(rest)
  return path.resolve(cwd, rest)
}

export function msc_sqliteDatabaseExists(cwd = process.cwd()) {
  try {
    return fs.existsSync(msc_resolveSqliteDatabaseFilePath(cwd))
  } catch {
    return false
  }
}
