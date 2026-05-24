/**
 * msc-sqlite-collection.ts — Payload SQLite collection pattern stub
 * Studio Dark: use msc- prefixes in admin UI customizations only
 */
import type { CollectionConfig } from 'payload';

export const MscSqliteCollection: CollectionConfig = {
  slug: 'msc-vault',
  labels: { singular: 'MSC Vault', plural: 'MSC Vault Items' },
  fields: [{ name: 'title', type: 'text', required: true }],
};
