/**
 * Resolve LiteLLM + Vertex env for proxy scripts (no secrets logged).
 */
import fs from 'node:fs';
import path from 'node:path';
import { MSC_PROJECT_ROOT } from './msc-load-env.mjs';

const FALLBACK_CREDENTIAL_CANDIDATES = [
  'config/gcp-service-account.json',
  'google-api/gcp_key.json',
];

export function msc_resolveLitellmPort() {
  const raw = process.env.MSC_LITELLM_PORT?.trim() || '4000';
  const port = Number(raw);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid MSC_LITELLM_PORT: ${raw}`);
  }
  return port;
}

export function msc_litellmConfigPath() {
  const custom = process.env.MSC_LITELLM_CONFIG?.trim();
  if (custom) {
    return path.isAbsolute(custom) ? custom : path.resolve(MSC_PROJECT_ROOT, custom);
  }
  return path.resolve(MSC_PROJECT_ROOT, 'config/litellm_config.yaml');
}

/** Ensure GCP credential path exists; set process.env for litellm child. */
export function msc_hydrateVertexEnv() {
  let creds = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (creds && !path.isAbsolute(creds)) {
    creds = path.resolve(MSC_PROJECT_ROOT, creds);
    process.env.GOOGLE_APPLICATION_CREDENTIALS = creds;
  }

  if (!creds || !fs.existsSync(creds)) {
    for (const rel of FALLBACK_CREDENTIAL_CANDIDATES) {
      const candidate = path.resolve(MSC_PROJECT_ROOT, rel);
      if (fs.existsSync(candidate)) {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = candidate;
        creds = candidate;
        break;
      }
    }
  }

  if (
    !process.env.GOOGLE_CLOUD_PROJECT?.trim() ||
    process.env.GOOGLE_CLOUD_PROJECT === 'your-gcp-project-id'
  ) {
    if (creds && fs.existsSync(creds)) {
      try {
        const json = JSON.parse(fs.readFileSync(creds, 'utf8'));
        if (json.project_id) {
          process.env.GOOGLE_CLOUD_PROJECT = json.project_id;
        }
      } catch {
        /* ignore parse errors — preflight will report */
      }
    }
  }

  if (!process.env.GOOGLE_CLOUD_LOCATION?.trim()) {
    process.env.GOOGLE_CLOUD_LOCATION = 'global';
  }

  if (!process.env.LITELLM_DROP_PARAMS?.trim()) {
    process.env.LITELLM_DROP_PARAMS = 'true';
  }

  msc_stripPayloadDatabaseUrlFromLitellmEnv();

  return {
    credentialsPath: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: process.env.GOOGLE_CLOUD_LOCATION,
    port: msc_resolveLitellmPort(),
    configPath: msc_litellmConfigPath(),
  };
}

/**
 * Root .env.example sets DATABASE_URL for Payload (file:./…sqlite).
 * LiteLLM Prisma expects postgresql:// — strip unless operator sets MSC_LITELLM_DATABASE_URL.
 */
export function msc_stripPayloadDatabaseUrlFromLitellmEnv() {
  const litellmDb = process.env.MSC_LITELLM_DATABASE_URL?.trim();
  if (litellmDb) {
    process.env.DATABASE_URL = litellmDb;
    return;
  }
  delete process.env.DATABASE_URL;
  delete process.env.DATABASE_HOST;
  delete process.env.DATABASE_USER;
  delete process.env.DATABASE_PASSWORD;
  delete process.env.DATABASE_NAME;
  delete process.env.DATABASE_SCHEMA;
}

export function msc_litellmAuthHeaders() {
  const key = process.env.MSC_LITELLM_MASTER_KEY?.trim();
  if (!key) return {};
  return { Authorization: `Bearer ${key}` };
}
