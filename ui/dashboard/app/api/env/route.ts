import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { msc_getRepoRoot } from '@/lib/msc-repo-root';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function msc_readRootPackageVersion(): Promise<string> {
  try {
    const raw = await readFile(path.join(msc_getRepoRoot(), 'package.json'), 'utf-8');
    const pkg = JSON.parse(raw) as { version?: string };
    return pkg.version ?? '0.1.0';
  } catch {
    return process.env.npm_package_version ?? '0.1.0';
  }
}

export async function GET() {
  const publicEnv = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    appVersion: await msc_readRootPackageVersion(),
    enablePayload: process.env.ENABLE_PAYLOAD === 'true',
  };

  return NextResponse.json(publicEnv);
}
