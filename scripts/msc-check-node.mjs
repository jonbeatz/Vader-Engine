#!/usr/bin/env node
/**
 * Node runtime preflight — run before Start Project / grade / hooks fail opaquely.
 * Usage: npm run msc:check-node
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs';

const BANNER = '[msc:check-node]';
const major = Number(process.versions.node.split('.')[0]);
const nvmrcPath = path.join(MSC_PROJECT_ROOT, '.nvmrc');
let pinned = null;
if (fs.existsSync(nvmrcPath)) {
  pinned = fs.readFileSync(nvmrcPath, 'utf8').trim();
}

const ok = major >= 20 && major < 25;
const execPath = process.execPath.replace(/\\/g, '/');
const fromCursorHelper = /cursor|resources\/app/i.test(execPath);

console.log(`${BANNER} Node ${process.versions.node} · ${process.execPath}`);
if (pinned) console.log(`${BANNER} .nvmrc pins ${pinned} (CI uses Node 20; local 20.x–24.x OK)`);

if (ok) {
  if (fromCursorHelper && process.platform === 'win32') {
    console.log(
      `${BANNER} OK — Cursor bundled Node is supported (20.x–24.x). For LTS parity with CI, prefer system Node or nvm/fnm → .nvmrc`,
    );
  } else {
    console.log(`${BANNER} OK — within package.json engines (20.x–24.x)`);
  }
  process.exit(0);
}

console.error(
  `${BANNER} FAIL — Node ${process.versions.node} is outside supported range 20.x–24.x`,
);
console.error(`${BANNER} Fix (pick one):`);
console.error('  • Install Node 20 LTS or 24 LTS and reopen the terminal');
if (process.platform === 'win32') {
  console.error(
    '  • Windows: put `C:\\Program Files\\nodejs` first in PATH (see START-HERE.md → Node runtime)',
  );
  console.error('  • Or use nvm-windows / fnm: `nvm use 20` or `fnm use` in repo root');
} else {
  console.error('  • macOS/Linux: `nvm use` or `fnm use` in repo root (reads .nvmrc)');
}
process.exit(1);
