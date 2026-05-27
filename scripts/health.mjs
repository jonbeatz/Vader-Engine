#!/usr/bin/env node
/**
 * MSC Jedi-Health — JSON-hookable console diagnostic engine (Roadmap §3.3)
 * Socket probes: 3000, 3001, 3002, 3010, 8080 · .env.local · .nvmrc
 * Powered by the MSC Media Engine
 */
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';

const isJsonOutput = process.argv.includes('--json');

if (isJsonOutput) {
  process.env.DOTENV_CONFIG_QUIET = 'true';
}

const { MSC_PROJECT_ROOT } = await import('./lib/msc-load-env.mjs');
await import('./lib/msc-node-version-guard.mjs');

const targetPorts = [3000, 3001, 3002, 3010, 8080];

function probeSocket(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(400);
    socket.on('connect', () => {
      socket.destroy();
      resolve('OCCUPIED');
    });
    socket.on('error', () => {
      socket.destroy();
      resolve('AVAILABLE');
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve('TIMEOUT');
    });
    socket.connect(port, '127.0.0.1');
  });
}

async function runSystemDiagnostics() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.versions.node,
    ports: await Promise.all(
      targetPorts.map(async (port) => ({
        port,
        status: await probeSocket(port),
      })),
    ),
    envLocal: fs.existsSync(path.join(MSC_PROJECT_ROOT, '.env.local')) ? 'CONFIGURED' : 'MISSING',
    nvmrc: fs.existsSync(path.join(MSC_PROJECT_ROOT, '.nvmrc'))
      ? fs.readFileSync(path.join(MSC_PROJECT_ROOT, '.nvmrc'), 'utf8').trim()
      : 'MISSING',
    sandboxes: {
      nextjsMinimal: fs.existsSync(
        path.join(MSC_PROJECT_ROOT, 'examples/nextjs-minimal/node_modules'),
      )
        ? 'INSTALLED'
        : 'NOT_INSTALLED',
      nextjsPayload: fs.existsSync(
        path.join(MSC_PROJECT_ROOT, 'examples/nextjs-payload/node_modules'),
      )
        ? 'INSTALLED'
        : 'NOT_INSTALLED',
    },
    sqlitePayloadDb: fs.existsSync(
      path.join(MSC_PROJECT_ROOT, 'examples/nextjs-payload/database/payload.db'),
    )
      ? 'PRESENT'
      : 'ABSENT',
  };

  if (isJsonOutput) {
    process.stdout.write(`${JSON.stringify({ status: 'SUCCESS', diagnostics }, null, 2)}\n`);
  } else {
    console.log('\x1b[35m=== MSC MEDIA PRO JEDI-HEALTH LOG ===\x1b[0m');
    console.table(diagnostics);
  }
}

runSystemDiagnostics().catch((err) => {
  if (isJsonOutput) {
    process.stdout.write(`${JSON.stringify({ status: 'ERROR', error: err.message }, null, 2)}\n`);
  } else {
    console.error('[msc:health] diagnostic failure:', err.message);
  }
  process.exit(1);
});
