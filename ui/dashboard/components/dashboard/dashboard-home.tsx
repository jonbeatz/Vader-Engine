'use client';

import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { SandboxCard } from '@/components/dashboard/sandbox-card';
import { SupportTickets } from '@/components/dashboard/support-tickets';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { msc_useGrade, msc_useHealth } from '@/lib/hooks/msc-use-health';
import { msc_useLogs } from '@/lib/hooks/msc-use-logs';
import type { MscHealthResponse } from '@/lib/msc-api';

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

function msc_derivePortStatus(
  health: MscHealthResponse | undefined,
): Record<number, 'active' | 'idle' | 'unknown'> {
  const next: Record<number, 'active' | 'idle' | 'unknown'> = {
    3000: 'unknown',
    3001: 'unknown',
    3002: 'unknown',
  };
  const ports = health?.diagnostics?.ports ?? [];
  for (const p of ports) {
    if (p.port === 3000 || p.port === 3001 || p.port === 3002) {
      next[p.port] = p.status === 'OCCUPIED' ? 'active' : 'idle';
    }
  }
  return next;
}

export function DashboardHome() {
  const {
    data: health,
    isLoading: healthLoading,
    isError: healthError,
    refetch: refetchHealth,
  } = msc_useHealth();
  const {
    data: grade,
    isLoading: gradeLoading,
    isError: gradeError,
    refetch: refetchGrade,
  } = msc_useGrade();
  const { data: logs, isLoading: logsLoading } = msc_useLogs();

  const activities =
    logs?.map((log, index) => ({
      id: log.id ?? `log-${index}-${log.timestamp}`,
      type:
        log.level === 'error'
          ? ('error' as const)
          : log.level === 'warn'
            ? ('info' as const)
            : ('info' as const),
      message: log.line,
      timestamp: new Date(log.timestamp),
      project: log.source || 'system',
    })) || MOCK_ACTIVITIES;

  const showActivitySkeleton = logsLoading && !logs;

  const isLoading = healthLoading || gradeLoading;
  const hasError = healthError || gradeError;

  const shellClass = 'mx-auto max-w-[1400px] space-y-6 p-6';

  if (isLoading) {
    return (
      <div className={shellClass}>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4">
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="mb-2 h-8 w-16" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[3000, 3001, 3002].map((port) => (
            <div key={port} className="rounded-lg border border-border bg-card p-4">
              <Skeleton className="mb-3 h-4 w-28" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={shellClass}>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Dashboard</h1>
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load dashboard data.
            <button
              type="button"
              onClick={() => {
                void refetchHealth();
                void refetchGrade();
              }}
              className="ml-2 underline"
            >
              Retry
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const ports = health?.diagnostics?.ports ?? [];
  const occupied = ports.filter((p) => p.status === 'OCCUPIED').length;
  const capacity = `${occupied}/${ports.length || 5} active`;
  const integrity = grade ? `${grade.parsed.passed}/${grade.parsed.total}` : '—';
  const velocity = grade?.ok ? 'Optimal' : 'Review';
  const portStatus = msc_derivePortStatus(health);

  return (
    <div className={shellClass}>
      <h1 className="text-lg font-semibold tracking-tight text-foreground">Dashboard</h1>
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
          {showActivitySkeleton ? (
            <Card className="card-glass-gleam border-border/60">
              <CardHeader className="pb-3">
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-2.5 w-2.5 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <ActivityFeed activities={activities} />
          )}
        </div>
        <div>
          <SupportTickets tickets={MOCK_TICKETS} />
        </div>
      </div>
    </div>
  );
}
