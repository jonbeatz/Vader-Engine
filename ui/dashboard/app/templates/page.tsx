'use client';

import { useQuery } from '@tanstack/react-query';
import { FileCode2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface TemplateInfo {
  name: string;
  path: string;
  description: string;
  type: 'frontend' | 'cms' | 'full-stack';
}

async function fetchTemplates(): Promise<TemplateInfo[]> {
  const res = await fetch('/api/templates');
  if (!res.ok) throw new Error('Failed to load templates');
  const data = await res.json();
  return data.templates;
}

const typeColors = {
  frontend: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  cms: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'full-stack': 'bg-green-500/10 text-green-500 border-green-500/20',
};

export default function TemplatesPage() {
  const {
    data: templates,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['templates'],
    queryFn: fetchTemplates,
  });

  const shellClass = 'mx-auto max-w-[1400px] space-y-6 p-6';

  if (isLoading) {
    return (
      <div className={shellClass}>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Templates</h1>
          <p className="text-sm text-muted-foreground">Loading templates...</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="card-glass-gleam">
              <CardHeader>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={shellClass}>
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load templates.{' '}
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
        <h1 className="text-xl font-semibold tracking-tight">Templates</h1>
        <p className="text-sm text-muted-foreground">
          Read-only blueprints under templates/ — list, apply, and seed via msc:template CLI
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates?.map((template) => (
          <Card key={template.path} className="card-glass-gleam transition-all hover:border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileCode2 className="h-4 w-4 text-muted-foreground" aria-hidden />
                <CardTitle className="text-sm font-semibold">{template.name}</CardTitle>
              </div>
              <CardDescription className="text-xs">{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className={typeColors[template.type]}>
                {template.type}
              </Badge>
              <p className="mt-2 truncate font-mono text-[10px] text-muted-foreground">
                {template.path}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
