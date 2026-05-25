import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import { MscUsers, VaderProjects, VaderStackItems } from './collections';

if (process.env.NODE_ENV === 'production' && !process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is required in production');
}

const dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(dirname, 'database/payload.db');

function msc_resolveSandboxSqlitePush(): boolean {
  if (process.env.PAYLOAD_DB_PUSH === 'false') return false;
  if (process.env.PAYLOAD_DB_PUSH === 'true') return true;
  if (process.env.NODE_ENV === 'production') return false;
  return true;
}

const payloadSecret =
  process.env.PAYLOAD_SECRET ||
  (process.env.NODE_ENV === 'production' ? '' : 'CHANGE_ME_PAYLOAD_SECRET');

export default buildConfig({
  admin: {
    user: MscUsers.slug,
  },
  collections: [MscUsers, VaderProjects, VaderStackItems],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    push: msc_resolveSandboxSqlitePush(),
    client: {
      url: process.env.DATABASE_URI || `file:${dbPath}`,
    },
  }),
  serverURL: process.env.MSC_PUBLIC_ORIGIN || 'http://127.0.0.1:{{PORT}}',
});
