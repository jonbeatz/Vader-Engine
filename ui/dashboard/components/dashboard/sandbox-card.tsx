'use client';

import { ExternalLink, Play, Square } from 'lucide-react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { msc_killPort, msc_runScript } from '@/lib/msc-api';
import { cn } from '@/lib/utils';

type SandboxCardProps = {
  port: 3000 | 3001 | 3002;
  title: string;
  script: string;
  status?: 'active' | 'idle' | 'unknown';
};

const ORIGIN = typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1';

export function SandboxCard({ port, title, script, status = 'unknown' }: SandboxCardProps) {
  const [busy, setBusy] = useState(false);
  const testId = `sandbox-card-${port}`;

  async function handleStart() {
    setBusy(true);
    try {
      await msc_runScript({ script });
    } finally {
      setBusy(false);
    }
  }

  async function handleStop() {
    setBusy(true);
    try {
      await msc_killPort(port);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="card-glass-gleam border-border/60" data-testid={testId}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        <Badge
          variant={status === 'active' ? 'success' : 'secondary'}
          className="gap-1.5 font-mono text-[10px]"
        >
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              status === 'active' ? 'bg-success' : 'bg-muted-foreground',
            )}
            aria-hidden
          />
          :{port}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button size="sm" disabled={busy} onClick={handleStart}>
          <Play className="h-3.5 w-3.5" aria-hidden />
          START
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive" disabled={busy}>
              <Square className="h-3.5 w-3.5" aria-hidden />
              STOP
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Stop sandbox on port {port}?</AlertDialogTitle>
              <AlertDialogDescription>
                This runs the allowlisted kill-port script for {title}. Active dev processes on :
                {port} will be terminated.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction data-testid="stop-sandbox-confirm" onClick={handleStop}>
                Confirm STOP
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button size="sm" variant="outline" asChild>
          <a href={`http://${ORIGIN}:${port}`} target="_blank" rel="noreferrer">
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            OPEN
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
