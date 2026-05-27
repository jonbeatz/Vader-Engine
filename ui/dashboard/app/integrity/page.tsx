'use client';

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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { msc_fetchGrade, msc_killPort } from '@/lib/msc-api';

export default function IntegrityPage() {
  const [grade, setGrade] = useState<{
    passed: number;
    total: number;
    checks: { name: string; ok: boolean }[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function runGrader() {
    setLoading(true);
    try {
      const result = await msc_fetchGrade();
      setGrade(result.parsed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <Card className="card-glass-gleam border-border/60">
        <CardHeader>
          <CardTitle>Structural integrity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Runs the 61-point Vader Engine grader from repo root via allowlisted API.
          </p>
          <Button data-testid="run-grader-button" disabled={loading} onClick={runGrader}>
            {loading ? 'Running…' : 'Run Grader'}
          </Button>
          {grade ? (
            <p className="font-mono text-lg text-primary">
              {grade.passed}/{grade.total}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Kill port (ops)</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Kill port 3010</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm port kill</AlertDialogTitle>
                <AlertDialogDescription>
                  Stops listeners on the dashboard port. Use only when the dev server is hung.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  data-testid="kill-port-confirm"
                  onClick={() => msc_killPort(3010)}
                >
                  Confirm kill
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {grade?.checks.some((c) => !c.ok) ? (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive">Failed checks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {grade.checks
                .filter((c) => !c.ok)
                .map((c) => (
                  <li key={c.name} className="text-muted-foreground">
                    {c.name}
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
