/**
 * MSC Payload Bridge — environment-agnostic CMS initialization scaffold
 * Copy into a Payload + Next.js consumer; install @payloadcms/* deps in that project.
 */

import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import type { CollectionConfig, GlobalConfig } from 'payload';
import { buildConfig } from 'payload';
import { msc_resolveSqlitePush } from './msc-payload-sqlite-push';
import { msc_resolveDatabaseUrl } from './msc-sqlite-path';

/** Resolve public site origin from env (no hardcoded domains). */
export function msc_resolveServerUrl(): string {
  const raw =
    process.env.MSC_PUBLIC_ORIGIN ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    'http://127.0.0.1:3000';
  return raw.replace(/\/$/, '');
}

/** CSRF allowlist from env + server URL. */
export function msc_buildCsrfOrigins(serverURL: string): string[] {
  const extras = (process.env.PAYLOAD_CSRF_EXTRA_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return [serverURL, ...extras];
}

/**
 * Universal Media collection — uploads under project `media/` static dir.
 */
export const MscMediaCollection: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Accessibility text for the asset.' },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && typeof data === 'object' && !data.alt && data.filename) {
          const name = String(data.filename)
            .replace(/\.[^.]+$/i, '')
            .replace(/[-_]+/g, ' ');
          data.alt = name || 'Image';
        }
        return data;
      },
    ],
  },
};

/**
 * Generic authenticated admin users (replace fields per project).
 */
export const MscUsersCollection: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'role', type: 'select', options: ['admin', 'editor'], defaultValue: 'editor' },
  ],
};

/**
 * Subscription / lead capture collection with optional email verification hooks.
 */
export const MscSubscribersCollection: CollectionConfig = {
  slug: 'subscribers',
  labels: { singular: 'Subscriber', plural: 'Subscribers' },
  auth: {
    verify: {
      generateEmailSubject: () => 'Verify your email',
      generateEmailHTML: ({ token }) => {
        const base = msc_resolveServerUrl();
        const verifyUrl = `${base}/api/subscribers/verify?token=${encodeURIComponent(token)}`;
        return `<!DOCTYPE html><html><body style="background:#121212;color:#fff;font-family:sans-serif;padding:24px">
<div style="max-width:600px;margin:0 auto;background:#1c1c1c;padding:30px;border-radius:8px;border:1px solid #2d2d2d">
<h1 style="color:#e02b20;font-size:22px">Confirm your subscription</h1>
<p style="color:#b3b3b3;line-height:1.6"><a href="${verifyUrl}" style="color:#e02b20">Verify email</a></p>
</div></body></html>`;
      },
    },
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    {
      name: 'source',
      type: 'text',
      admin: { description: 'Capture channel: homepage, footer, api, etc.' },
    },
    { name: 'verified', type: 'checkbox', defaultValue: false },
  ],
};

/**
 * Site-wide hero + marketing globals (hero slide array pattern).
 */
export const MscSiteContentGlobal: GlobalConfig = {
  slug: 'site-content',
  label: 'Site Content',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'heroSlides',
      type: 'array',
      maxRows: 8,
      labels: { singular: 'Hero slide', plural: 'Hero slides' },
      fields: [
        { name: 'isActive', type: 'checkbox', defaultValue: true },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        { name: 'eyebrow', type: 'text' },
        { name: 'headlineLine1', type: 'text' },
        { name: 'headlineLine2', type: 'text' },
        { name: 'headlineLine3', type: 'text' },
        { name: 'sub', type: 'textarea' },
        { name: 'primaryCtaHref', type: 'text', defaultValue: '#contact' },
        { name: 'secondaryCtaHref', type: 'text', defaultValue: '#demos' },
      ],
    },
  ],
};

export type MscPayloadBridgeOptions = {
  collections?: CollectionConfig[];
  globals?: GlobalConfig[];
  /** Optional email adapter factory from @payloadcms/email-* */
  emailAdapter?: ReturnType<typeof buildConfig> extends never ? unknown : unknown;
};

/**
 * Factory: baseline Payload config aligned with MSC boilerplate conventions.
 */
export function msc_createPayloadConfig(options: MscPayloadBridgeOptions = {}) {
  const serverURL = msc_resolveServerUrl();
  const csrf = msc_buildCsrfOrigins(serverURL);

  return buildConfig({
    serverURL,
    routes: { admin: '/admin' },
    csrf,
    secret: process.env.PAYLOAD_SECRET || '',
    admin: {
      theme: 'dark',
      user: 'users',
      importMap: { baseDir: path.resolve(process.cwd()) },
    },
    editor: lexicalEditor(),
    collections: options.collections ?? [
      MscUsersCollection,
      MscMediaCollection,
      MscSubscribersCollection,
    ],
    globals: options.globals ?? [MscSiteContentGlobal],
    db: sqliteAdapter({
      push: msc_resolveSqlitePush(),
      client: {
        url: msc_resolveDatabaseUrl(),
        authToken: process.env.DATABASE_AUTH_TOKEN,
      },
      wal: true,
    }),
    ...(options.emailAdapter ? { email: options.emailAdapter } : {}),
    typescript: {
      outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
    },
  });
}

export default msc_createPayloadConfig;
