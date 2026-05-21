#!/usr/bin/env node
/**
 * Multi-strategy media filesystem ↔ database reconciliation.
 * Scans disk based on MSC_MEDIA_STRATEGY; optional Payload DB compare with --with-payload.
 *
 * Usage:
 *   node scripts/msc-core-sync.mjs
 *   node scripts/msc-core-sync.mjs --dry-run
 *   node scripts/msc-core-sync.mjs --with-payload
 */

import './lib/msc-load-env.mjs'

import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const IMAGE_EXT = new Set([
  ".apng",
  ".avif",
  ".bmp",
  ".gif",
  ".ico",
  ".jpg",
  ".jpeg",
  ".png",
  ".svg",
  ".webp",
])

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

function envBool(raw, fallback = false) {
  if (raw == null || String(raw).trim() === "") return fallback
  const v = String(raw).trim().toLowerCase()
  return v === "1" || v === "true" || v === "yes"
}

function resolveStrategy() {
  if ((process.env.MSC_MEDIA_MODE || "").trim().toLowerCase() === "multi-tenant") {
    return "multi-tenant"
  }
  const raw = (process.env.MSC_MEDIA_STRATEGY || "local").trim().toLowerCase()
  if (raw === "multi-tenant" || raw === "stream-cdn") return raw
  return "local"
}

function getMediaConfig() {
  const strategy = resolveStrategy()
  return {
    strategy,
    localMediaRoot: path.resolve(ROOT, process.env.MSC_MEDIA_LOCAL_DIR?.trim() || "media"),
    tenantUploadsRoot: path.resolve(ROOT, process.env.MSC_MEDIA_TENANT_ROOT?.trim() || "uploads"),
    cdnLocalCacheDir: path.resolve(
      ROOT,
      process.env.MSC_CDN_LOCAL_CACHE_DIR?.trim() || "media",
    ),
  }
}

/** Return list of absolute directories to scan for image files. */
function resolveScanRoots(cfg) {
  if (cfg.strategy === "multi-tenant") {
    const roots = []
    const base = cfg.tenantUploadsRoot
    return fs
      .readdir(base, { withFileTypes: true })
      .then((entries) => {
        for (const ent of entries) {
          if (ent.isDirectory() && ent.name.startsWith("tenant-")) {
            roots.push(path.join(base, ent.name, "media"))
          }
        }
        if (roots.length === 0) roots.push(path.join(base, "tenant-anonymous", "media"))
        return roots
      })
      .catch(() => [path.join(base, "tenant-anonymous", "media")])
  }
  if (cfg.strategy === "stream-cdn") {
    return Promise.resolve([cfg.cdnLocalCacheDir])
  }
  return Promise.resolve([cfg.localMediaRoot])
}

async function walkImages(dir, acc = []) {
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  }
  catch {
    return acc
  }
  for (const ent of entries) {
    const abs = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      await walkImages(abs, acc)
      continue
    }
    const ext = path.extname(ent.name).toLowerCase()
    if (IMAGE_EXT.has(ext)) {
      acc.push(abs)
    }
  }
  return acc
}

function relKey(abs, root) {
  return path.relative(root, abs).split(path.sep).join("/")
}

async function loadPayloadFilenames() {
  const configPath = process.env.PAYLOAD_CONFIG_PATH
    ? path.resolve(ROOT, process.env.PAYLOAD_CONFIG_PATH)
    : path.join(ROOT, "payload.config.ts")

  try {
    await fs.access(configPath)
  }
  catch {
    return null
  }

  try {
    const { getPayload } = await import("payload")
    const { loadEnv } = await import("payload/node")
    await loadEnv({ cwd: ROOT })
    const payload = await getPayload({ config: (await import(configPath)).default })
    const result = await payload.find({
      collection: "media",
      limit: 5000,
      depth: 0,
      pagination: false,
    })
    const names = new Set()
    for (const doc of result.docs) {
      if (doc?.filename) names.add(String(doc.filename))
    }
    return names
  }
  catch (e) {
    console.warn("[msc:core-sync] Payload compare skipped:", e?.message || e)
    return null
  }
}

async function main() {
  const dryRun = process.argv.includes("--dry-run") || envBool(process.env.MSC_MEDIA_SYNC_DRY_RUN)
  const withPayload = process.argv.includes("--with-payload")
  const cfg = getMediaConfig()

  console.log("[msc:core-sync] strategy:", cfg.strategy)
  console.log("[msc:core-sync] dry-run:", dryRun)

  const roots = await resolveScanRoots(cfg)
  console.log("[msc:core-sync] scan roots:")
  for (const r of roots) {
    console.log("  -", r)
  }

  const diskFiles = []
  for (const root of roots) {
    const files = await walkImages(root)
    for (const abs of files) {
      diskFiles.push({ abs, root, key: relKey(abs, root) })
    }
  }

  console.log(`[msc:core-sync] disk images found: ${diskFiles.length}`)

  let dbNames = null
  if (withPayload) {
    dbNames = await loadPayloadFilenames()
    if (dbNames) {
      console.log(`[msc:core-sync] database media rows: ${dbNames.size}`)
    }
  }

  const orphansOnDisk = []
  const missingOnDisk = []

  if (dbNames) {
    const diskKeys = new Set(diskFiles.map((f) => f.key))
    for (const f of diskFiles) {
      if (!dbNames.has(f.key) && !dbNames.has(path.basename(f.key))) {
        orphansOnDisk.push(f.key)
      }
    }
    for (const name of dbNames) {
      const found = [...diskKeys].some(
        (k) => k === name || k.endsWith(`/${name}`) || path.basename(k) === name,
      )
      if (!found) missingOnDisk.push(name)
    }
  }
  else {
    console.log("[msc:core-sync] filesystem-only mode (pass --with-payload when Payload app is linked)")
  }

  if (orphansOnDisk.length > 0) {
    console.log("\n[msc:core-sync] ORPHAN files on disk (no DB row):")
    for (const k of orphansOnDisk.slice(0, 50)) {
      console.log("  +", k)
    }
    if (orphansOnDisk.length > 50) {
      console.log(`  ... and ${orphansOnDisk.length - 50} more`)
    }
  }

  if (missingOnDisk.length > 0) {
    console.log("\n[msc:core-sync] UNLINKED DB rows (file missing on disk):")
    for (const k of missingOnDisk.slice(0, 50)) {
      console.log("  -", k)
    }
    if (missingOnDisk.length > 50) {
      console.log(`  ... and ${missingOnDisk.length - 50} more`)
    }
  }

  if (orphansOnDisk.length === 0 && missingOnDisk.length === 0) {
    console.log("\n[msc:core-sync] no orphans/unlinked items detected in compared scope.")
  }

  if (dryRun) {
    console.log("\n[msc:core-sync] dry-run complete — no writes performed.")
  }

  const exitCode = orphansOnDisk.length + missingOnDisk.length > 0 ? 1 : 0
  process.exit(exitCode)
}

main().catch((e) => {
  console.error("[msc:core-sync] fatal:", e)
  process.exit(1)
})
