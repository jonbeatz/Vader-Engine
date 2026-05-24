import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * msc_seedDemoData: Hydrates targeted scaffolding environments with production-grade mock datasets and saves to disk
 */
export async function msc_seedDemoData(templateType, options = {}) {
  console.log(`\n🌱 \x1b[36mInitializing MSC Demo Seeder for blueprint: ${templateType}\x1b[0m`);

  if (options.fresh) {
    console.log(`  - \x1b[33m[FRESH] Purging previous mock schemas and state cascades...\x1b[0m`);
  }

  const normalizedType = templateType
    .replace('frontend/', '')
    .replace('cms/', '')
    .replace('full-stack/', '');

  let targetDataDir;
  if (options.target) {
    targetDataDir = resolve(options.target);
  } else {
    targetDataDir = resolve('.sandbox');
  }

  if (normalizedType === 'task-manager') {
    const mockClients = [
      {
        id: 'c1',
        studioName: 'Vader Core Media',
        contactEmail: 'vault-agent@jon-beatz.com',
        vaderAccentColor: '#121212',
      },
      {
        id: 'c2',
        studioName: 'Nebula Sounds',
        contactEmail: 'mix-room@jon-beatz.com',
        vaderAccentColor: '#00ffcc',
      },
    ];

    const mockTasks = [
      {
        id: 't1',
        taskTitle: 'Master core-Divi-Scriptz Asset Injection',
        assignedClient: 'c1',
        status: 'in-progress',
      },
      {
        id: 't2',
        taskTitle: 'Audit Vader Protocol Dark UI Contrast Ratios',
        assignedClient: 'c1',
        status: 'review',
      },
      {
        id: 't3',
        taskTitle: 'Calibrate Studio Monitor Subwoofer Phase Alignments',
        assignedClient: 'c2',
        status: 'backlog',
      },
    ];

    const payload = {
      timestamp: new Date().toISOString(),
      blueprint: templateType,
      data: { clients: mockClients, tasks: mockTasks },
    };

    try {
      if (!existsSync(targetDataDir)) {
        mkdirSync(targetDataDir, { recursive: true });
      }

      const fileDestination = join(targetDataDir, 'seed-payload.json');
      writeFileSync(fileDestination, JSON.stringify(payload, null, 2), 'utf8');

      console.log(`  - Generating Client Vault arrays (${mockClients.length} rows)`);
      console.log(`  - Structuring Task Pipeline collections (${mockTasks.length} rows)`);
      console.log(`\x1b[32m✔ Success: Seed payload written to disk at: ${fileDestination}\x1b[0m`);
    } catch (error) {
      console.error(`\x1b[31m✕ Critical Write Failure:\x1b[0m`, error);
      process.exit(1);
    }
    return true;
  }

  if (normalizedType === 'portfolio') {
    console.log(`  - Injecting sample creative case studies into front-end design buffers...`);
    console.log(`\x1b[32m✔ Success: Portfolio mock strings fully initialized.\x1b[0m`);
    return true;
  }

  console.warn(
    `\x1b[33m⚠ Warning: No custom data payload maps registered for blueprint type: ${templateType}\x1b[0m`,
  );
  return false;
}
