'use client';

import { Circle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  type: 'deploy' | 'build' | 'error' | 'info';
  message: string;
  timestamp: Date;
  project?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

function msc_formatShortTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

function MscRelativeTime({ date }: { date: Date }) {
  const [mounted, setMounted] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const intervalId = window.setInterval(() => {
      setTick((tick) => tick + 1);
    }, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  if (!mounted) {
    return (
      <span className="inline-block min-w-[3.5ch] text-muted-foreground/50" aria-hidden>
        …
      </span>
    );
  }

  return (
    <span className="inline-block min-w-[3.5ch] text-muted-foreground">
      {msc_formatShortTime(date)}
    </span>
  );
}

const activityDotStyles: Record<ActivityItem['type'], string> = {
  deploy: 'text-success drop-shadow-[0_0_6px_rgba(29,158,117,0.5)]',
  build: 'text-chart-4',
  error: 'text-destructive',
  info: 'text-muted-foreground',
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="card-glass-gleam h-full border-border/60" data-testid="activity-feed">
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/50">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
        </div>
        <h2 className="text-sm font-semibold">Activity Pulse</h2>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[220px] px-4 pb-4 sm:h-[260px]">
          <div className="flex flex-col gap-1">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  'relative flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50',
                  index !== activities.length - 1 && 'border-b border-border/60',
                )}
              >
                <div className="relative flex flex-col items-center">
                  <Circle
                    className={cn('h-2.5 w-2.5 fill-current', activityDotStyles[activity.type])}
                    aria-hidden
                  />
                  {index !== activities.length - 1 && (
                    <div className="absolute top-3 h-full w-px bg-border/60" aria-hidden />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-tight text-foreground">
                    {activity.message}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    {activity.project && (
                      <>
                        <span className="font-mono text-muted-foreground/85">
                          {activity.project}
                        </span>
                        <span className="text-muted-foreground/40" aria-hidden>
                          •
                        </span>
                      </>
                    )}
                    <MscRelativeTime date={activity.timestamp} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
