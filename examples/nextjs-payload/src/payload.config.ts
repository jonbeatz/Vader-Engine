import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import { MediaVault } from './collections/MediaVault';
import { Users } from './collections/Users';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const exampleRoot = path.resolve(dirname, '..');
const dbPath = path.resolve(exampleRoot, 'database/payload.db');

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, MediaVault],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME_PAYLOAD_SECRET',
  typescript: {
    outputFile: path.resolve(exampleRoot, 'src/payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || `file:${dbPath}`,
    },
  }),
  serverURL: process.env.MSC_PUBLIC_ORIGIN || 'http://127.0.0.1:3001',
});
