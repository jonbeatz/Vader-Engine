'use client';

import { useQuery } from '@tanstack/react-query';
import { Globe, Package, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface EnvInfo {
  nodeEnv: string;
  appVersion: string;
  enablePayload: boolean;
}

async function fetchEnv(): Promise<EnvInfo> {
  const res = await fetch('/api/env');
  if (!res.ok) throw new Error('Failed to load environment info');
  return res.json();
}

export default function EnvPage() {
  const {
    data: env,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['env'],
    queryFn: fetchEnv,
  });

  const shellClass = 'mx-auto max-w-2xl space-y-6 p-6';

  if (isLoading) {
    return (
      <div className={shellClass}>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Environment</h1>
          <p className="text-sm text-muted-foreground">Loading environment info...</p>
        </div>
        <Card className="card-glass-gleam">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={shellClass}>
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load environment info.{' '}
            <button type="button" onClick={() => void refetch()} className="underline">
              Retry
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Environment</h1>
        <p className="text-sm text-muted-foreground">
          Current runtime environment and configuration (non-secret values only)
        </p>
      </div>

      <Card className="card-glass-gleam">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Shield className="h-4 w-4" aria-hidden />
            Runtime Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between border-b border-border/40 py-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" aria-hidden />
              <span className="text-sm">Node Environment</span>
            </div>
            <code className="rounded bg-muted/30 px-2 py-1 text-xs">{env?.nodeEnv}</code>
          </div>
          <div className="flex items-center justify-between border-b border-border/40 py-2">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" aria-hidden />
              <span className="text-sm">Engine Version</span>
            </div>
            <code className="rounded bg-muted/30 px-2 py-1 text-xs">v{env?.appVersion}</code>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              {env?.enablePayload ? (
                <ToggleRight className="h-4 w-4 text-success" aria-hidden />
              ) : (
                <ToggleLeft className="h-4 w-4 text-muted-foreground" aria-hidden />
              )}
              <span className="text-sm">Payload CMS</span>
            </div>
            <Badge variant={env?.enablePayload ? 'default' : 'outline'}>
              {env?.enablePayload ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
