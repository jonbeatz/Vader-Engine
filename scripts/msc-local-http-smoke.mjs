#!/usr/bin/env node
/**
 * Universal local HTTP smoke gate
 * Environment-agnostic HTTP verification for dev servers (Next.js, Node, PHP built-in, etc.).
 *
 * Usage:
 *   node scripts/msc-local-http-smoke.mjs [port]
 *   node scripts/msc-local-http-smoke.mjs --no-strict   (CI: skip HTTP ping, exit 0)
 *
 * Environment (all optional):
 *   MSC_SMOKE_PORT      — target port (or first CLI arg)
 *   MSC_DEV_PORT        — same as kill script; web gate default **3000**
 *   MSC_SMOKE_HOST      — target host (default: 127.0.0.1)
 *   MSC_SMOKE_PATHS     — comma-separated paths (default: /,/admin)
 *   MSC_SMOKE_TIMEOUT_MS — per-request timeout in ms (default: 20000)
 *
 * Exits 0 when all checks pass, or when no listener (baseline template mode).
 * Set MSC_SMOKE_STRICT=1 to fail when the dev port is not listening.
 */

import './lib/msc-load-env.mjs';

import http from 'node:http';
import net from 'node:net';

const BANNER = '[msc:smoke] local HTTP smoke gate';

function parsePaths() {
  const raw = process.env.MSC_SMOKE_PATHS?.trim();
  if (!raw) return ['/', '/admin'];
  return raw
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => (p.startsWith('/') ? p : `/${p}`));
}

function parsePort() {
  const fromArg = process.argv
    .slice(2)
    .find((a) => /^\d{1,5}$/.test(a.trim()))
    ?.trim();
  const raw =
    fromArg ||
    process.env.MSC_SMOKE_PORT ||
    process.env.MSC_DEV_PORT ||
    process.env.DEV_PORT ||
    '3000';
  if (!/^\d{1,5}$/.test(raw)) {
    console.error(`${BANNER}\nInvalid port: ${raw}`);
    process.exit(1);
  }
  return raw;
}

const host = (process.env.MSC_SMOKE_HOST || '127.0.0.1').trim();
const port = parsePort();
const paths = parsePaths();
const timeoutMs = Number(process.env.MSC_SMOKE_TIMEOUT_MS || 20_000);

if (!Number.isFinite(timeoutMs) || timeoutMs < 1000) {
  console.error(`${BANNER}\nInvalid MSC_SMOKE_TIMEOUT_MS`);
  process.exit(1);
}

function portIsListening(port, hostname) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ port: Number(port), host: hostname }, () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('error', () => resolve(false));
    socket.setTimeout(1500, () => {
      socket.destroy();
      resolve(false);
    });
  });
}

console.log(BANNER);

if (process.argv.includes('--no-strict')) {
  console.log('[msc:smoke] --no-strict: skipping HTTP smoke (CI / check:all gate)');
  process.exit(0);
}

const strict = process.env.MSC_SMOKE_STRICT === '1';
const listening = await portIsListening(port, host);

if (!listening) {
  if (strict) {
    console.error(
      `[msc:smoke] MSC_SMOKE_STRICT=1 — no listener on ${host}:${port}. Start dev server or unset strict mode.`,
    );
    process.exit(1);
  }
  console.log('[msc:smoke] Baseline Template Mode Detected: Bypassing HTTP port ping');
  console.log(
    `[msc:smoke] No listener on ${host}:${port} — expected for template-only repos. Exit 0.`,
  );
  process.exit(0);
}

console.log(`[msc:smoke] target http://${host}:${port} — ${paths.length} path(s)`);

function get(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve({ status: res.statusCode, url });
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      reject(new Error(`timeout after ${timeoutMs}ms`));
    });
  });
}

let failed = 0;
let passed = 0;

for (const p of paths) {
  const url = `http://${host}:${port}${p}`;
  try {
    const { status } = await get(url);
    const ok = status != null && status >= 200 && status < 400;
    if (!ok) {
      console.error(`[msc:smoke] FAIL ${status} ${url}`);
      failed += 1;
    } else {
      console.log(`[msc:smoke] ok ${status} ${url}`);
      passed += 1;
    }
  } catch (e) {
    console.error(`[msc:smoke] FAIL ${url} — ${e?.message || e}`);
    failed += 1;
  }
}

console.log('');
if (failed > 0) {
  console.error(
    `[msc:smoke] ${failed} check(s) failed, ${passed} passed. Ensure the dev server is listening on ${host}:${port}.`,
  );
  console.error('[msc:smoke] Tip: free the port, restart dev, then re-run this script.');
  process.exit(1);
}

console.log(`[msc:smoke] All ${passed} check(s) passed.`);
console.log('');
process.exit(0);
