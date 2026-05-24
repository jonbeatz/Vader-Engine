/**
 * Strategy-driven Payload media pipeline — local WebP, multi-tenant paths, CDN stubs.
 * Configure via MSC_MEDIA_STRATEGY and related env keys (.env.example).
 */

import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import type { Access, CollectionConfig, TypeWithID, Where } from 'payload';

const nodeRequire = createRequire(import.meta.url);
type SharpConstructor = typeof import('sharp');

const API_FILE_PREFIX = '/api/media/file/';

export type MscMediaStrategy = 'local' | 'multi-tenant' | 'stream-cdn';

export type MscMediaEngineConfig = {
  strategy: MscMediaStrategy;
  disableSharp: boolean;
  forceWebp: boolean;
  thumbnailWidth: number;
  thumbnailHeight: number;
  localMediaRoot: string;
  tenantUploadsRoot: string;
  cdnProvider: string;
  cdnBucket: string;
  cdnPrefix: string;
  cdnPublicBaseUrl: string;
  cdnLocalCacheDir: string;
};

function msc_envBool(raw: string | undefined, defaultValue: boolean): boolean {
  if (raw == null || raw.trim() === '') return defaultValue;
  const v = raw.trim().toLowerCase();
  return v === '1' || v === 'true' || v === 'yes';
}

function msc_envInt(raw: string | undefined, fallback: number): number {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : fallback;
}

/** Resolve active media strategy from env (MSC_MEDIA_STRATEGY primary). */
export function msc_resolveMediaStrategy(): MscMediaStrategy {
  const legacyMode = process.env.MSC_MEDIA_MODE?.trim().toLowerCase();
  if (legacyMode === 'multi-tenant') return 'multi-tenant';

  const raw = (process.env.MSC_MEDIA_STRATEGY || 'local').trim().toLowerCase();
  if (raw === 'multi-tenant' || raw === 'stream-cdn') return raw;
  return 'local';
}

/** Full media engine config snapshot for hooks, sync scripts, and docs. */
export function msc_getMediaEngineConfig(cwd = process.cwd()): MscMediaEngineConfig {
  const disableSharp =
    msc_envBool(process.env.MSC_DISABLE_SHARP_COMPRESSION, false) ||
    msc_envBool(process.env.PAYLOAD_DISABLE_SHARP, false);

  return {
    strategy: msc_resolveMediaStrategy(),
    disableSharp,
    forceWebp: msc_envBool(process.env.MSC_FORCE_WEBP_CONVERSION, true),
    thumbnailWidth: msc_envInt(process.env.MSC_MEDIA_THUMBNAIL_WIDTH, 400),
    thumbnailHeight: msc_envInt(process.env.MSC_MEDIA_THUMBNAIL_HEIGHT, 300),
    localMediaRoot: path.resolve(cwd, process.env.MSC_MEDIA_LOCAL_DIR?.trim() || 'media'),
    tenantUploadsRoot: path.resolve(cwd, process.env.MSC_MEDIA_TENANT_ROOT?.trim() || 'uploads'),
    cdnProvider: process.env.MSC_CDN_PROVIDER?.trim() || 's3',
    cdnBucket: process.env.MSC_CDN_BUCKET?.trim() || 'your-bucket-name',
    cdnPrefix: process.env.MSC_CDN_PREFIX?.trim() || 'media',
    cdnPublicBaseUrl: process.env.MSC_CDN_PUBLIC_BASE_URL?.trim() || 'https://cdn.your-domain.com',
    cdnLocalCacheDir: path.resolve(cwd, process.env.MSC_CDN_LOCAL_CACHE_DIR?.trim() || 'media'),
  };
}

export function msc_loadOptionalSharp(config?: MscMediaEngineConfig): SharpConstructor | undefined {
  const cfg = config ?? msc_getMediaEngineConfig();
  if (cfg.disableSharp) return undefined;
  try {
    return nodeRequire('sharp') as SharpConstructor;
  } catch {
    return undefined;
  }
}

export function msc_payloadSharpConfig(config?: MscMediaEngineConfig): {
  sharp?: SharpConstructor;
} {
  const sharp = msc_loadOptionalSharp(config);
  return sharp ? { sharp } : {};
}

export type MscMediaUser = {
  id?: string | number;
  role?: MscMediaOwnerRole;
  tenantId?: string | number | null;
};

export type MscMediaOwnerRole = 'master-admin' | 'admin' | 'user' | null | undefined;

export function msc_resolveTenantId(user: MscMediaUser | null | undefined): string {
  if (!user) return 'anonymous';
  if (user.tenantId != null && String(user.tenantId).length > 0) {
    return String(user.tenantId).replace(/[^a-zA-Z0-9_-]/g, '');
  }
  if (user.id != null) return String(user.id).replace(/[^a-zA-Z0-9_-]/g, '');
  return 'anonymous';
}

/**
 * Strategy B — tenant-isolated filesystem root: uploads/tenant-{id}/media/
 */
export function msc_resolveMediaStaticDir(
  config?: MscMediaEngineConfig,
  tenantId?: string,
): string {
  const cfg = config ?? msc_getMediaEngineConfig();
  if (cfg.strategy === 'multi-tenant') {
    const safe = (tenantId ?? 'anonymous').replace(/[^a-zA-Z0-9_-]/g, '');
    return path.join(cfg.tenantUploadsRoot, `tenant-${safe}`, 'media');
  }
  if (cfg.strategy === 'stream-cdn') {
    return cfg.cdnLocalCacheDir;
  }
  return cfg.localMediaRoot;
}

/**
 * Strategy C — headless object storage adapter stub (wire in consumer Payload config).
 */
export type MscCdnStorageAdapterStub = {
  kind: 'stream-cdn';
  provider: string;
  bucket: string;
  prefix: string;
  publicBaseUrl: string;
  signedUpload: boolean;
  /** Consumer implements: @payloadcms/plugin-cloud-storage or custom adapter */
  implement: 'payload-cloud-storage' | 'custom-s3-compatible';
};

export function msc_buildCdnStorageStub(config?: MscMediaEngineConfig): MscCdnStorageAdapterStub {
  const cfg = config ?? msc_getMediaEngineConfig();
  return {
    kind: 'stream-cdn',
    provider: cfg.cdnProvider,
    bucket: cfg.cdnBucket,
    prefix: cfg.cdnPrefix,
    publicBaseUrl: cfg.cdnPublicBaseUrl.replace(/\/+$/, ''),
    signedUpload: msc_envBool(process.env.MSC_CDN_SIGNED_UPLOAD, false),
    implement:
      (process.env.MSC_CDN_ADAPTER?.trim() as MscCdnStorageAdapterStub['implement']) ||
      'payload-cloud-storage',
  };
}

/** Strategy A — imageSizes with optional WebP output when Sharp is available. */
export function msc_buildImageSizesFromEnv(config?: MscMediaEngineConfig) {
  const cfg = config ?? msc_getMediaEngineConfig();
  const base = {
    name: 'thumbnail',
    width: cfg.thumbnailWidth,
    height: cfg.thumbnailHeight,
    position: 'centre' as const,
  };
  if (!cfg.forceWebp || cfg.disableSharp) {
    return [base];
  }
  return [
    {
      ...base,
      format: 'webp' as const,
      options: { quality: msc_envInt(process.env.MSC_WEBP_QUALITY, 82) },
    },
    {
      name: 'webp',
      width: cfg.thumbnailWidth,
      height: cfg.thumbnailHeight,
      position: 'centre' as const,
      format: 'webp' as const,
      options: { quality: msc_envInt(process.env.MSC_WEBP_QUALITY, 82) },
    },
  ];
}

export function msc_filenameToAltText(filename: string): string {
  return (
    filename
      .replace(/\.[^.]+$/i, '')
      .replace(/[-_]+/g, ' ')
      .trim() || 'Image'
  );
}

export function msc_ensureMediaAlt(data: Record<string, unknown>, originalDoc: unknown): void {
  const raw =
    typeof data.alt === 'string'
      ? data.alt.trim()
      : data.alt != null
        ? String(data.alt).trim()
        : '';
  if (raw.length > 0) return;

  const prev =
    originalDoc && typeof originalDoc === 'object' ? (originalDoc as { filename?: string }) : null;
  const filename =
    (typeof data.filename === 'string' && data.filename) ||
    (typeof prev?.filename === 'string' && prev.filename) ||
    '';
  data.alt = msc_filenameToAltText(filename);
}

export function msc_toRelativePublicMediaUrl(input: string, config?: MscMediaEngineConfig): string {
  if (config?.strategy === 'stream-cdn' && /^https?:\/\//i.test(input.trim())) {
    return input.trim();
  }

  let urlPath = input.trim();
  if (!urlPath) return urlPath;

  if (/^https?:\/\//i.test(urlPath)) {
    try {
      const u = new URL(urlPath);
      urlPath = u.pathname + (u.search || '');
    } catch {
      return input.trim();
    }
  } else if (urlPath.startsWith('//')) {
    try {
      const u = new URL(`https:${urlPath}`);
      urlPath = u.pathname + (u.search || '');
    } catch {
      return input.trim();
    }
  }

  const q = urlPath.indexOf('?');
  const base = q === -1 ? urlPath : urlPath.slice(0, q);
  const search = q === -1 ? '' : urlPath.slice(q);

  const apiIdx = base.indexOf(API_FILE_PREFIX);
  if (apiIdx !== -1) {
    const rest = base.slice(apiIdx + API_FILE_PREFIX.length).replace(/^\/+/, '');
    return `/media/${rest}${search}`;
  }

  if (base.startsWith('/media/')) {
    return `${base}${search}`;
  }

  if (base.startsWith('/')) {
    return `${base}${search}`;
  }

  return `/${base.replace(/^\/+/, '')}${search}`;
}

export function msc_rewriteMediaDocUrls(
  doc: Record<string, unknown>,
  config?: MscMediaEngineConfig,
): void {
  const cfg = config ?? msc_getMediaEngineConfig();

  if (cfg.strategy === 'stream-cdn' && typeof doc.url === 'string') {
    const url = doc.url.trim();
    if (!url.startsWith('http')) {
      doc.url = `${cfg.cdnPublicBaseUrl.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
    }
    return;
  }

  if (typeof doc.url === 'string' && doc.url.length > 0) {
    doc.url = msc_toRelativePublicMediaUrl(doc.url, cfg);
  }
  const sizes = doc.sizes;
  if (!sizes || typeof sizes !== 'object' || Array.isArray(sizes)) return;
  for (const key of Object.keys(sizes)) {
    const entry = (sizes as Record<string, unknown>)[key];
    if (!entry || typeof entry !== 'object') continue;
    const e = entry as Record<string, unknown>;
    if (typeof e.url === 'string' && e.url.length > 0) {
      e.url = msc_toRelativePublicMediaUrl(e.url, cfg);
    }
  }
}

function msc_ensureTenantStaticDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function msc_applyStrategyBeforeChange(
  data: Record<string, unknown>,
  req: { user?: MscMediaUser | null },
  config: MscMediaEngineConfig,
): void {
  data.msc_media_strategy = config.strategy;
  data.msc_force_webp = config.forceWebp && !config.disableSharp;

  if (config.strategy === 'multi-tenant') {
    const tenantId = msc_resolveTenantId(req.user);
    data.msc_tenant_id = tenantId;
    const prefix = `tenants/${tenantId}/`;
    if (typeof data.filename === 'string' && !data.filename.startsWith(prefix)) {
      data.filename = `${prefix}${data.filename.replace(/^\/+/, '')}`;
    }
    msc_ensureTenantStaticDir(msc_resolveMediaStaticDir(config, tenantId));
  }

  if (config.strategy === 'stream-cdn') {
    data.msc_storage_target = 'cdn';
    const stub = msc_buildCdnStorageStub(config);
    data.msc_cdn_public_base = stub.publicBaseUrl;
    data.msc_cdn_prefix = stub.prefix;
  }
}

type MscMediaRow = TypeWithID & {
  owner?: string | number | { id?: string | number } | null;
};

export function msc_buildMediaAccess(
  options: { tenantScoped?: boolean; hasAdminAccess?: (role: MscMediaOwnerRole) => boolean } = {},
): {
  read: Access;
  create: Access;
  update: Access;
  delete: Access;
} {
  const tenantScoped = options.tenantScoped ?? false;
  const hasAdmin =
    options.hasAdminAccess ??
    ((role: MscMediaOwnerRole) => role === 'master-admin' || role === 'admin');

  const read: Access = ({ req: { user } }) => {
    if (!user) return false;
    if (!tenantScoped || hasAdmin((user as MscMediaUser).role)) return true;
    return { owner: { equals: (user as MscMediaUser).id } } as Where;
  };

  const write: Access = ({ req: { user } }) => Boolean(user);

  return { read, create: write, update: read, delete: read };
}

export function msc_mediaOwnerBeforeChangeHook(
  hasAdminAccess: (role: MscMediaOwnerRole) => boolean,
) {
  return ({
    req,
    data,
    operation,
    originalDoc,
  }: {
    req: { user?: MscMediaUser | null };
    data: unknown;
    operation: string;
    originalDoc: unknown;
  }) => {
    if (!req.user || !data || typeof data !== 'object') return data;
    if (hasAdminAccess(req.user.role)) return data;

    const next = { ...(data as Record<string, unknown>) };
    if (operation === 'create') {
      next.owner = req.user.id;
      return next;
    }

    const prevOwner = (originalDoc as MscMediaRow | undefined)?.owner;
    const prevOwnerId =
      typeof prevOwner === 'object' && prevOwner !== null && 'id' in prevOwner
        ? prevOwner.id
        : prevOwner;
    next.owner = prevOwnerId ?? req.user.id;
    return next;
  };
}

/** Strategy-aware Payload media hooks. */
export function msc_defaultMediaHooks(
  options: {
    tenantOwner?: boolean;
    hasAdminAccess?: (role: MscMediaOwnerRole) => boolean;
    config?: MscMediaEngineConfig;
  } = {},
): CollectionConfig['hooks'] {
  const cfg = options.config ?? msc_getMediaEngineConfig();
  const hasAdmin =
    options.hasAdminAccess ??
    ((role: MscMediaOwnerRole) => role === 'master-admin' || role === 'admin');

  const hooks: CollectionConfig['hooks'] = {
    beforeValidate: [
      ({ data, originalDoc, req }) => {
        if (!data || typeof data !== 'object') return;
        const row = data as Record<string, unknown>;
        msc_ensureMediaAlt(row, originalDoc);
        msc_applyStrategyBeforeChange(row, req, cfg);
      },
    ],
    beforeChange: [
      ({ data, originalDoc, req }) => {
        if (!data || typeof data !== 'object') return data;
        const next = { ...data } as Record<string, unknown>;
        msc_ensureMediaAlt(next, originalDoc);
        msc_applyStrategyBeforeChange(next, req, cfg);
        return next as typeof data;
      },
    ],
    afterChange: [
      ({ doc, req }) => {
        if (cfg.strategy === 'stream-cdn' && doc && typeof doc === 'object') {
          const stub = msc_buildCdnStorageStub(cfg);
          const row = doc as Record<string, unknown>;
          if (!row.url && typeof row.filename === 'string') {
            const base = stub.publicBaseUrl.replace(/\/+$/, '');
            const key = `${stub.prefix}/${String(row.filename).replace(/^\/+/, '')}`;
            row.url = `${base}/${key}`;
          }
        }
        if (cfg.strategy === 'multi-tenant') {
          msc_ensureTenantStaticDir(
            msc_resolveMediaStaticDir(cfg, msc_resolveTenantId(req.user as MscMediaUser)),
          );
        }
        return doc;
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc && typeof doc === 'object') {
          msc_rewriteMediaDocUrls(doc as Record<string, unknown>, cfg);
        }
        return doc;
      },
    ],
  };

  if (options.tenantOwner) {
    hooks.beforeChange = [...(hooks.beforeChange ?? []), msc_mediaOwnerBeforeChangeHook(hasAdmin)];
  }

  return hooks;
}

export type MscMediaCollectionOptions = {
  staticDir?: string;
  tenantOwner?: boolean;
  imageSizes?: CollectionConfig['upload'] extends { imageSizes?: infer S } ? S : never;
  mimeTypes?: string[];
  hasAdminAccess?: (role: MscMediaOwnerRole) => boolean;
  config?: MscMediaEngineConfig;
};

export function msc_buildMediaCollection(
  options: MscMediaCollectionOptions = {},
): CollectionConfig {
  const cfg = options.config ?? msc_getMediaEngineConfig();
  const tenantId = 'anonymous';
  const staticDir = options.staticDir ?? msc_resolveMediaStaticDir(cfg, tenantId);

  if (cfg.strategy === 'multi-tenant') {
    msc_ensureTenantStaticDir(staticDir);
  }

  const access =
    options.tenantOwner || cfg.strategy === 'multi-tenant'
      ? msc_buildMediaAccess({
          tenantScoped: true,
          hasAdminAccess: options.hasAdminAccess,
        })
      : { read: () => true, create: () => true, update: () => true, delete: () => true };

  const fields: CollectionConfig['fields'] = [
    {
      name: 'alt',
      type: 'text',
      required: false,
      admin: { description: 'Accessibility and SEO.' },
    },
    {
      name: 'msc_media_strategy',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'msc_tenant_id',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'msc_force_webp',
      type: 'checkbox',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'msc_storage_target',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ];

  if (options.tenantOwner || cfg.strategy === 'multi-tenant') {
    fields.push({
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: cfg.strategy === 'multi-tenant',
      admin: { description: 'Tenant owner for uploaded media.' },
    });
  }

  const imageSizes = options.imageSizes ?? msc_buildImageSizesFromEnv(cfg);

  const upload: CollectionConfig['upload'] = {
    staticDir,
    filesRequiredOnCreate: false,
    mimeTypes: options.mimeTypes ?? ['image/*', 'video/*', 'application/pdf'],
    imageSizes,
    adminThumbnail: cfg.forceWebp && !cfg.disableSharp ? 'webp' : 'thumbnail',
  };

  return {
    slug: 'media',
    labels: { singular: 'Media', plural: 'Media' },
    access,
    hooks: msc_defaultMediaHooks({
      tenantOwner: options.tenantOwner ?? cfg.strategy === 'multi-tenant',
      hasAdminAccess: options.hasAdminAccess,
      config: cfg,
    }),
    fields,
    upload,
  };
}

export async function msc_compressDataUrlImage(
  dataUrl: string,
  maxEdge = 1280,
  jpegQuality = 0.85,
): Promise<string> {
  if (typeof window === 'undefined' || !dataUrl.startsWith('data:image/')) {
    return dataUrl;
  }
  if (dataUrl.length < 500_000) {
    return dataUrl;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const scale = Math.min(1, maxEdge / Math.max(w, h));
        const tw = Math.max(1, Math.round(w * scale));
        const th = Math.max(1, Math.round(h * scale));
        const canvas = document.createElement('canvas');
        canvas.width = tw;
        canvas.height = th;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, tw, th);
        const out = canvas.toDataURL('image/jpeg', jpegQuality);
        resolve(out.length < dataUrl.length ? out : dataUrl);
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/** @deprecated Use msc_buildImageSizesFromEnv */
export const MSC_MEDIA_THUMBNAIL_SIZES = [
  {
    name: 'thumbnail',
    width: 400,
    height: 300,
    position: 'centre' as const,
  },
] as const;
