import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { msc_getRepoRoot } from '@/lib/msc-repo-root';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface TemplateInfo {
  name: string;
  path: string;
  description: string;
  type: 'frontend' | 'cms' | 'full-stack';
}

export async function GET() {
  try {
    const templatesDir = path.join(msc_getRepoRoot(), 'templates');
    const categories = ['frontend', 'cms', 'full-stack'] as const;
    const templates: TemplateInfo[] = [];

    for (const category of categories) {
      const categoryPath = path.join(templatesDir, category);
      try {
        const items = await readdir(categoryPath, { withFileTypes: true });
        for (const item of items) {
          if (item.isDirectory()) {
            const readmePath = path.join(categoryPath, item.name, 'README.md');
            let description = '';
            try {
              const readme = await readFile(readmePath, 'utf-8');
              const firstLine = readme.split('\n')[0];
              description = firstLine.replace(/^#\s*/, '');
            } catch {
              description = `${item.name} template`;
            }
            templates.push({
              name: item.name,
              path: `templates/${category}/${item.name}`,
              description,
              type: category,
            });
          }
        }
      } catch {
        // Category folder missing or unreadable
      }
    }

    return NextResponse.json({ templates });
  } catch {
    return NextResponse.json({ error: 'Failed to load templates' }, { status: 500 });
  }
}
