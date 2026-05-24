#!/usr/bin/env node
/**
 * Stop optional Docker Postgres mirror
 * Usage: node scripts/msc-docker-down.mjs
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs';
import './lib/msc-node-version-guard.mjs';

import { execSync } from 'node:child_process';
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs';

try {
  execSync('docker compose down', {
    cwd: MSC_PROJECT_ROOT,
    stdio: 'inherit',
  });
  console.log('[msc:docker:down] Docker services stopped');
} catch {
  console.error('[msc:docker:down] Failed — ensure Docker Desktop is running');
  process.exit(1);
}
