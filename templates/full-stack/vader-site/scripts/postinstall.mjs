import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

if (process.env.ENABLE_PAYLOAD !== 'true') {
  console.log('[msc:postinstall] ENABLE_PAYLOAD≠true — skipping database seed');
  process.exit(0);
}

const seed = path.join(__dirname, 'seed-demo-data.mjs');
const result = spawnSync('npx', ['tsx', seed], {
  cwd: ROOT,
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status ?? 1);
