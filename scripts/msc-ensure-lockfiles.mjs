#!/usr/bin/env node
/**
 * Ensure package-lock.json exists for root and sandbox workspaces
 * Usage: npm run msc:ensure-lockfiles
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs';
import './lib/msc-node-version-guard.mjs';

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs';

const targets = [
  '.',
  'examples/nextjs-minimal',
  'examples/nextjs-payload',
  'examples/nextjs-tailwind',
];

for (const rel of targets) {
  const dir = join(MSC_PROJECT_ROOT, rel);
  const lock = join(dir, 'package-lock.json');
  if (!existsSync(lock)) {
    console.log(`[msc:ensure-lockfiles] Generating ${rel}/package-lock.json`);
    execSync('npm install --package-lock-only', { cwd: dir, stdio: 'inherit' });
  } else {
    console.log(`[msc:ensure-lockfiles] OK ${rel}/package-lock.json`);
  }
}

console.log('[msc:ensure-lockfiles] All lockfiles present');
