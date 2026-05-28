'use client';

import { CheckCircle2, Server, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { msc_useHealth } from '@/lib/hooks/msc-use-health';

export default function PortsPage() {
  const { data: health, isLoading, isError, refetch } = msc_useHealth();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Port Manager</h1>
          <p className="text-sm text-muted-foreground">Loading port status...</p>
        </div>
        <Card className="card-glass-gleam">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !health) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load port data.{' '}
            <button type="button" onClick={() => void refetch()} className="underline">
              Retry
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const ports = health.diagnostics?.ports || [];

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Port Manager</h1>
        <p className="text-sm text-muted-foreground">
          Monitor and manage ports used by sandboxes and services
        </p>
      </div>

      <Card className="card-glass-gleam">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Port Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ports.length === 0 ? (
              <p className="text-sm text-muted-foreground">No ports reported by health probe.</p>
            ) : (
              ports.map((port: { port: number; status: string }) => (
                <div
                  key={port.port}
                  className="flex items-center justify-between border-b border-border/40 py-2 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" aria-hidden />
                    <span className="font-mono text-sm">:{port.port}</span>
                  </div>
                  <Badge variant={port.status === 'OCCUPIED' ? 'default' : 'outline'}>
                    {port.status === 'OCCUPIED' ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-success" aria-hidden />
                        In Use
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" aria-hidden />
                        Available
                      </span>
                    )}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
