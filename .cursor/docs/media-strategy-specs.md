# Media Strategy Specifications

Multi-strategy media pipeline for Payload CMS consumers. Configuration lives in `.env` / `.env.local`; implementation in `core/msc-payload-media-hooks.ts` and `scripts/msc-media-sync.mjs`.

---

## Strategy selector

| `MSC_MEDIA_STRATEGY` | Mode | Disk layout | Sharp / WebP |
|----------------------|------|-------------|------------|
| `local` (default) | Standard local uploads | `{MSC_MEDIA_LOCAL_DIR}` (default `media/`) | WebP derivatives when enabled |
| `multi-tenant` | Isolated tenant trees | `uploads/tenant-{id}/media/` | Same as local |
| `stream-cdn` | CDN-first (stub + local cache) | `MSC_CDN_LOCAL_CACHE_DIR` + public CDN URLs | Sharp on cache; uploads target CDN adapter |

Legacy alias: `MSC_MEDIA_MODE=multi-tenant` forces multi-tenant strategy.

---

## Environment matrix

Copy from `.env.example` section **MULTI-STRATEGY MEDIA CONFIGURATION MATRIX**.

### Image optimization

| Variable | Default | Effect |
|----------|---------|--------|
| `MSC_DISABLE_SHARP_COMPRESSION` | `false` | When `true`, disables Sharp (same as `PAYLOAD_DISABLE_SHARP=true`) |
| `PAYLOAD_DISABLE_SHARP` | `false` | Payload-native fallback on thin hosts |
| `MSC_FORCE_WEBP_CONVERSION` | `true` | Adds `webp` + `thumbnail` imageSizes when Sharp is on |
| `MSC_WEBP_QUALITY` | `82` | WebP quality (1–100) |
| `MSC_MEDIA_THUMBNAIL_WIDTH` | `400` | Thumbnail width |
| `MSC_MEDIA_THUMBNAIL_HEIGHT` | `300` | Thumbnail height |

### Local strategy paths

| Variable | Default |
|----------|---------|
| `MSC_MEDIA_LOCAL_DIR` | `media` |

### Multi-tenant strategy paths

| Variable | Default |
|----------|---------|
| `MSC_MEDIA_TENANT_ROOT` | `uploads` |

Tenant id resolution order: `req.user.tenantId` → `req.user.id` → `anonymous`.

Filename prefix on upload: `tenants/{tenantId}/...`

### Stream CDN strategy

| Variable | Default | Purpose |
|----------|---------|---------|
| `MSC_CDN_PROVIDER` | `s3` | `s3` \| `r2` \| `bunny` \| custom |
| `MSC_CDN_BUCKET` | `your-bucket-name` | Object bucket |
| `MSC_CDN_PREFIX` | `media` | Key prefix inside bucket |
| `MSC_CDN_PUBLIC_BASE_URL` | `https://cdn.your-domain.com` | Public asset base |
| `MSC_CDN_LOCAL_CACHE_DIR` | `media` | Local cache before/offline upload |
| `MSC_CDN_SIGNED_UPLOAD` | `false` | Signed PUT policy flag |
| `MSC_CDN_ADAPTER` | `payload-cloud-storage` | Consumer wiring hint |

**Consumer action:** Replace filesystem `upload.staticDir` with `@payloadcms/plugin-cloud-storage` (or custom S3-compatible adapter) using `msc_buildCdnStorageStub()` values.

---

## Data shapes (Payload `media` collection)

### Core fields (all strategies)

```typescript
{
  alt: string
  filename: string
  url: string
  width?: number
  height?: number
  mimeType?: string
  sizes?: {
    thumbnail?: { url: string; width: number; height: number; mimeType?: string }
    webp?: { url: string; width: number; height: number; mimeType?: string }
  }
}
```

### Strategy metadata (sidebar, read-only)

| Field | When set |
|-------|----------|
| `msc_media_strategy` | Always on write |
| `msc_tenant_id` | `multi-tenant` |
| `msc_force_webp` | When WebP pipeline active |
| `msc_storage_target` | `stream-cdn` → `cdn` |
| `msc_cdn_public_base` | `stream-cdn` |
| `owner` | `multi-tenant` or `tenantOwner` option |

### URL rewrite rules (`afterRead`)

| Strategy | `doc.url` shape |
|----------|-----------------|
| `local` | Same-origin `/media/...` |
| `multi-tenant` | Same-origin path; filename may include `tenants/{id}/` |
| `stream-cdn` | Absolute `https://cdn.../media/...` when not already HTTP |

---

## Consumer wiring

```typescript
import { msc_createPayloadConfig } from "./core/msc-payload-bridge"
import {
  msc_buildMediaCollection,
  msc_getMediaEngineConfig,
  msc_payloadSharpConfig,
} from "./core/msc-payload-media-hooks"

const mediaConfig = msc_getMediaEngineConfig()

export default msc_createPayloadConfig({
  collections: [
    msc_buildMediaCollection({
      tenantOwner: mediaConfig.strategy === "multi-tenant",
      config: mediaConfig,
    }),
  ],
  // In payload.config.ts spread:
  // ...msc_payloadSharpConfig(mediaConfig),
})
```

---

## Maintenance sync

```bash
npm run media:sync
npm run media:sync -- --dry-run
npm run media:sync -- --with-payload   # requires payload.config.ts in consumer app
```

| Report | Meaning |
|--------|---------|
| ORPHAN on disk | File exists; no matching `media.filename` in DB |
| UNLINKED in DB | DB row exists; file missing from scanned roots |

Exit code **1** when orphans or unlinked rows are found (filesystem or compare mode).

---

## Agent checklist

1. Set `MSC_MEDIA_STRATEGY` in `.env.local` before first upload.
2. For **multi-tenant**, ensure `users` collection exposes `tenantId` or use `id` as tenant key.
3. For **stream-cdn**, implement cloud adapter in consumer — stubs do not upload alone.
4. Run `npm run media:sync -- --dry-run` after bulk file copies or deploys.
5. Keep `PAYLOAD_DISABLE_SHARP=true` on cPanel-only hosts without libvips.

---

## Related docs

- `.cursor/docs/local-ai-proxy-setup.md` — separate AI proxy ports (4000/8000)
- `core/msc-portfolio-collection.ts` — `featuredImage` → `media` relationship
- `core/msc-media-engine.ts` — video/stream portal contracts (Bunny, Presto, YouTube)
