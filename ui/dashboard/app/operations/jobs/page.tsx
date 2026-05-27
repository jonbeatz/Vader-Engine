'use client';

import {
  CheckCircle2,
  Clock,
  Loader2,
  Pause,
  Play,
  RefreshCw,
  Trash2,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

const mockJobs = [
  {
    id: 'job_1',
    name: 'email_notification',
    status: 'completed',
    progress: 100,
    queue: 'default',
    attempts: 1,
    completedAt: '2 min ago',
  },
  {
    id: 'job_2',
    name: 'image_processing',
    status: 'running',
    progress: 67,
    queue: 'media',
    attempts: 1,
    startedAt: '30 sec ago',
  },
  {
    id: 'job_3',
    name: 'data_sync',
    status: 'pending',
    progress: 0,
    queue: 'default',
    attempts: 0,
    createdAt: '5 min ago',
  },
  {
    id: 'job_4',
    name: 'report_generation',
    status: 'pending',
    progress: 0,
    queue: 'reports',
    attempts: 0,
    createdAt: '10 min ago',
  },
  {
    id: 'job_5',
    name: 'cleanup_task',
    status: 'failed',
    progress: 45,
    queue: 'maintenance',
    attempts: 3,
    failedAt: '15 min ago',
  },
  {
    id: 'job_6',
    name: 'webhook_delivery',
    status: 'running',
    progress: 23,
    queue: 'webhooks',
    attempts: 1,
    startedAt: '1 min ago',
  },
  {
    id: 'job_7',
    name: 'cache_warmup',
    status: 'completed',
    progress: 100,
    queue: 'default',
    attempts: 1,
    completedAt: '20 min ago',
  },
  {
    id: 'job_8',
    name: 'backup_database',
    status: 'pending',
    progress: 0,
    queue: 'maintenance',
    attempts: 0,
    createdAt: '1 hour ago',
  },
];

const statusStyles = {
  completed: { badge: 'bg-success/10 text-success', icon: CheckCircle2 },
  running: { badge: 'bg-chart-2/10 text-chart-2', icon: Loader2 },
  pending: { badge: 'bg-muted text-muted-foreground', icon: Clock },
  failed: { badge: 'bg-destructive/10 text-destructive', icon: XCircle },
};

export default function JobsPage() {
  const completedCount = mockJobs.filter((j) => j.status === 'completed').length;
  const runningCount = mockJobs.filter((j) => j.status === 'running').length;
  const pendingCount = mockJobs.filter((j) => j.status === 'pending').length;
  const failedCount = mockJobs.filter((j) => j.status === 'failed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Jobs</h1>
          <p className="text-sm text-muted-foreground">Background job queue management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Pause className="mr-2 h-4 w-4" />
            Pause Queue
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{completedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Running</CardTitle>
            <Loader2 className="h-4 w-4 animate-spin text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{runningCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{failedCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Job Queue</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <div className="space-y-2 p-4">
              {mockJobs.map((job) => {
                const StatusIcon = statusStyles[job.status as keyof typeof statusStyles].icon;
                return (
                  <div
                    key={job.id}
                    className="flex items-center justify-between rounded-md border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <StatusIcon
                        className={`h-4 w-4 ${job.status === 'running' ? 'animate-spin' : ''} ${
                          job.status === 'completed'
                            ? 'text-success'
                            : job.status === 'running'
                              ? 'text-chart-2'
                              : job.status === 'failed'
                                ? 'text-destructive'
                                : 'text-muted-foreground'
                        }`}
                      />
                      <div>
                        <p className="font-medium text-sm">{job.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{job.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{job.queue}</Badge>
                      <div className="w-24">
                        <Progress value={job.progress} className="h-1.5" />
                      </div>
                      <Badge
                        variant="secondary"
                        className={statusStyles[job.status as keyof typeof statusStyles].badge}
                      >
                        {job.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground w-20 text-right">
                        {job.attempts} attempt{job.attempts !== 1 ? 's' : ''}
                      </span>
                      <div className="flex gap-1">
                        {job.status === 'pending' && (
                          <Button variant="ghost" size="sm">
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {job.status === 'failed' && (
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
