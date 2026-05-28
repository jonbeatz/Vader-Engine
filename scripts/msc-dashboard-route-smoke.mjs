#!/usr/bin/env node
/**
 * HTTP smoke for Vader Construct dashboard routes (port 3010).
 */
import './lib/msc-load-env.mjs';

const PORT = Number(process.env.MSC_DASHBOARD_PORT || 3010);
const HOST = process.env.MSC_DASHBOARD_HOST || '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;

const ROUTES = [
  '/',
  '/projects',
  '/templates',
  '/sandboxes',
  '/integrity',
  '/operations',
  '/operations/scripts',
  '/operations/ports',
  '/operations/env',
  '/protocols',
  '/settings',
  '/api/health',
  '/api/grade',
  '/api/templates',
  '/api/env',
  '/api/projects',
  '/api/scripts',
  '/api/logs',
];

let failed = 0;

for (const route of ROUTES) {
  const url = `${BASE}${route}`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    const ok = res.status >= 200 && res.status < 400;
    console.log(`${ok ? 'OK' : 'FAIL'} ${res.status} ${route}`);
    if (!ok) failed += 1;
  } catch (err) {
    console.error(`FAIL ${route} — ${err instanceof Error ? err.message : err}`);
    failed += 1;
  }
}

if (failed > 0) {
  console.error(`[msc:dashboard-smoke] ${failed} route(s) failed`);
  process.exit(1);
}

console.log(`[msc:dashboard-smoke] PASS — ${ROUTES.length} routes on :${PORT}`);
