import path from 'node:path';

/** Repo root when Next dev cwd is `ui/dashboard`. */
export function msc_getRepoRoot(): string {
  return path.resolve(process.cwd(), '..', '..');
}
