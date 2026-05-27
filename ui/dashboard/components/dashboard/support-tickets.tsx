'use client';

import { formatDistanceToNow } from 'date-fns';
import { Circle, ExternalLink, Headphones, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Ticket {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: Date;
  author?: string;
}

interface SupportTicketsProps {
  tickets: Ticket[];
}

function TicketTime({ createdAt }: { createdAt: Date }) {
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
      <span className="inline-block min-w-[8ch] text-muted-foreground/50" aria-hidden>
        ...
      </span>
    );
  }

  return <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>;
}

export function SupportTickets({ tickets }: SupportTicketsProps) {
  const _priorityConfig = {
    low: { badge: 'bg-muted text-muted-foreground border-transparent' },
    medium: { badge: 'bg-chart-2/10 text-chart-2 border-chart-2/20' },
    high: { badge: 'bg-warning/10 text-warning border-warning/20' },
    critical: { badge: 'bg-destructive/10 text-destructive border-destructive/20' },
  };

  const statusConfig = {
    open: { badge: 'bg-success/10 text-success border-success/20', label: 'Open' },
    'in-progress': { badge: 'bg-warning/10 text-warning border-warning/20', label: 'Pending' },
    resolved: { badge: 'bg-muted text-muted-foreground border-transparent', label: 'Done' },
  };

  return (
    <Card className="card-glass-gleam h-full border-border/60">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/50">
            <Headphones className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <CardTitle className="text-sm font-semibold">Support Tickets</CardTitle>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-7 border-border/60 text-xs hover:border-primary/30"
        >
          <MessageSquare className="mr-1.5 h-3 w-3" />
          New Ticket
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[260px] px-4 pb-4">
          <div className="space-y-2">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="group flex items-start justify-between rounded-lg border border-border/40 bg-muted/20 p-3 transition-all hover:border-border/60 hover:bg-muted/30"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-muted/50">
                    <Circle className="h-2 w-2 fill-muted-foreground text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-muted-foreground/70">
                        #{ticket.id}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          'h-4 text-[9px] font-medium',
                          statusConfig[ticket.status].badge,
                        )}
                      >
                        {statusConfig[ticket.status].label}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground line-clamp-1">
                      {ticket.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                      {ticket.author && (
                        <>
                          <span>{ticket.author}</span>
                          <span className="text-muted-foreground/40">•</span>
                        </>
                      )}
                      <TicketTime createdAt={ticket.createdAt} />
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
