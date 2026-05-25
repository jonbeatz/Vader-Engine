/**
 * Seeds vader-projects + vader-stack from vaderlabz.com baseline content.
 */
import { existsSync, mkdirSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { getPayload } from 'payload';
import { loadEnv } from 'payload/node';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'payload.config.ts');

if (process.env.ENABLE_PAYLOAD !== 'true') {
  console.log('[msc:seed] ENABLE_PAYLOAD≠true — no database connection attempted');
  process.exit(0);
}

const isFresh = process.argv.includes('--fresh') || process.env.MSC_SEED_FRESH === '1';
const isSkip = process.argv.includes('--skip') || process.env.MSC_SKIP_SEED === '1';

const MOCK_PROJECTS = [
  {
    title: 'Boilerplate',
    description:
      'Cursor-native full-stack boilerplate with a 61-point self-grader, isolated Next.js / Payload / WordPress sandboxes, Vader Protocol UI shield, Biome linting, and MCP-ready agent workflows.',
    status: 'active',
    githubUrl: 'https://github.com/jonbeatz/Boilerplate',
    tags: [
      { label: 'Next.js' },
      { label: 'Payload CMS' },
      { label: 'WordPress' },
      { label: 'Biome' },
      { label: 'MCP' },
    ],
    sortOrder: 1,
  },
  {
    title: 'Node-Launcher',
    description:
      'Vader Project Engine — Station Prime. Full-stack Electron launcher with renderer sandboxing, SQLite, and forge workflow automation.',
    status: 'active',
    githubUrl: 'https://github.com/jonbeatz/Node-Launcher',
    tags: [
      { label: 'Electron' },
      { label: 'Node.js' },
      { label: 'SQLite' },
      { label: 'Next.js' },
    ],
    sortOrder: 2,
  },
  {
    title: 'MSC-Projectz',
    description:
      'Projects management app and personal dashboard for tracking builds, experiments, and dev progress across the VaderLabz ecosystem.',
    status: 'building',
    githubUrl: 'https://github.com/jonbeatz/MSC-Projectz',
    tags: [{ label: 'Node.js' }, { label: 'React' }, { label: 'TypeScript' }],
    sortOrder: 3,
  },
];

const MOCK_STACK = [
  'Next.js',
  'Node.js',
  'React',
  'TypeScript',
  'Payload CMS',
  'WordPress',
  'SQLite',
  'Electron',
  'Biome',
  'MCP Workflows',
  'AI/LLM',
  'Cursor',
  'Vitest',
  'Playwright',
  'Docker',
  'GitHub Actions',
].map((label, index) => ({ label: `// ${label}`, sortOrder: index + 1 }));

function msc_log(msg) {
  console.log(`[msc:seed] ${msg}`);
}

function msc_purgeSqliteFiles() {
  const dbDir = path.join(ROOT, 'database');
  for (const name of ['payload.db', 'payload.db-wal', 'payload.db-shm']) {
    const filePath = path.join(dbDir, name);
    if (existsSync(filePath)) unlinkSync(filePath);
  }
  if (!existsSync(dbDir)) mkdirSync(dbDir, { recursive: true });
}

async function main() {
  if (isSkip) {
    msc_log('skipped (MSC_SKIP_SEED=1 or --skip)');
    return;
  }

  if (isFresh) msc_purgeSqliteFiles();

  await loadEnv({ cwd: ROOT });
  const configModule = await import(pathToFileURL(CONFIG_PATH).href);
  const payload = await getPayload({ config: configModule.default });

  try {
    const existing = await payload.find({ collection: 'vader-projects', limit: 1, depth: 0 });
    if (existing.totalDocs > 0 && !isFresh) {
      msc_log('demo data present — skipping. Run: npm run seed:fresh');
      return;
    }

    if (isFresh && existing.totalDocs > 0) {
      for (const col of ['vader-stack', 'vader-projects']) {
        const rows = await payload.find({ collection: col, limit: 500, depth: 0, pagination: false });
        for (const doc of rows.docs) {
          await payload.delete({ collection: col, id: doc.id });
        }
      }
    }

    for (const data of MOCK_PROJECTS) {
      await payload.create({ collection: 'vader-projects', data });
    }
    for (const data of MOCK_STACK) {
      await payload.create({ collection: 'vader-stack', data });
    }

    msc_log(`seeded ${MOCK_PROJECTS.length} projects and ${MOCK_STACK.length} stack items`);
  } finally {
    if (typeof payload.close === 'function') await payload.close();
  }
}

main().catch((err) => {
  console.error('[msc:seed] failed:', err?.message || err);
  process.exit(1);
});
