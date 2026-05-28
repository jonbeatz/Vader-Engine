import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const payloadRoot = path.join(root, 'examples/nextjs-payload');
const payloadSecret = process.env.PAYLOAD_SECRET || 'ci-e2e-placeholder-secret-min-32-chars!!';
const payloadDbPath = path.join(payloadRoot, 'database/payload-e2e.db');

export default defineConfig({
  testDir: path.join(root, 'e2e'),
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  timeout: 60_000,
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
  webServer: [
    {
      command: 'npm run msc:dev:dashboard',
      cwd: root,
      url: 'http://127.0.0.1:3010',
      reuseExistingServer: false,
      timeout: 120_000,
    },
    {
      command: 'npm run msc:dev:example',
      cwd: root,
      url: 'http://127.0.0.1:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'npm run msc:dev:payload',
      cwd: root,
      url: 'http://127.0.0.1:3001',
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      env: {
        ...process.env,
        PAYLOAD_SECRET: payloadSecret,
        DATABASE_URI: process.env.DATABASE_URI || `file:${payloadDbPath}`,
        MSC_PUBLIC_ORIGIN: 'http://127.0.0.1:3001',
      },
    },
  ],
});
