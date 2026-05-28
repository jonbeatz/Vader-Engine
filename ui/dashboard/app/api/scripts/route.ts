import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { msc_getRepoRoot } from '@/lib/msc-repo-root';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface ScriptInfo {
  name: string;
  command: string;
  allowlisted: boolean;
}

export async function GET() {
  try {
    const root = msc_getRepoRoot();
    const req = createRequire(path.join(root, 'package.json'));
    const { MSC_SCRIPT_ALLOWLIST } = req('./scripts/lib/msc-script-allowlist.mjs') as {
      MSC_SCRIPT_ALLOWLIST: Set<string>;
    };

    const pkgRaw = await readFile(path.join(root, 'package.json'), 'utf-8');
    const pkg = JSON.parse(pkgRaw) as { scripts?: Record<string, string> };
    const entries = Object.entries(pkg.scripts ?? {});

    const scripts: ScriptInfo[] = entries
      .map(([name, command]) => ({
        name,
        command,
        allowlisted: MSC_SCRIPT_ALLOWLIST.has(name),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ scripts });
  } catch {
    return NextResponse.json({ error: 'Failed to load scripts' }, { status: 500 });
  }
}
