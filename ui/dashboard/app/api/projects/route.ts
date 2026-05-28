import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { msc_getRepoRoot } from '@/lib/msc-repo-root';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface ProjectInfo {
  name: string;
  path: string;
  description: string;
  type: 'example' | 'dashboard';
  port?: number;
}

const EXAMPLE_PORTS: Record<string, number> = {
  'nextjs-minimal': 3000,
  'nextjs-payload': 3001,
  'nextjs-tailwind': 3002,
};

async function msc_scanProjects(root: string): Promise<ProjectInfo[]> {
  const projects: ProjectInfo[] = [];
  const examplesDir = path.join(root, 'examples');

  try {
    const items = await readdir(examplesDir, { withFileTypes: true });
    for (const item of items) {
      if (!item.isDirectory()) continue;
      const relPath = `examples/${item.name}`;
      const pkgPath = path.join(examplesDir, item.name, 'package.json');
      try {
        const pkg = JSON.parse(await readFile(pkgPath, 'utf-8')) as {
          name?: string;
          description?: string;
        };
        projects.push({
          name: pkg.name ?? item.name,
          path: relPath,
          description: pkg.description ?? `${item.name} sandbox`,
          type: 'example',
          port: EXAMPLE_PORTS[item.name],
        });
      } catch {
        // skip dirs without package.json
      }
    }
  } catch {
    // examples/ missing
  }

  const dashboardPkgPath = path.join(root, 'ui/dashboard/package.json');
  try {
    const pkg = JSON.parse(await readFile(dashboardPkgPath, 'utf-8')) as {
      name?: string;
      description?: string;
    };
    projects.push({
      name: pkg.name ?? 'vader-construct-dashboard',
      path: 'ui/dashboard',
      description: pkg.description ?? 'Vader Construct developer operations dashboard',
      type: 'dashboard',
      port: 3010,
    });
  } catch {
    // dashboard package missing
  }

  return projects.sort((a, b) => a.path.localeCompare(b.path));
}

export async function GET() {
  try {
    const root = msc_getRepoRoot();
    const projects = await msc_scanProjects(root);
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}
