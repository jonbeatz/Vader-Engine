'use client';

import { MscButton } from '@/components/ui/button';
import {
  MscCard,
  MscCardContent,
  MscCardDescription,
  MscCardHeader,
  MscCardTitle,
} from '@/components/ui/card';

export function MscSandboxHero() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-msc-lg p-msc-lg">
      <MscCard className="msc-sandbox-hero-card">
        <MscCardHeader>
          <MscCardTitle>Path B — Tailwind / shadcn</MscCardTitle>
          <MscCardDescription>
            Isolated sandbox on port <strong>3002</strong>. Tokens from{' '}
            <code className="text-msc-accent">ui/msc-shield.css</code>; utilities via Tailwind
            bridge only — no inline styles, no CSS modules.
          </MscCardDescription>
        </MscCardHeader>
        <MscCardContent className="flex flex-col gap-msc-md">
          <p className="text-sm text-msc-text-secondary">
            Lean Boundary: dependencies live only in{' '}
            <code>examples/nextjs-tailwind/package.json</code>.
          </p>
          <MscButton type="button" onClick={() => alert('MSC Shield + shadcn active')}>
            Test hybrid surface
          </MscButton>
        </MscCardContent>
      </MscCard>
      <footer className="text-center text-xs text-msc-text-secondary">
        Powered by the MSC Media Engine · Vader Engine v2.5.0 sprint
      </footer>
    </main>
  );
}
