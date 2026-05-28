'use client';

import { Bell, Moon, RefreshCw, Shield } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [telemetry, setTelemetry] = useState(true);

  const handleSave = () => {
    toast.success('Settings saved', {
      description: 'Your preferences have been updated',
    });
  };

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your Vader Engine environment</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-glass-gleam">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-muted-foreground" aria-hidden />
              <CardTitle className="text-sm font-semibold">Appearance</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Customize the dashboard look and feel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full border-border bg-card">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card">
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glass-gleam">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" aria-hidden />
              <CardTitle className="text-sm font-semibold">Notifications</CardTitle>
            </div>
            <CardDescription className="text-xs">Manage alert preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs">Enable notifications</Label>
                <p className="text-[10px] text-muted-foreground">
                  Receive alerts for system events
                </p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        <Card className="card-glass-gleam">
          <CardHeader>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-muted-foreground" aria-hidden />
              <CardTitle className="text-sm font-semibold">Data & Refresh</CardTitle>
            </div>
            <CardDescription className="text-xs">Control data polling behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs">Auto-refresh dashboard</Label>
                <p className="text-[10px] text-muted-foreground">
                  Automatically update metrics every 5 seconds
                </p>
              </div>
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </div>
          </CardContent>
        </Card>

        <Card className="card-glass-gleam">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" aria-hidden />
              <CardTitle className="text-sm font-semibold">Privacy</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Control data sharing and telemetry
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs">Telemetry</Label>
                <p className="text-[10px] text-muted-foreground">Send anonymous usage data</p>
              </div>
              <Switch checked={telemetry} onCheckedChange={setTelemetry} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}
