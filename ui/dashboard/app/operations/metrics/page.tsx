'use client';

import { Cpu, HardDrive, MemoryStick, Network, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MetricsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Metrics</h1>
          <p className="text-sm text-muted-foreground">System performance metrics and monitoring</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="1h">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">Last 15 min</SelectItem>
              <SelectItem value="1h">Last 1 hour</SelectItem>
              <SelectItem value="6h">Last 6 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34%</div>
            <p className="text-xs text-muted-foreground">avg last hour</p>
            <div className="mt-2 h-16 w-full rounded bg-muted/50 flex items-end gap-0.5 p-1">
              {[45, 32, 28, 35, 42, 38, 34, 30, 36, 40, 33, 34].map((v, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static sparkline samples never reorder.
                <div key={i} className="flex-1 bg-chart-1 rounded-t" style={{ height: `${v}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Memory</CardTitle>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1 GB</div>
            <p className="text-xs text-muted-foreground">of 8 GB</p>
            <div className="mt-2 h-16 w-full rounded bg-muted/50 flex items-end gap-0.5 p-1">
              {[20, 22, 25, 24, 26, 25, 27, 26, 25, 26, 26, 26].map((v, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static sparkline samples never reorder.
                <div key={i} className="flex-1 bg-chart-2 rounded-t" style={{ height: `${v}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Disk I/O</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 MB/s</div>
            <p className="text-xs text-muted-foreground">read/write</p>
            <div className="mt-2 h-16 w-full rounded bg-muted/50 flex items-end gap-0.5 p-1">
              {[30, 45, 60, 40, 35, 50, 55, 45, 40, 48, 52, 45].map((v, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static sparkline samples never reorder.
                <div key={i} className="flex-1 bg-chart-3 rounded-t" style={{ height: `${v}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Network</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Mbps</div>
            <p className="text-xs text-muted-foreground">in/out</p>
            <div className="mt-2 h-16 w-full rounded bg-muted/50 flex items-end gap-0.5 p-1">
              {[15, 18, 22, 20, 25, 30, 28, 24, 20, 18, 16, 12].map((v, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static sparkline samples never reorder.
                <div key={i} className="flex-1 bg-chart-4 rounded-t" style={{ height: `${v}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Request Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">p50</span>
                <span className="font-mono text-sm">12ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">p90</span>
                <span className="font-mono text-sm">45ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">p95</span>
                <span className="font-mono text-sm">89ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">p99</span>
                <span className="font-mono text-sm">234ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Requests/sec</span>
                <span className="font-mono text-sm">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className="font-mono text-sm text-success">99.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Error Rate</span>
                <span className="font-mono text-sm text-destructive">0.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Connections</span>
                <span className="font-mono text-sm">342</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
