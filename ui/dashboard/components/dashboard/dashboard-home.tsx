'use client';

import { useEffect, useState } from 'react';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { SandboxCard } from '@/components/dashboard/sandbox-card';
import { SupportTickets } from '@/components/dashboard/support-tickets';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { msc_fetchGrade, msc_fetchHealth } from '@/lib/msc-api';

const MOCK_ACTIVITIES = [
  {
    id: '1',
    type: 'build' as const,
    message: 'Structural grader completed',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    project: 'vader-engine',
  },
  {
    id: '2',
    type: 'deploy' as const,
    message: 'Minimal sandbox ready on :3000',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    project: 'nextjs-minimal',
  },
  {
    id: '3',
    type: 'info' as const,
    message: 'MCP registry verified (13 servers)',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: '4',
    type: 'error' as const,
    message: 'Port conflict cleared via msc:kill',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    project: 'ops',
  },
];

const MOCK_TICKETS = [
  {
    id: 't1',
    title: 'LiteLLM proxy handshake',
    priority: 'medium' as const,
    status: 'open' as const,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: 't2',
    title: 'Payload SQLite WAL before deploy',
    priority: 'high' as const,
    status: 'in-progress' as const,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

function MetricCard({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <Card className="card-glass-gleam border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
        {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}

export function DashboardHome() {
  const [integrity, setIntegrity] = useState('61/61');
  const [capacity, setCapacity] = useState('0/5');
  const [velocity, setVelocity] = useState('Optimal');
  const [portStatus, setPortStatus] = useState<Record<number, 'active' | 'idle' | 'unknown'>>({
    3000: 'unknown',
    3001: 'unknown',
    3002: 'unknown',
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [health, grade] = await Promise.all([msc_fetchHealth(), msc_fetchGrade()]);
        if (cancelled) return;
        const ports = health.diagnostics?.ports ?? [];
        const occupied = ports.filter((p) => p.status === 'OCCUPIED').length;
        setCapacity(`${occupied}/${ports.length || 5} active`);
        setIntegrity(`${grade.parsed.passed}/${grade.parsed.total}`);
        setVelocity(grade.ok ? 'Optimal' : 'Review');
        const next: Record<number, 'active' | 'idle' | 'unknown'> = {
          3000: 'unknown',
          3001: 'unknown',
          3002: 'unknown',
        };
        for (const p of ports) {
          if (p.port === 3000 || p.port === 3001 || p.port === 3002) {
            next[p.port] = p.status === 'OCCUPIED' ? 'active' : 'idle';
          }
        }
        setPortStatus(next);
      } catch {
        /* keep defaults */
      }
    }
    load();
    const id = window.setInterval(load, 5000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Vader Velocity" value={velocity} hint="+trend from last gate run" />
        <MetricCard title="Engine Capacity" value={capacity} hint="Socket probes · health API" />
        <MetricCard title="Integrity Score" value={integrity} hint="61-point structural grader" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SandboxCard
          port={3000}
          title="Minimal"
          script="msc:dev:example"
          status={portStatus[3000]}
        />
        <SandboxCard
          port={3001}
          title="Payload CMS"
          script="msc:dev:payload"
          status={portStatus[3001]}
        />
        <SandboxCard
          port={3002}
          title="Tailwind / shadcn"
          script="msc:dev:tailwind"
          status={portStatus[3002]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed activities={MOCK_ACTIVITIES} />
        </div>
        <div>
          <SupportTickets tickets={MOCK_TICKETS} />
        </div>
      </div>
    </div>
  );
}
