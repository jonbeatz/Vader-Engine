#!/usr/bin/env node
/**
 * LiteLLM proxy HTTP status (port MSC_LITELLM_PORT, default 4000).
 */
import './lib/msc-load-env.mjs';

import process from 'node:process';
import { msc_hydrateVertexEnv, msc_litellmAuthHeaders } from './lib/msc-litellm-env.mjs';

const { port } = msc_hydrateVertexEnv();
const base = `http://127.0.0.1:${port}`;

try {
  const res = await fetch(`${base}/v1/models`, {
    headers: msc_litellmAuthHeaders(),
    signal: AbortSignal.timeout(3000),
  });
  if (res.status === 200) {
    console.log('online');
    process.exit(0);
  }
  if (res.status === 401) {
    console.log('online (auth required)');
    process.exit(0);
  }
  console.log('offline');
  process.exit(1);
} catch {
  console.log('offline');
  process.exit(1);
}
