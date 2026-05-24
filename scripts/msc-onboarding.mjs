#!/usr/bin/env node
/**
 * MSC interactive onboarding — env templates, sandbox choice, bootstrap
 * Powered by the MSC Media Engine
 */
import './lib/msc-load-env.mjs';
import './lib/msc-node-version-guard.mjs';

import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline/promises';
import { MSC_PROJECT_ROOT } from './lib/msc-load-env.mjs';

const BANNER = '[msc:onboard]';

function log(msg) {
  console.log(`${BANNER} ${msg}`);
}

function copyIfMissing(localRel, exampleRel) {
  const local = path.join(MSC_PROJECT_ROOT, localRel);
  const example = path.join(MSC_PROJECT_ROOT, exampleRel);
  if (!fs.existsSync(local) && fs.existsSync(example)) {
    fs.copyFileSync(example, local);
    log(`created ${localRel} from template`);
  }
}

function upsertEnvLines(filePath, updates) {
  const lines = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8').split('\n') : [];
  const map = new Map();
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    map.set(trimmed.slice(0, eq).trim(), trimmed.slice(eq + 1));
  }
  for (const [key, value] of Object.entries(updates)) {
    map.set(key, value);
  }
  const out = [...map.entries()].map(([k, v]) => `${k}=${v}`);
  fs.writeFileSync(filePath, `${out.join('\n')}\n`, 'utf8');
}

async function main() {
  log('Node guard OK');
  copyIfMissing('.env.local', '.env.example');
  copyIfMissing('examples/nextjs-payload/.env.local', 'examples/nextjs-payload/.env.example');

  const rl = readline.createInterface({ input, output });
  console.log('\nSelect sandbox:');
  console.log('  1 = nextjs-minimal (port 3000)');
  console.log('  2 = nextjs-payload (ports 3000 + 3001)');
  console.log('  3 = manual (skip env writes)');
  const choice = (await rl.question('Choice [1/2/3]: ')).trim() || '1';

  const envLocal = path.join(MSC_PROJECT_ROOT, '.env.local');
  if (choice === '1') {
    upsertEnvLines(envLocal, { PORT: '3000', MSC_DEV_PORT: '3000', PORT_PAYLOAD: '3001' });
  } else if (choice === '2') {
    const secret =
      (await rl.question('PAYLOAD_SECRET (Enter for random UUID): ')).trim() || randomUUID();
    upsertEnvLines(envLocal, {
      PORT: '3000',
      MSC_DEV_PORT: '3000',
      PORT_PAYLOAD: '3001',
      PAYLOAD_SECRET: secret,
    });
    const payloadLocal = path.join(MSC_PROJECT_ROOT, 'examples/nextjs-payload/.env.local');
    upsertEnvLines(payloadLocal, { PAYLOAD_SECRET: secret });
  } else {
    log('manual mode — no port env writes');
  }
  rl.close();

  log('running bootstrap...');
  execSync('npm run bootstrap', { cwd: MSC_PROJECT_ROOT, stdio: 'inherit', shell: true });

  console.log('\n========================================');
  console.log('  Start minimal:  npm run msc:dev:example');
  if (choice === '2') {
    console.log('  Start payload:  npm run msc:dev:payload');
  }
  console.log('========================================\n');
}

main().catch((err) => {
  console.error(`${BANNER} FAIL:`, err.message);
  process.exit(1);
});
