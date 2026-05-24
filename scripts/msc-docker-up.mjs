#!/usr/bin/env node
/**
 * Start optional Docker Postgres mirror (opt-in — default dev uses SQLite)
 * Usage: node scripts/msc-docker-up.mjs
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs';
import './lib/msc-node-version-guard.mjs';

import { execSync } from 'node:child_process';
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs';

try {
  execSync('docker compose up -d msc-postgres', {
    cwd: MSC_PROJECT_ROOT,
    stdio: 'inherit',
  });
  console.log('[msc:docker:up] msc-postgres started on localhost:5432');
} catch {
  console.error('[msc:docker:up] Failed — ensure Docker Desktop is running');
  process.exit(1);
}
