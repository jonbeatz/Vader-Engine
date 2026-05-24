#!/usr/bin/env node
/**
 * MSC kill-all-dev-ports — wrapper for 3000, 3001, 8080
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs';
import './lib/msc-node-version-guard.mjs';

import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BANNER = '[msc:kill-all-dev-ports]';
const PORTS = [3000, 3001, 8080];
const killScript = join(dirname(fileURLToPath(import.meta.url)), 'msc-kill-dev-port.mjs');

console.log(`${BANNER} clearing ports: ${PORTS.join(', ')}`);

let anyAttempted = false;
for (const port of PORTS) {
  try {
    execSync(`node "${killScript}" ${port}`, { stdio: 'inherit', shell: true });
    anyAttempted = true;
  } catch {
    console.log(`${BANNER} port ${port} — no listener or already free`);
  }
}

if (!anyAttempted) {
  console.log(`${BANNER} no ports to kill`);
}

console.log(`${BANNER} done`);
