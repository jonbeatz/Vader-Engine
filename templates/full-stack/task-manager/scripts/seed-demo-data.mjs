/**
 * Hydrates local SQLite with demo clients + tasks via root payload.config.ts.
 * Idempotent by default; use --fresh or npm run seed:fresh to reset.
 */
import { existsSync, mkdirSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { getPayload } from 'payload';
import { loadEnv } from 'payload/node';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'payload.config.ts');

const isFresh = process.argv.includes('--fresh') || process.env.MSC_SEED_FRESH === '1';
const isSkip = process.argv.includes('--skip') || process.env.MSC_SKIP_SEED === '1';

const MOCK_CLIENTS = [
  {
    studioName: 'Vader Core Media',
    contactEmail: 'vault-agent@jon-beatz.com',
    vaderAccentColor: '#121212',
  },
  {
    studioName: 'Nebula Sounds',
    contactEmail: 'mix-room@jon-beatz.com',
    vaderAccentColor: '#00ffcc',
  },
];

/** clientIndex maps into MOCK_CLIENTS after insert */
const MOCK_TASKS = [
  {
    taskTitle: 'Master core-Divi-Scriptz Asset Injection',
    clientIndex: 0,
    status: 'in-progress',
  },
  {
    taskTitle: 'Audit Vader Protocol Dark UI Contrast Ratios',
    clientIndex: 0,
    status: 'review',
  },
  {
    taskTitle: 'Calibrate Studio Monitor Subwoofer Phase Alignments',
    clientIndex: 1,
    status: 'backlog',
  },
];

function msc_log(msg) {
  console.log(`[msc:seed] ${msg}`);
}

function msc_purgeSqliteFiles() {
  const dbDir = path.join(ROOT, 'database');
  for (const name of ['payload.db', 'payload.db-wal', 'payload.db-shm']) {
    const filePath = path.join(dbDir, name);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
      msc_log(`removed ${path.relative(ROOT, filePath)}`);
    }
  }
  if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
  }
}

async function msc_loadPayload() {
  if (!existsSync(CONFIG_PATH)) {
    throw new Error(`payload.config.ts not found at ${CONFIG_PATH}`);
  }

  await loadEnv({ cwd: ROOT });

  const configUrl = pathToFileURL(CONFIG_PATH).href;
  const configModule = await import(configUrl);
  const config = configModule.default;

  return getPayload({ config });
}

async function msc_seedCollections(payload) {
  const clientIds = [];

  for (const data of MOCK_CLIENTS) {
    const doc = await payload.create({
      collection: 'msc-clients',
      data,
    });
    clientIds.push(doc.id);
  }

  for (const task of MOCK_TASKS) {
    await payload.create({
      collection: 'msc-tasks',
      data: {
        taskTitle: task.taskTitle,
        assignedClient: clientIds[task.clientIndex],
        status: task.status,
      },
    });
  }
}

async function main() {
  if (isSkip) {
    msc_log('skipped (MSC_SKIP_SEED=1 or --skip)');
    return;
  }

  if (isFresh) {
    msc_log('fresh mode — resetting local SQLite vault');
    msc_purgeSqliteFiles();
  }

  const payload = await msc_loadPayload();

  try {
    const existing = await payload.find({
      collection: 'msc-clients',
      limit: 1,
      depth: 0,
    });

    if (existing.totalDocs > 0 && !isFresh) {
      msc_log(
        `demo data already present (${existing.totalDocs}+ client rows) — skipping. Run: npm run seed:fresh`,
      );
      return;
    }

    if (isFresh && existing.totalDocs > 0) {
      const tasks = await payload.find({
        collection: 'msc-tasks',
        limit: 500,
        depth: 0,
        pagination: false,
      });
      for (const doc of tasks.docs) {
        await payload.delete({ collection: 'msc-tasks', id: doc.id });
      }

      const clients = await payload.find({
        collection: 'msc-clients',
        limit: 500,
        depth: 0,
        pagination: false,
      });
      for (const doc of clients.docs) {
        await payload.delete({ collection: 'msc-clients', id: doc.id });
      }
    }

    msc_log(`inserting ${MOCK_CLIENTS.length} clients and ${MOCK_TASKS.length} tasks`);
    await msc_seedCollections(payload);
    msc_log('demo vault ready — open /admin to inspect msc-clients and msc-tasks');
  } finally {
    if (typeof payload.close === 'function') {
      await payload.close();
    }
  }
}

main().catch((err) => {
  console.error('[msc:seed] failed:', err?.message || err);
  process.exit(1);
});
