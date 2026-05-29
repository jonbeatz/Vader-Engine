/**
 * One-shot: aggregate live env secrets into .cursor/env/Personal-Secrets-Vault.md
 * Does not print secret values to stdout. Run from repo root only.
 */
import './lib/msc-load-env.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ENV_DIR = path.join(ROOT, '.cursor/env');
const ENV_BACKUPS_DIR = path.join(ENV_DIR, 'backups');
const OUT = path.join(ENV_DIR, 'Personal-Secrets-Vault.md');

const PLACEHOLDER_RE = /^(your_|YOUR_|replace-with|sk-vader-protocol-1234$|)$/i;

function isPlaceholder(v) {
  if (v == null || String(v).trim() === '') return true;
  const s = String(v).trim();
  if (PLACEHOLDER_RE.test(s)) return true;
  if (/^your[-_]/i.test(s)) return true;
  if (s.includes('your-domain') || s.includes('yourdomain')) return true;
  if (s === 'replace-with-long-random-secret') return true;
  return false;
}

function parseEnvFile(filePath) {
  const out = {};
  if (!fs.existsSync(filePath)) return out;
  const text = fs.readFileSync(filePath, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const m = t.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!isPlaceholder(val)) out[m[1]] = val;
  }
  return out;
}

/** Keys MCP servers expect — from mcp-blueprint.json envContract + common aliases */
const MCP_ENV_CONTRACT = [
  'FIRECRAWL_API_KEY',
  'TAVILY_API_KEY',
  'GITHUB_PERSONAL_ACCESS_TOKEN',
  'WORDPRESS_APP_PASSWORD',
  'WP_API_URL',
  'WP_API_USERNAME',
  'WP_API_PASSWORD',
  'GOOGLE_CREDENTIALS_PATH',
  'GOOGLE_TOKEN_PATH',
  'DATABASE_URL',
  'POSTMAN_API_KEY',
  'RESEND_API_KEY',
  'VERCEL_API_TOKEN',
  'INSTAWP_API_URL',
  'INSTAWP_APP_PASSWORD',
  'ELEMENTOR_LICENCE_KEY',
  'WOOCOMMERCE_CONSUMER_KEY',
  'WOOCOMMERCE_CONSUMER_SECRET',
  'PAYLOAD_API_URL',
  'PAYLOAD_API_KEY',
  'UNTITLEDUI_LICENSE_KEY',
];

const MCP_CONFIG_SOURCES = [
  { label: '`.cursor/mcp.json` (project)', rel: '.cursor/mcp.json' },
  { label: '`.cursor/mcp-blueprint.json`', rel: '.cursor/mcp-blueprint.json' },
  { label: '`~/.cursor/mcp.json` (global)', rel: '~/.cursor/mcp.json' },
];

function resolveMcpConfigPath(rel) {
  if (rel.startsWith('~/')) {
    const home = process.env.USERPROFILE || process.env.HOME || '';
    return path.join(home, rel.slice(2));
  }
  return path.join(ROOT, rel);
}

function parseMcpJson(filePath, configLabel) {
  const out = {};
  if (!fs.existsSync(filePath)) return out;
  const j = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const servers = j.mcpServers || {};
  for (const [name, cfg] of Object.entries(servers)) {
    const env = cfg?.env;
    if (!env || typeof env !== 'object') continue;
    for (const [k, v] of Object.entries(env)) {
      if (typeof v === 'string' && !isPlaceholder(v)) {
        out[k] = { value: v, server: name, config: configLabel };
      }
    }
  }
  return out;
}

function mcpRuntimeFromEnv(activeFlat) {
  const out = {};
  for (const k of MCP_ENV_CONTRACT) {
    if (activeFlat[k]) out[k] = activeFlat[k];
  }
  return out;
}

function mcpFileTable(parsed) {
  const keys = Object.keys(parsed).sort();
  if (!keys.length) {
    return '_Placeholders only in this file — use **Runtime values (`.env.local`)** below._\n';
  }
  let t = '| MCP server | Key | Value |\n|------------|-----|-------|\n';
  for (const k of keys) {
    const { value, server } = parsed[k];
    t += `| ${escCell(server)} | \`${escCell(k)}\` | \`${escCell(value)}\` |\n`;
  }
  return `${t}\n`;
}

/** Full “what you use now” — .env.local + LiteLLM/GCP + project MCP; skips global-only ~/.cursor/mcp.json extras */
function buildCurrentEnvironmentFlat(active, envLocalParsed) {
  const flat = { ...envLocalParsed };
  const setupSourceRe =
    /\.env\.local|litellm_config|gcp-service-account|mcp\.json \(project\)|mcp-blueprint|MCP runtime/i;

  for (const [k, { value, sources }] of Object.entries(active)) {
    const srcList = [...sources];
    const onlyGlobal = srcList.length > 0 && srcList.every((s) => s.includes('global'));
    if (onlyGlobal && !envLocalParsed[k]) continue;
    if (envLocalParsed[k] || srcList.some((s) => setupSourceRe.test(s))) {
      flat[k] = value;
    }
  }
  return flat;
}

function buildMcpVaultSection(activeFlat) {
  let inner =
    'Sources: project `mcp.json`, `mcp-blueprint.json`, global `~/.cursor/mcp.json`, plus repo-root `.env.local` for live MCP runtime values.\n\n';

  for (const { label, rel } of MCP_CONFIG_SOURCES) {
    const fp = resolveMcpConfigPath(rel);
    const parsed = parseMcpJson(fp, label);
    const fileBody = !fs.existsSync(fp) ? '_File not found._' : mcpFileTable(parsed);
    inner += details(label, fileBody);
  }

  const runtime = mcpRuntimeFromEnv(activeFlat);
  inner += details(
    'Runtime values (repo-root `.env.local`)',
    Object.keys(runtime).length
      ? `${kvTable(runtime)}\n${envBlock(runtime)}`
      : '_No MCP contract keys in `.env.local`._',
  );

  return details('🔌 MCP server keys', inner);
}

function buildEnvFilesBackupsSection(folderData, { includeTable = false } = {}) {
  const hasBackupKeys = [1, 2, 3, 4, 5, 6].some(
    (i) => Object.keys(folderData[i].merged).length > 0,
  );
  if (!hasBackupKeys) return '';

  let inner = `${buildManifestTable(folderData)}\n\n`;
  inner += buildFolderBackupSections(folderData, { includeTable });
  return details('📁 env/backups — scan manifest', inner);
}

function parseLitellmYaml(filePath) {
  const out = {};
  if (!fs.existsSync(filePath)) return out;
  const text = fs.readFileSync(filePath, 'utf8');
  const mk = text.match(/^\s*master_key:\s*(.+)$/m);
  if (mk) {
    const v = mk[1].trim().replace(/^["']|["']$/g, '');
    if (!isPlaceholder(v)) out.MSC_LITELLM_MASTER_KEY = v;
  }
  const vp = text.match(/vertex_project:\s*["']?([^"'\n]+)["']?/);
  if (vp && !isPlaceholder(vp[1])) out.GOOGLE_CLOUD_PROJECT = vp[1].trim();
  const vl = text.match(/vertex_location:\s*["']?([^"'\n]+)["']?/);
  if (vl) out.GOOGLE_CLOUD_LOCATION = vl[1].trim();
  return out;
}

function parseGcpMeta(filePath) {
  const out = {};
  if (!fs.existsSync(filePath)) return out;
  try {
    const j = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (j.client_email) out.GCP_SERVICE_ACCOUNT_EMAIL = j.client_email;
    if (j.project_id) out.GOOGLE_CLOUD_PROJECT = out.GOOGLE_CLOUD_PROJECT || j.project_id;
  } catch {
    /* ignore */
  }
  return out;
}

function sshSummary() {
  const cfg = path.join(process.env.USERPROFILE || process.env.HOME || '', '.ssh', 'config');
  if (!fs.existsSync(cfg)) return { exists: false, hosts: [] };
  const text = fs.readFileSync(cfg, 'utf8');
  const hosts = [...text.matchAll(/^\s*Host\s+(\S+)/gm)].map((m) => m[1]).filter((h) => h !== '*');
  return { exists: true, hosts: [...new Set(hosts)] };
}

function envBlock(obj) {
  const keys = Object.keys(obj).sort();
  if (!keys.length) return '_No live values found in this section._\n';
  return `\`\`\`env\n${keys.map((k) => `${k}=${obj[k]}`).join('\n')}\n\`\`\`\n`;
}

function escCell(v) {
  return String(v ?? '—')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ');
}

function kvTable(obj, cols = ['Variable', 'Value']) {
  const keys = Object.keys(obj).sort();
  if (!keys.length) return '_No live values in this section._\n';
  let t = `| ${cols[0]} | ${cols[1]} |\n|${'-'.repeat(cols[0].length + 2)}|${'-'.repeat(cols[1].length + 2)}|\n`;
  for (const k of keys) {
    t += `| \`${escCell(k)}\` | \`${escCell(obj[k])}\` |\n`;
  }
  return `${t}\n`;
}

function details(summary, body) {
  return `<details>\n<summary>${summary}</summary>\n\n${body.trim()}\n\n</details>\n\n`;
}

/** Prefer live secrets first; template .env.example last. */
const ENV_FILE_ORDER = ['.env.local', '.env', '.env.local.example', '.env.example'];

function sortEnvFiles(files) {
  return [...files].sort((a, b) => ENV_FILE_ORDER.indexOf(a.name) - ENV_FILE_ORDER.indexOf(b.name));
}

function filesForVaultSection(files, { skipMissing = true, skipNoLiveKeys = true } = {}) {
  let list = sortEnvFiles(files);
  if (skipMissing) list = list.filter((f) => f.exists);
  if (skipNoLiveKeys) list = list.filter((f) => Object.keys(f.keys).length > 0);
  return list;
}

function fileSectionBody(f, { includeTable = false } = {}) {
  const keyCount = Object.keys(f.keys).length;
  let body = `_${keyCount} live key(s) · ${f.bytes} B on disk._\n\n`;
  if (includeTable) body += kvTable(f.keys);
  body += envBlock(f.keys);
  return body;
}

function fileDetailsSummary(f) {
  const n = Object.keys(f.keys).length;
  return `\`${f.rel}\` (${n} key${n === 1 ? '' : 's'})`;
}

function buildFolderBackupSections(
  folderData,
  { includeTable = false, folderLabel = (i) => `📂 Folder ${i}` } = {},
) {
  let out = '';
  for (let i = 1; i <= 6; i++) {
    const { files } = folderData[i];
    const listed = filesForVaultSection(files);
    if (!listed.length) continue;

    let folderBody = '';
    for (const f of listed) {
      folderBody += details(fileDetailsSummary(f), fileSectionBody(f, { includeTable }));
    }

    const labelFiles = listed.map((f) => f.name).join(', ');
    out += details(`${folderLabel(i)} — ${labelFiles}`, folderBody);
  }
  return out;
}

function buildManifestTable(folderData) {
  let t = `| Folder | Files on disk | Keys extracted |\n|--------|---------------|----------------|\n`;
  let rows = 0;
  for (let i = 1; i <= 6; i++) {
    const { files, merged } = folderData[i];
    const keyCount = Object.keys(merged).length;
    if (!keyCount) continue;
    const onDisk = files
      .filter((f) => f.exists)
      .map((f) => `\`${f.name}\` (${f.bytes} B)`)
      .join(', ');
    t += `| ${i} | ${onDisk || '—'} | ${keyCount} |\n`;
    rows++;
  }
  if (!rows) t += '| — | — | — |\n';
  return t;
}

function buildRawVault({ created, activeFlat, currentEnvFlat, folderData, ssh, invSorted }) {
  let md = `# 🔐 PERSONAL SECRETS VAULT - VADER ENGINE

**⚠️ THIS FILE CONTAINS LIVE SECRETS - STORE SAFELY, NEVER SHARE ⚠️**

| Field | Value |
|-------|-------|
| **Created** | ${created} |
| **Source Project** | Vader-Engine |
| **Backup Sources** | \`env/backups/1-6\` (optional), repo \`.env.local\`, MCP, LiteLLM, GCP |
| **Encryption** | Store on encrypted drive only |
| **Layout** | Collapsible \`<details>\` — only folders/files with extracted keys |

> **Tip:** Use **Markdown Preview** to click open sections. Operator card: \`.cursor/docs/Vader-Credentials.md\`.

---

`;

  const currentKeys = Object.keys(currentEnvFlat).length;
  if (currentKeys) {
    md += details(
      '📦 Current active environment (Vader-Engine setup)',
      `_Repo-root \`.env.local\`, LiteLLM/GCP, and project MCP runtime (excludes global-only ~/.cursor/mcp.json extras)._\n\n${envBlock(currentEnvFlat)}`,
    );
  }

  md += buildEnvFilesBackupsSection(folderData, { includeTable: false });
  md += buildMcpVaultSection(activeFlat);

  const litellmRows = [
    ['GCP Project ID', activeFlat.GOOGLE_CLOUD_PROJECT || '—'],
    ['Service Account Email', activeFlat.GCP_SERVICE_ACCOUNT_EMAIL || '—'],
    ['LiteLLM Master Key', activeFlat.MSC_LITELLM_MASTER_KEY || '—'],
    ['Vertex Location', activeFlat.GOOGLE_CLOUD_LOCATION || 'global'],
  ];
  let litellmBody = `| Setting | Value |\n|---------|-------|\n`;
  for (const [label, val] of litellmRows) {
    litellmBody += `| ${label} | \`${String(val).replace(/`/g, '\\`')}\` |\n`;
  }
  md += details('🤖 LiteLLM / Google Vertex', litellmBody);

  md += details(
    '🌐 Hosting & deployment',
    `| Setting | Value |\n|---------|-------|\n| SSH config | ${ssh.exists ? 'exists' : 'not found'} |\n| SSH Host entries | ${ssh.hosts.length ? ssh.hosts.join(', ') : '—'} |\n| Spaceship app dir | \`${activeFlat.SPACESHIP_APP_DIR || '—'}\` |\n| Spaceship node venv | \`${activeFlat.SPACESHIP_NODE_VENV_ACTIVATE || '—'}\` |\n`,
  );

  md += details(
    '📧 SMTP / email',
    `| Setting | Value |\n|---------|-------|\n| SMTP Host | \`${activeFlat.MSC_STUDIO_OUTGOING_HOST || '—'}\` |\n| SMTP Port | \`${activeFlat.MSC_STUDIO_OUTGOING_PORT || '—'}\` |\n| SMTP User | \`${activeFlat.MSC_STUDIO_OUTGOING_USER || '—'}\` |\n| SMTP Password | \`${activeFlat.MSC_STUDIO_OUTGOING_PASS || '—'}\` |\n| Resend API | \`${activeFlat.RESEND_API_KEY || '—'}\` |\n| Brevo API | \`${activeFlat.BREVO_API_KEY || '—'}\` |\n`,
  );

  md += details(
    '🗄️ Service account key files',
    `| Service | Key file | Location |\n|---------|----------|----------|\n| Google Cloud | gcp-service-account.json | \`config/\` |\n| Google API copy | gcp_key.json | \`google-api/\` |\n`,
  );

  md += details(
    '🔒 Recovery notes',
    `- GCP key file: \`config/gcp-service-account.json\`\n- SSH keys: \`~/.ssh/\` directory backup\n- Ngrok auth: \`${activeFlat.NGROK_AUTHTOKEN || 'not in scanned env'}\`\n- LiteLLM: \`config/litellm_config.yaml\`, \`google-api/litellm_config.yaml\``,
  );

  let invBody = `| Key Name | Source | Value (redacted) |\n|----------|--------|------------------|\n`;
  for (const [k, { sources }] of invSorted) {
    const src = [...new Set(sources)].join('; ') || '—';
    invBody += `| ${k} | ${src} | \`[EXISTS]\` |\n`;
  }
  if (!invSorted.length) invBody += '| _none_ | — | — |\n';
  md += details('📋 Master key inventory', invBody);

  md += `---

*Last updated: ${created}* · Regenerate: \`node scripts/msc-build-personal-secrets-vault.mjs\`

*⚠️ DESTROY THIS FILE IF NO LONGER NEEDED ⚠️*
`;

  return md;
}

function mergeInto(store, parsed, sourceLabel) {
  for (const [k, v] of Object.entries(parsed)) {
    if (isPlaceholder(v)) continue;
    if (!store[k]) store[k] = { value: v, sources: new Set() };
    store[k].sources.add(sourceLabel);
    store[k].value = v;
  }
}

const active = {};
const envLocalParsed = parseEnvFile(path.join(ROOT, '.env.local'));
mergeInto(active, envLocalParsed, '.env.local');

for (const { label, rel } of MCP_CONFIG_SOURCES) {
  const parsed = parseMcpJson(resolveMcpConfigPath(rel), label);
  for (const [k, { value }] of Object.entries(parsed)) {
    if (!active[k]) active[k] = { value, sources: new Set() };
    active[k].sources.add(`${label} (MCP config)`);
    active[k].value = value;
  }
}
for (const [k, v] of Object.entries(mcpRuntimeFromEnv(envLocalParsed))) {
  if (!active[k]) active[k] = { value: v, sources: new Set() };
  active[k].sources.add('`.env.local` (MCP runtime)');
  active[k].value = v;
}

for (const rel of ['config/litellm_config.yaml', 'google-api/litellm_config.yaml']) {
  const litellm = parseLitellmYaml(path.join(ROOT, rel));
  mergeInto(active, litellm, rel);
}

mergeInto(
  active,
  parseGcpMeta(path.join(ROOT, 'config/gcp-service-account.json')),
  'config/gcp-service-account.json',
);

const ENV_CANDIDATES = ['.env.local', '.env', '.env.example', '.env.local.example'];

/** @type {Record<number, { files: Array<{ name: string, rel: string, exists: boolean, bytes: number, keys: Record<string,string> }>, merged: Record<string, { value: string, sources: Set<string> }> }>} */
const folderData = {};

for (let i = 1; i <= 6; i++) {
  const dir = path.join(ENV_BACKUPS_DIR, String(i));
  const merged = {};
  const files = [];

  for (const name of ENV_CANDIDATES) {
    const fp = path.join(dir, name);
    const rel = `env/backups/${i}/${name}`;
    const exists = fs.existsSync(fp);
    const bytes = exists ? fs.statSync(fp).size : 0;
    const keys = exists ? parseEnvFile(fp) : {};
    files.push({ name, rel, exists, bytes, keys });
    mergeInto(merged, keys, rel);
  }

  folderData[i] = { files, merged };
}

const ssh = sshSummary();
const created = new Date().toISOString().slice(0, 10);

const activeFlat = {};
for (const [k, { value }] of Object.entries(active)) activeFlat[k] = value;

const currentEnvFlat = buildCurrentEnvironmentFlat(active, envLocalParsed);

const inventory = new Map();
for (const [k, { sources }] of Object.entries(active)) {
  inventory.set(k, { sources: [...sources], exists: true });
}
for (let i = 1; i <= 6; i++) {
  for (const [k, { sources }] of Object.entries(folderData[i].merged)) {
    if (!inventory.has(k)) {
      inventory.set(k, { sources: [...sources], exists: true });
    } else {
      for (const s of sources) inventory.get(k).sources.push(s);
    }
  }
}

const invSorted = [...inventory.entries()].sort((a, b) => a[0].localeCompare(b[0]));

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(
  OUT,
  buildRawVault({
    created,
    activeFlat,
    currentEnvFlat,
    folderData,
    ssh,
    invSorted,
  }),
  'utf8',
);

const folderScan = {};
for (let i = 1; i <= 6; i++) {
  folderScan[i] = folderData[i].files.map((f) => ({
    file: f.name,
    exists: f.exists,
    bytes: f.bytes,
    liveKeys: Object.keys(f.keys).length,
  }));
}

const stats = {
  out: OUT,
  activeKeys: Object.keys(activeFlat).length,
  currentEnvKeys: Object.keys(currentEnvFlat).length,
  inventoryKeys: invSorted.length,
  mcpRuntimeKeys: Object.keys(mcpRuntimeFromEnv(activeFlat)).length,
  envLocalExists: fs.existsSync(path.join(ROOT, '.env.local')),
  folderScan,
};

console.log(JSON.stringify(stats));
