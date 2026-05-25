/**
 * Clears stale Next cache (e.g. old scanline CSS) then starts dev server.
 */
import { rmSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nextDir = path.join(root, '.next');

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
  console.log('[dev-fresh] removed .next cache');
}

// Must match prebuild-static.mjs — do not force Payload when static prep ran
const env = { ...process.env };

const port = process.env.PORT ?? process.env.MSC_DEV_PORT ?? '3003';
spawn('npx', ['next', 'dev', '-p', port], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
  env,
});
