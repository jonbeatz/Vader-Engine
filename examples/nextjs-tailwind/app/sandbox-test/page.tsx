'use client';

import Link from 'next/link';
import { MscButton } from '@/components/ui/button';
import {
  MscCard,
  MscCardContent,
  MscCardDescription,
  MscCardHeader,
  MscCardTitle,
} from '@/components/ui/card';

const leanBoundaryItems = [
  'Framework deps live only in examples/nextjs-tailwind/package.json',
  'Root package.json orchestrates scripts — no Tailwind/shadcn packages at repo root',
  'Token SSoT: ui/msc-shield.css imported into app/globals.css',
  'tailwind.config.ts maps theme colors to var(--msc-*) — no hardcoded hex',
  'Committed env: .env.example placeholders only; live values in .env.local (gitignored)',
];

export default function SandboxTestPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-msc-lg p-msc-lg">
      <MscCard className="msc-sandbox-stress-card border-msc-border bg-msc-surface">
        <MscCardHeader>
          <MscCardTitle>Vader Protocol — Lean Boundary</MscCardTitle>
          <MscCardDescription>
            Component stress-test: shadcn primitives bridged to MSC tokens on port{' '}
            <strong className="text-msc-accent">3002</strong>.
          </MscCardDescription>
        </MscCardHeader>
        <MscCardContent className="flex flex-col gap-msc-md">
          <ul className="list-disc space-y-msc-sm pl-msc-lg text-sm text-msc-text-secondary">
            {leanBoundaryItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-msc-md">
            <MscButton
              type="button"
              variant="default"
              className="bg-msc-accent text-msc-text-primary hover:bg-msc-accent-hover focus-visible:ring-msc-accent"
              onClick={() => alert('Accent uses var(--msc-accent) from msc-shield.css')}
            >
              MscButton — --msc-accent
            </MscButton>
            <MscButton type="button" variant="outline">
              Outline variant
            </MscButton>
          </div>
        </MscCardContent>
      </MscCard>

      <p className="text-center text-sm text-msc-text-secondary">
        <Link className="text-msc-accent underline-offset-4 hover:underline" href="/">
          ← Main demo
        </Link>
      </p>
    </main>
  );
}
