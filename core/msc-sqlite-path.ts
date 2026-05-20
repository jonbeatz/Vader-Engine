import fs from "fs"
import path from "path"

/**
 * Resolves SQLite file URL from env (DATABASE_URI preferred, DATABASE_URL fallback).
 * Keeps scripts and Payload config aligned on the same on-disk file.
 */
export function msc_resolveSqliteDatabaseUrl(): string {
  return (
    process.env.DATABASE_URI?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    "file:./data/payload.sqlite"
  )
}

/** Resolves the on-disk path for `file:` SQLite URLs used by @libsql/client. */
export function msc_resolveSqliteDatabaseFilePath(cwd = process.cwd()): string {
  const raw = msc_resolveSqliteDatabaseUrl()
  let rest = raw.trim()
  if (rest.startsWith("file:")) {
    rest = rest.slice("file:".length)
  }
  if (rest.startsWith("///")) {
    rest = rest.slice(2)
  } else if (rest.startsWith("//")) {
    rest = rest.slice(1)
  }
  rest = rest.replace(/^\/+/, "")
  if (/^[A-Za-z]:[\\/]/.test(rest)) {
    return path.normalize(rest)
  }
  return path.resolve(cwd, rest)
}

export function msc_sqliteDatabaseExists(cwd = process.cwd()): boolean {
  try {
    return fs.existsSync(msc_resolveSqliteDatabaseFilePath(cwd))
  } catch {
    return false
  }
}

/** Alias for Payload adapter `client.url`. */
export function msc_resolveDatabaseUrl(): string {
  return msc_resolveSqliteDatabaseUrl()
}
