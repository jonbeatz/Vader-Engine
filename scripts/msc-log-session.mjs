#!/usr/bin/env node
/**
 * Session telemetry snapshot — git state, integrity grade, dashboard smoke, dev ports.
 * Usage: npm run msc:log-session
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import process from 'node:process';
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs';
import { msc_parseGradeOutput } from './lib/msc-parse-grade.mjs';

const BANNER = '[msc:log-session]';
const LOGS_DIR = path.join(MSC_PROJECT_ROOT, 'logs');
const HOST = (process.env.MSC_SMOKE_HOST || '127.0.0.1').trim();
const HTTP_TIMEOUT_MS = Number(process.env.MSC_SMOKE_TIMEOUT_MS || 10_000);

const PORT_TARGETS = [
  { port: 3010, label: 'dashboard' },
  { port: 3003, label: 'vader-site' },
];

const useShell = process.platform === 'win32';

/**
 * @param {string[]} args
 */
function msc_git(args) {
  const result = spawnSync('git', args, {
    cwd: MSC_PROJECT_ROOT,
    encoding: 'utf8',
    shell: useShell,
  });
  if (result.status !== 0) return null;
  return (result.stdout ?? '').trim() || null;
}

/**
 * @param {string} stamp
 */
function msc_logFilename(stamp) {
  return path.join(LOGS_DIR, `session-${stamp}.json`);
}

/**
 * @param {Date} [date]
 */
function msc_fileStamp(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

/**
 * @param {number} port
 */
function msc_portListening(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ port, host: HOST }, () => {
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

/**
 * @param {number} port
 */
async function msc_httpStatus(port) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HTTP_TIMEOUT_MS);
  try {
    const res = await fetch(`http://${HOST}:${port}/`, {
      redirect: 'follow',
      signal: controller.signal,
    });
    return res.status;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * @param {number} port
 * @param {string} label
 */
async function msc_probePort(port, label) {
  const listening = await msc_portListening(port);
  const httpStatus = listening ? await msc_httpStatus(port) : null;
  return {
    port,
    label,
    host: HOST,
    listening,
    httpStatus,
    ok: listening && httpStatus != null && httpStatus >= 200 && httpStatus < 400,
  };
}

function msc_runGrade() {
  const result = spawnSync('npm', ['run', 'grade', '--silent'], {
    cwd: MSC_PROJECT_ROOT,
    encoding: 'utf8',
    shell: useShell,
    env: process.env,
  });
  const stdout = `${result.stdout ?? ''}${result.stderr ?? ''}`;
  const parsed = msc_parseGradeOutput(stdout);
  return {
    score: `${parsed.passed}/${parsed.total}`,
    passed: parsed.passed,
    total: parsed.total,
    pct: parsed.pct,
    ok: parsed.ok,
    exitCode: result.status ?? 1,
  };
}

function msc_runDashboardSmoke() {
  const result = spawnSync('npm', ['run', 'msc:dashboard:smoke', '--silent'], {
    cwd: MSC_PROJECT_ROOT,
    encoding: 'utf8',
    shell: useShell,
    env: process.env,
  });
  const stdout = (result.stdout ?? '').trim();
  const stderr = (result.stderr ?? '').trim();
  const combined = [stdout, stderr].filter(Boolean).join('\n');
  const lastLine = combined.split(/\r?\n/).filter(Boolean).pop() ?? '';
  return {
    ok: result.status === 0,
    exitCode: result.status ?? 1,
    summary: lastLine || (result.status === 0 ? 'PASS' : 'FAIL'),
  };
}

async function main() {
  const now = new Date();
  const stamp = msc_fileStamp(now);
  const filePath = msc_logFilename(stamp);

  console.log(`${BANNER} collecting session telemetry…`);

  const gitBranch = msc_git(['branch', '--show-current']);
  const gitCommit = msc_git(['rev-parse', '--short', 'HEAD']);

  console.log(`${BANNER} grade…`);
  const integrity = msc_runGrade();
  console.log(
    `${BANNER} integrity: ${integrity.score} (${integrity.pct}%) — ${integrity.ok ? 'PASS' : 'FAIL'}`,
  );

  console.log(`${BANNER} dashboard smoke…`);
  const dashboardSmoke = msc_runDashboardSmoke();
  console.log(
    `${BANNER} dashboard smoke: ${dashboardSmoke.ok ? 'PASS' : 'FAIL'} — ${dashboardSmoke.summary}`,
  );

  console.log(`${BANNER} ports…`);
  const ports = [];
  for (const target of PORT_TARGETS) {
    const status = await msc_probePort(target.port, target.label);
    ports.push(status);
    const portLabel = status.ok
      ? `up HTTP ${status.httpStatus}`
      : status.listening
        ? `listening HTTP ${status.httpStatus ?? '—'}`
        : 'down';
    console.log(`${BANNER} :${target.port} (${target.label}): ${portLabel}`);
  }

  const record = {
    schemaVersion: '1.0.0',
    timestamp: now.toISOString(),
    git: {
      branch: gitBranch,
      commit: gitCommit,
    },
    integrity,
    dashboardSmoke,
    ports,
  };

  fs.mkdirSync(LOGS_DIR, { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(record, null, 2)}\n`, 'utf8');

  console.log(`\n${BANNER} wrote ${path.relative(MSC_PROJECT_ROOT, filePath).replace(/\\/g, '/')}`);
  console.log(JSON.stringify(record, null, 2));
  process.exit(0);
}

main().catch((err) => {
  console.error(`${BANNER} FAIL —`, err instanceof Error ? err.message : err);
  process.exit(1);
});
