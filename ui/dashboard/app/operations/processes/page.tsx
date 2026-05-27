'use client';

import { Clock, Cpu, MemoryStick, RefreshCw, Square } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
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
import { Progress } from '@/components/ui/progress';

const mockProcesses = [
  {
    pid: 1234,
    name: 'node',
    command: 'next dev',
    cpu: 12.5,
    memory: 256,
    uptime: '2:34:12',
    status: 'running',
  },
  {
    pid: 1235,
    name: 'node',
    command: 'api-server',
    cpu: 8.2,
    memory: 184,
    uptime: '1:45:30',
    status: 'running',
  },
  {
    pid: 1236,
    name: 'postgres',
    command: 'postgresql',
    cpu: 2.1,
    memory: 512,
    uptime: '5:12:45',
    status: 'running',
  },
  {
    pid: 1237,
    name: 'redis-server',
    command: 'redis',
    cpu: 0.8,
    memory: 64,
    uptime: '5:12:45',
    status: 'running',
  },
  {
    pid: 1238,
    name: 'node',
    command: 'worker',
    cpu: 15.3,
    memory: 320,
    uptime: '0:45:22',
    status: 'running',
  },
  {
    pid: 1239,
    name: 'nginx',
    command: 'master process',
    cpu: 0.1,
    memory: 32,
    uptime: '5:12:45',
    status: 'running',
  },
];

export default function ProcessesPage() {
  const [processes, setProcesses] = useState(mockProcesses);

  const handleKillProcess = (pid: number) => {
    setProcesses((prev) => prev.filter((p) => p.pid !== pid));
    toast.success(`Process ${pid} terminated`);
  };

  const totalCpu = processes.reduce((acc, p) => acc + p.cpu, 0);
  const totalMemory = processes.reduce((acc, p) => acc + p.memory, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Processes</h1>
          <p className="text-sm text-muted-foreground">Monitor and manage running processes</p>
        </div>
        <Button size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Processes
            </CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCpu.toFixed(1)}%</div>
            <Progress value={totalCpu} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Memory Usage
            </CardTitle>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMemory} MB</div>
            <Progress value={(totalMemory / 2048) * 100} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Active Processes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {processes.map((process) => (
              <div
                key={process.pid}
                className="flex items-center justify-between rounded-md border border-border p-3"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <p className="font-medium">{process.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">{process.command}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">PID</p>
                    <p className="font-mono">{process.pid}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">CPU</p>
                    <p className="font-mono">{process.cpu}%</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Memory</p>
                    <p className="font-mono">{process.memory} MB</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span className="font-mono">{process.uptime}</span>
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {process.status}
                  </Badge>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Square className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Kill Process</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to kill process {process.pid} ({process.name})? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleKillProcess(process.pid)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Kill Process
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
