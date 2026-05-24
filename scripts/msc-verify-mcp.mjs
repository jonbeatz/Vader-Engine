#!/usr/bin/env node
/**
 * Validate .cursor/mcp.json structure and placeholder hygiene.
 * Dual-pass: JSON placeholders vs hydrated process.env (.env.local).
 * Optional network probe: node scripts/msc-verify-mcp.mjs --probe
 */

import './lib/msc-load-env.mjs';

import { execFile } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mcpPath = join(root, '.cursor', 'mcp.json');
const probeOnline = process.argv.includes('--probe');
const jsonOutput = process.argv.includes('--json');
const COMMITTED_ENV_OK = /YOUR_|your_|CHANGE_ME|REPLACE_WITH/i;

const EXPECTED_SERVERS = [
  'payload',
  'github',
  'playwright',
  'filesystem',
  'fetch',
  'tavily',
  'firecrawl',
  'resend',
  'sequential-thinking',
  'wordpress-local',
  'neon-postgres',
  'shadcn',
  'context7',
];

/** Map mcp.json env leaf keys to process.env names (hydrated via msc-load-env). */
const MCP_ENV_KEYS = [
  'GITHUB_PERSONAL_ACCESS_TOKEN',
  'TAVILY_API_KEY',
  'FIRECRAWL_API_KEY',
  'RESEND_API_KEY',
  'WP_API_USERNAME',
  'WP_API_PASSWORD',
  'WORDPRESS_APP_PASSWORD',
];

function loadMcp() {
  const raw = readFileSync(mcpPath, 'utf8');
  return JSON.parse(raw);
}

function collectPlaceholders(obj, path = '') {
  const hits = [];
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      const p = path ? `${path}.${k}` : k;
      if (typeof v === 'string' && /YOUR_|REPLACE_WITH/i.test(v)) {
        hits.push({ path: p, value: v, envKey: k === 'env' ? null : k });
      } else if (v && typeof v === 'object') {
        const nested = collectPlaceholders(v, p);
        for (const hit of nested) {
          if (p.endsWith('.env') && typeof hit.value === 'string') {
            hit.envKey = Object.keys(obj).find((key) => obj[key] === hit.value) || hit.envKey;
          }
          hits.push(hit);
        }
      }
    }
  }
  return hits;
}

function collectPlaceholderEnvKeys(obj, prefix = '') {
  const keys = [];
  if (!obj || typeof obj !== 'object') return keys;
  if (prefix.endsWith('.env') || prefix === 'env') {
    for (const [envName, val] of Object.entries(obj)) {
      if (typeof val === 'string' && /YOUR_|REPLACE_WITH/i.test(val)) {
        keys.push({
          mcpPath: prefix ? `${prefix}.${envName}` : envName,
          envKey: envName,
          mcpValue: val,
        });
      }
    }
    return keys;
  }
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') {
      keys.push(...collectPlaceholderEnvKeys(v, p));
    }
  }
  return keys;
}

function isLiveRuntimeValue(val) {
  if (!val || typeof val !== 'string') return false;
  const t = val.trim();
  if (t.length < 4) return false;
  if (/^YOUR_|REPLACE_WITH|your_[a-z_]+$/i.test(t)) return false;
  return true;
}

function collectAbsolutePathViolations(obj, prefix = '') {
  const hits = [];
  if (!obj || typeof obj !== 'object') return hits;
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (k === 'args' && Array.isArray(v)) {
      for (const [i, arg] of v.entries()) {
        if (typeof arg !== 'string') continue;
        if (/\$\{workspaceFolder\}/.test(arg)) continue;
        if (/^[A-Za-z]:\\/.test(arg) || (arg.startsWith('/') && !arg.startsWith('//'))) {
          hits.push(`${p}[${i}] = ${arg}`);
        }
      }
    } else if (v && typeof v === 'object') {
      hits.push(...collectAbsolutePathViolations(v, p));
    }
  }
  return hits;
}

function envExampleKeys() {
  const examplePath = join(root, '.env.example');
  if (!existsSync(examplePath)) return new Set();
  const keys = new Set();
  for (const line of readFileSync(examplePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq > 0) keys.add(trimmed.slice(0, eq).trim());
  }
  return keys;
}

function collectCommittedEnvViolations(servers) {
  const hits = [];
  if (!servers || typeof servers !== 'object') return hits;
  for (const [serverName, server] of Object.entries(servers)) {
    const env = server?.env;
    if (!env || typeof env !== 'object') continue;
    for (const key of MCP_ENV_KEYS) {
      if (!(key in env)) continue;
      const val = env[key];
      if (typeof val === 'string' && !COMMITTED_ENV_OK.test(val)) {
        hits.push(`${serverName}.env.${key}`);
      }
    }
  }
  return hits;
}

async function probeOne(pkg) {
  const winArgs = ['cmd.exe', ['/c', 'npx', '-y', pkg, '--version']];
  const posixArgs = ['npx', ['-y', pkg, '--version']];
  try {
    if (process.platform === 'win32') {
      await execFileAsync(winArgs[0], winArgs[1], { timeout: 120_000, windowsHide: true });
    } else {
      await execFileAsync(posixArgs[0], posixArgs[1], { timeout: 120_000 });
    }
  } catch (e) {
    const blob = [e.stdout, e.stderr, e.message].filter(Boolean).join(' ');
    if (/running on stdio|MCP Server|@\d+\.\d+/i.test(blob)) {
      return;
    }
    throw e;
  }
}

console.log('[msc:mcp-verify] config:', mcpPath);
let failed = 0;

let config;
try {
  config = loadMcp();
} catch (e) {
  console.error('[msc:mcp-verify] FAIL invalid JSON:', e.message);
  process.exit(1);
}

const servers = Object.keys(config.mcpServers ?? {});
console.log(`[msc:mcp-verify] servers (${servers.length}):`, servers.join(', '));

for (const name of EXPECTED_SERVERS) {
  if (!servers.includes(name)) {
    console.warn(`[msc:mcp-verify] WARN missing expected server: ${name}`);
    failed += 1;
  }
}

const placeholderRows = collectPlaceholderEnvKeys(config.mcpServers);

const absolutePathViolations = collectAbsolutePathViolations(config.mcpServers);
if (absolutePathViolations.length > 0) {
  console.error('[msc:mcp-verify] FAIL absolute path in args (use $' + '{workspaceFolder}):');
  for (const hit of absolutePathViolations) console.error(`  - ${hit}`);
  failed += absolutePathViolations.length;
}

const committedEnvViolations = collectCommittedEnvViolations(config.mcpServers);
if (committedEnvViolations.length > 0) {
  console.error('[msc:mcp-verify] FAIL committed env must use YOUR_/CHANGE_ME placeholders:');
  for (const hit of committedEnvViolations) console.error(`  - ${hit}`);
  failed += committedEnvViolations.length;
}

console.log('[msc:mcp-verify] pass 1 — mcp.json schema placeholders');
if (placeholderRows.length === 0) {
  console.log('[msc:mcp-verify]   no YOUR_/REPLACE_WITH placeholders in committed mcp.json');
} else {
  for (const row of placeholderRows) {
    console.log(`[msc:mcp-verify]   ${row.mcpPath} = ${row.mcpValue}`);
  }
}

console.log('[msc:mcp-verify] pass 2 — runtime hydration (process.env after .env.local)');
let runtimeReady = 0;
let runtimeMissing = 0;

for (const envKey of MCP_ENV_KEYS) {
  const runtime = process.env[envKey];
  const mcpRow = placeholderRows.find((r) => r.envKey === envKey);
  if (isLiveRuntimeValue(runtime)) {
    runtimeReady += 1;
    if (mcpRow) {
      console.log(
        `[msc:mcp-verify]   OK ${envKey} — active in process.env (mcp.json may keep generic placeholder)`,
      );
    } else {
      console.log(`[msc:mcp-verify]   OK ${envKey} — active in process.env`);
    }
  } else if (mcpRow) {
    runtimeMissing += 1;
    console.log(
      `[msc:mcp-verify]   — ${envKey} — set value in .env.local (optional until MCP use)`,
    );
  }
}

if (runtimeReady > 0) {
  console.log(
    `[msc:mcp-verify]   ${runtimeReady} integration key(s) hydrated for script/runtime use`,
  );
}

const exampleKeys = envExampleKeys();
const missingTokenMap = MCP_ENV_KEYS.filter((key) => !exampleKeys.has(key));
if (missingTokenMap.length === 0) {
  console.log('[msc:mcp-verify] [PASS] Token map complete');
} else {
  console.error(
    `[msc:mcp-verify] FAIL token map — missing in .env.example: ${missingTokenMap.join(', ')}`,
  );
  failed += missingTokenMap.length;
}

const fsArg = config.mcpServers?.filesystem?.args?.at(-1);
if (fsArg === 'REPLACE_WITH_ABSOLUTE_PROJECT_ROOT') {
  console.warn(
    '[msc:mcp-verify] WARN filesystem path still placeholder — set to this repo absolute path in mcp.json',
  );
  failed += 1;
}

if (probeOnline) {
  console.log(
    '[msc:mcp-verify] --probe: checking npx can reach @modelcontextprotocol/server-github ...',
  );
  try {
    await probeOne('@modelcontextprotocol/server-github@latest');
    console.log('[msc:mcp-verify] --probe: npx OK (network + registry reachable)');
  } catch (e) {
    console.error('[msc:mcp-verify] --probe FAIL:', e.message?.slice(0, 200));
    failed += 1;
  }
} else {
  console.log('[msc:mcp-verify] skip npx download (pass --probe to test registry)');
  console.log(
    '[msc:mcp-verify] Cursor MCP UI may still need keys in global config; scripts use .env.local via process.env',
  );
}

console.log('');
const summary = {
  timestamp: new Date().toISOString(),
  configPath: mcpPath,
  servers: servers.length,
  failed,
  runtimeReady,
  runtimeMissing,
  absolutePathViolations,
  committedEnvViolations,
  status: failed === 0 ? 'OK' : 'FAIL',
};
console.log(
  `[msc:mcp-verify] done — ${failed === 0 ? 'structure OK' : `${failed} warning(s)`}${runtimeMissing ? ` · ${runtimeMissing} optional key(s) unset` : ''}`,
);
if (jsonOutput) {
  console.log(JSON.stringify(summary, null, 2));
}
process.exit(failed > 0 ? 1 : 0);
