'use client';

import { Activity, BarChart3, Database, FileText, Server, Terminal, Wrench } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const operationPages = [
  {
    title: 'Ports',
    description: 'Monitor and manage active ports',
    href: '/operations/ports',
    icon: Server,
  },
  {
    title: 'Environment',
    description: 'View runtime configuration',
    href: '/operations/env',
    icon: Terminal,
  },
  {
    title: 'Scripts',
    description: 'Available npm scripts',
    href: '/operations/scripts',
    icon: Wrench,
  },
  {
    title: 'Processes',
    description: 'Running processes',
    href: '/operations/processes',
    icon: Activity,
  },
  {
    title: 'Jobs',
    description: 'Scheduled jobs',
    href: '/operations/jobs',
    icon: FileText,
  },
  {
    title: 'Metrics',
    description: 'Performance metrics',
    href: '/operations/metrics',
    icon: BarChart3,
  },
  { title: 'Logs', description: 'System logs', href: '/operations/logs', icon: FileText },
  {
    title: 'Database',
    description: 'Database status',
    href: '/operations/database',
    icon: Database,
  },
];

export default function OperationsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Operations</h1>
        <p className="text-sm text-muted-foreground">System management and monitoring tools</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {operationPages.map((page) => {
          const Icon = page.icon;
          return (
            <Link key={page.href} href={page.href}>
              <Card className="card-glass-gleam cursor-pointer transition-all hover:border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" aria-hidden />
                    <CardTitle className="text-sm font-semibold">{page.title}</CardTitle>
                  </div>
                  <CardDescription className="text-xs">{page.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-xs text-muted-foreground">Click to manage →</span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
