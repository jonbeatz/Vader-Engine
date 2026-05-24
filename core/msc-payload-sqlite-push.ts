import { msc_sqliteDatabaseExists } from './msc-sqlite-path';

/**
 * Resolves whether Payload should run Drizzle dev schema push for SQLite.
 * Pushing against an existing DB can re-emit CREATE INDEX and fail with
 * SQLITE_ERROR "index ... already exists" (duplicate dev servers / Windows CI).
 *
 * Override: PAYLOAD_SQLITE_PUSH=true|false
 * Legacy:   PAYLOAD_DB_PUSH=true forces push
 */
export function msc_resolveSqlitePush(cwd = process.cwd()): boolean {
  if (process.env.PAYLOAD_SQLITE_PUSH === 'true') return true;
  if (process.env.PAYLOAD_SQLITE_PUSH === 'false') return false;
  if (process.env.PAYLOAD_DB_PUSH === 'true') return true;
  if (process.env.NODE_ENV === 'production') return false;
  if (process.env.PAYLOAD_MIGRATING === 'true') return false;

  try {
    return !msc_sqliteDatabaseExists(cwd);
  } catch {
    return false;
  }
}
