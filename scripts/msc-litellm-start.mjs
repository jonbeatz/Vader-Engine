#!/usr/bin/env node
/**
 * Start LiteLLM proxy in the foreground (logs visible in Cursor terminal).
 * Use --ngrok for Cursor Cloud Agent (HTTPS tunnel required).
 */
import './lib/msc-load-env.mjs';

import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { msc_hydrateVertexEnv, msc_litellmConfigPath } from './lib/msc-litellm-env.mjs';
import {
  msc_fetchNgrokHttpsUrl,
  msc_ngrokAvailable,
  msc_printCursorNgrokSettings,
  msc_resolveNgrokBin,
} from './lib/msc-ngrok-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scriptsDir = path.resolve(__dirname);
const REPO_ROOT = path.resolve(scriptsDir, '..');
const BANNER = '[msc:litellm:start]';

const args = new Set(process.argv.slice(2));
const startNgrok =
  args.has('--ngrok') ||
  process.env.MSC_LITELLM_START_NGROK === '1' ||
  process.env.MSC_LITELLM_START_NGROK === 'true';

if (startNgrok) {
  console.log(`${BANNER} clean stop before ngrok + LiteLLM start…`);
  const stop = spawnSync(process.execPath, [path.join(scriptsDir, 'msc-litellm-stop.mjs')], {
    stdio: 'inherit',
  });
  if (stop.status !== 0) {
    process.exit(stop.status ?? 1);
  }
}

const pre = spawnSync(process.execPath, [path.join(scriptsDir, 'msc-litellm-preflight.mjs')], {
  stdio: 'inherit',
});
if (pre.status !== 0) {
  process.exit(pre.status ?? 1);
}

const { port } = msc_hydrateVertexEnv();
const configPath = msc_litellmConfigPath();

spawnSync(process.execPath, [path.join(scriptsDir, 'msc-kill-dev-port.mjs'), String(port)], {
  stdio: 'inherit',
});

const childEnv = {
  ...process.env,
  PYTHONUTF8: '1',
  PYTHONIOENCODING: 'utf-8',
};
if (
  childEnv.MSC_LITELLM_MASTER_KEY?.trim() === 'your_litellm_master_key_local_only' ||
  childEnv.MSC_LITELLM_MASTER_KEY?.startsWith('your_')
) {
  delete childEnv.MSC_LITELLM_MASTER_KEY;
}

async function startNgrokTunnel() {
  if (!msc_ngrokAvailable()) {
    console.error(`${BANNER} FAIL — ngrok not found`);
    console.error(`${BANNER}       Install: https://ngrok.com/download`);
    console.error(
      `${BANNER}       Or copy ngrok.exe to google-api/ or set MSC_NGROK_BIN in .env.local`,
    );
    process.exit(1);
  }

  const ngrokBin = msc_resolveNgrokBin();
  spawnSync(process.execPath, [path.join(scriptsDir, 'msc-kill-dev-port.mjs'), '4040'], {
    stdio: 'inherit',
  });

  const ngrok = spawn(ngrokBin, ['http', String(port)], {
    env: childEnv,
    detached: true,
    stdio: 'ignore',
    shell: false,
    windowsHide: true,
  });
  ngrok.unref();

  console.log(`${BANNER} ngrok starting (${ngrokBin}) → port ${port}…`);

  const publicUrl = await msc_fetchNgrokHttpsUrl(45000);
  if (!publicUrl) {
    console.error(`${BANNER} FAIL — ngrok did not expose HTTPS URL within 45s`);
    console.error(`${BANNER}       Check http://127.0.0.1:4040 and NGROK_AUTHTOKEN in .env.local`);
    process.exit(1);
  }

  process.env.MSC_LITELLM_BASE_URL = publicUrl;
  msc_printCursorNgrokSettings(publicUrl);
  return publicUrl;
}

if (startNgrok) {
  await startNgrokTunnel();
} else {
  console.log('\n🔧 LiteLLM Proxy — localhost mode (Cloud Agent needs --ngrok)\n');
  console.log(`   Base URL: http://127.0.0.1:${port}/v1`);
  console.log('   Cloud Agent: npm run msc:litellm:start:ngrok\n');
}

console.log('🔧 LiteLLM Proxy — starting in foreground');
console.log('   Model:  vader-3-flash');
console.log('   Press Ctrl+C to stop.\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const litellm = spawn('litellm', ['--config', configPath, '--port', String(port)], {
  cwd: REPO_ROOT,
  env: childEnv,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

process.on('SIGINT', () => {
  litellm.kill('SIGINT');
});

litellm.on('close', (code) => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`${BANNER} LiteLLM stopped (exit ${code ?? 0})`);
  process.exit(code ?? 0);
});

litellm.on('error', (err) => {
  console.error(`${BANNER} FAIL — could not launch litellm: ${err.message}`);
  console.error(`${BANNER} Run: npm run msc:litellm:install-deps`);
  process.exit(1);
});
