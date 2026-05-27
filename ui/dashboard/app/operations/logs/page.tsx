'use client';

import { Download, Filter, RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockLogs = [
  {
    id: '1',
    timestamp: '2024-01-15 14:32:45.123',
    level: 'INFO',
    service: 'api-gateway',
    message: 'Request processed successfully: GET /api/users',
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:32:44.892',
    level: 'DEBUG',
    service: 'auth',
    message: 'Token validation passed for user_id: usr_123',
  },
  {
    id: '3',
    timestamp: '2024-01-15 14:32:44.567',
    level: 'WARN',
    service: 'worker',
    message: 'Job queue depth exceeds threshold: 150 jobs pending',
  },
  {
    id: '4',
    timestamp: '2024-01-15 14:32:43.234',
    level: 'ERROR',
    service: 'database',
    message: 'Connection pool exhausted, waiting for available connection',
  },
  {
    id: '5',
    timestamp: '2024-01-15 14:32:42.890',
    level: 'INFO',
    service: 'api-gateway',
    message: 'Request processed successfully: POST /api/orders',
  },
  {
    id: '6',
    timestamp: '2024-01-15 14:32:41.456',
    level: 'INFO',
    service: 'worker',
    message: 'Job completed: email_notification_job_456',
  },
  {
    id: '7',
    timestamp: '2024-01-15 14:32:40.123',
    level: 'DEBUG',
    service: 'cache',
    message: 'Cache hit for key: user_profile_usr_123',
  },
  {
    id: '8',
    timestamp: '2024-01-15 14:32:39.789',
    level: 'ERROR',
    service: 'api-gateway',
    message: 'Rate limit exceeded for IP: 192.168.1.100',
  },
  {
    id: '9',
    timestamp: '2024-01-15 14:32:38.456',
    level: 'INFO',
    service: 'scheduler',
    message: 'Cron job started: daily_cleanup',
  },
  {
    id: '10',
    timestamp: '2024-01-15 14:32:37.123',
    level: 'WARN',
    service: 'auth',
    message: 'Failed login attempt for user: admin@example.com',
  },
];

export default function LogsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const levelStyles = {
    INFO: 'bg-chart-2/10 text-chart-2',
    DEBUG: 'bg-muted text-muted-foreground',
    WARN: 'bg-warning/10 text-warning',
    ERROR: 'bg-destructive/10 text-destructive',
  };

  const filteredLogs = mockLogs.filter((log) => {
    if (filter !== 'all' && log.level !== filter) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Logs</h1>
          <p className="text-sm text-muted-foreground">View and search application logs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-32">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="INFO">Info</SelectItem>
            <SelectItem value="DEBUG">Debug</SelectItem>
            <SelectItem value="WARN">Warning</SelectItem>
            <SelectItem value="ERROR">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Log Stream</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-1 p-4 font-mono text-sm">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 rounded border border-border bg-muted/30 p-2"
                >
                  <span className="shrink-0 text-xs text-muted-foreground">{log.timestamp}</span>
                  <Badge
                    variant="secondary"
                    className={`shrink-0 ${levelStyles[log.level as keyof typeof levelStyles]}`}
                  >
                    {log.level}
                  </Badge>
                  <span className="shrink-0 text-xs text-muted-foreground">[{log.service}]</span>
                  <span className="flex-1 break-all">{log.message}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
