'use client';

import { Activity, ArrowUpDown, Database, Plus, RefreshCw, Server } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const databases = [
  {
    name: 'Primary PostgreSQL',
    host: 'localhost:5432',
    status: 'connected',
    connections: { active: 8, idle: 2, max: 20 },
    size: '2.4 GB',
    latency: '1.2ms',
  },
  {
    name: 'Read Replica',
    host: 'replica.db:5432',
    status: 'connected',
    connections: { active: 3, idle: 7, max: 20 },
    size: '2.4 GB',
    latency: '3.5ms',
  },
  {
    name: 'Redis Cache',
    host: 'localhost:6379',
    status: 'connected',
    connections: { active: 12, idle: 0, max: 50 },
    size: '512 MB',
    latency: '0.3ms',
  },
];

const recentQueries = [
  {
    query: 'SELECT * FROM users WHERE id = $1',
    duration: '2.3ms',
    rows: 1,
    timestamp: '2 sec ago',
  },
  {
    query: 'INSERT INTO events (type, data) VALUES ($1, $2)',
    duration: '5.1ms',
    rows: 1,
    timestamp: '5 sec ago',
  },
  {
    query: 'UPDATE sessions SET last_active = NOW()',
    duration: '12.4ms',
    rows: 847,
    timestamp: '10 sec ago',
  },
  {
    query: "SELECT COUNT(*) FROM orders WHERE status = 'pending'",
    duration: '45.2ms',
    rows: 1,
    timestamp: '15 sec ago',
  },
];

export default function DatabasePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Database</h1>
          <p className="text-sm text-muted-foreground">Database connections and query monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Connection
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Connections
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {databases.reduce((acc, db) => acc + db.connections.active + db.connections.idle, 0)}
            </div>
            <p className="text-xs text-muted-foreground">across all pools</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Latency</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.7ms</div>
            <p className="text-xs text-muted-foreground">last 5 minutes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Queries/sec</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">current rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Database Connections */}
      <div>
        <h2 className="mb-4 text-lg font-medium">Connection Pools</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {databases.map((db) => (
            <Card key={db.name}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base">{db.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {db.status}
                  </Badge>
                </div>
                <p className="font-mono text-xs text-muted-foreground">{db.host}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">Connections</span>
                    <span>
                      {db.connections.active + db.connections.idle} / {db.connections.max}
                    </span>
                  </div>
                  <Progress
                    value={
                      ((db.connections.active + db.connections.idle) / db.connections.max) * 100
                    }
                    className="h-1.5"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Active</p>
                    <p className="font-medium">{db.connections.active}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Size</p>
                    <p className="font-medium">{db.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Latency</p>
                    <p className="font-medium">{db.latency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Queries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Recent Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentQueries.map((query) => (
              <div
                key={query.query}
                className="flex items-center justify-between rounded-md border border-border p-3"
              >
                <div className="flex-1">
                  <code className="text-sm">{query.query}</code>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="font-mono">{query.duration}</span>
                  <span>{query.rows} rows</span>
                  <span>{query.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
