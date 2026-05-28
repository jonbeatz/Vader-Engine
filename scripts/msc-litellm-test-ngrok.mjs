#!/usr/bin/env node
/**
 * Test LiteLLM (local) + ngrok tunnel — prints Cursor settings for Cloud Agent.
 */
import './lib/msc-load-env.mjs';

import process from 'node:process';
import { msc_hydrateVertexEnv, msc_litellmAuthHeaders } from './lib/msc-litellm-env.mjs';
import {
  msc_fetchNgrokHttpsUrl,
  msc_ngrokAvailable,
  msc_printCursorNgrokSettings,
  msc_resolveNgrokBin,
} from './lib/msc-ngrok-utils.mjs';

const BANNER = '[msc:litellm:test-ngrok]';
let failed = 0;

function pass(msg) {
  console.log(`${BANNER} OK — ${msg}`);
}

function fail(msg) {
  failed += 1;
  console.error(`${BANNER} FAIL — ${msg}`);
}

console.log('\n🔍 Testing LiteLLM + ngrok for Cursor Cloud Agent\n');

const { port } = msc_hydrateVertexEnv();
const localV1 = `http://127.0.0.1:${port}/v1`;
const headers = msc_litellmAuthHeaders();

try {
  const res = await fetch(`${localV1}/models`, {
    headers,
    signal: AbortSignal.timeout(5000),
  });
  if (res.ok) {
    const body = await res.json();
    const ids = (body.data || []).map((m) => m.id);
    pass(`LiteLLM on port ${port} — models: ${ids.join(', ') || '(none)'}`);
    if (!ids.includes('vader-3-flash')) {
      fail('vader-3-flash not in model list');
    }
  } else {
    fail(`LiteLLM HTTP ${res.status} — run: npm run msc:litellm:start:ngrok`);
  }
} catch {
  fail(`LiteLLM not reachable at ${localV1} — run: npm run msc:litellm:start:ngrok`);
}

if (!msc_ngrokAvailable()) {
  fail(
    `ngrok not found (tried: ${msc_resolveNgrokBin()}) — install ngrok and add to PATH, or set MSC_NGROK_BIN`,
  );
  console.error(`${BANNER}     https://ngrok.com/download · or: choco install ngrok`);
} else {
  pass(`ngrok binary: ${msc_resolveNgrokBin()}`);
}

const ngrokUrl = await msc_fetchNgrokHttpsUrl(5000);
if (!ngrokUrl) {
  fail('ngrok tunnel not running — start with: npm run msc:litellm:start:ngrok');
} else {
  pass(`ngrok HTTPS: ${ngrokUrl}`);
  const remoteV1 = msc_printCursorNgrokSettings(ngrokUrl);

  try {
    const res = await fetch(`${remoteV1}/models`, {
      headers,
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) {
      pass('Remote ngrok /v1/models reachable');
    } else {
      fail(`Remote ngrok HTTP ${res.status} — tunnel may be stale; restart ngrok`);
    }
  } catch (err) {
    fail(`Remote ngrok unreachable: ${err.message}`);
  }
}

console.log('');
if (failed > 0) {
  console.error(`${BANNER} FAIL (${failed} check(s))`);
  process.exit(1);
}

console.log(
  `${BANNER} PASS — configure Cursor with the HTTPS URL above, then test Agent with vader-3-flash`,
);
process.exit(0);
