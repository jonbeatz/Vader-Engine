'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { MSC_QUERY_KEYS } from './msc-use-health';

export interface SandboxActionParams {
  port: number;
  action: 'start' | 'stop' | 'restart';
  script?: string;
}

const MSC_ACTION_TOAST: Record<SandboxActionParams['action'], string> = {
  start: 'started',
  stop: 'stopped',
  restart: 'restarted',
};

async function msc_runSandboxAction({
  port,
  action,
  script,
}: SandboxActionParams): Promise<{ success: boolean; message: string }> {
  if (action === 'stop') {
    const response = await fetch('/api/run-script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ port }),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      throw new Error(data.error ?? `Failed to stop sandbox on port ${port}`);
    }
    return { success: true, message: `Stopped sandbox on port ${port}` };
  }

  if (!script) {
    throw new Error(`script is required to ${action} sandbox on port ${port}`);
  }

  if (action === 'restart') {
    await msc_runSandboxAction({ port, action: 'stop' });
    return msc_runSandboxAction({ port, action: 'start', script });
  }

  const response = await fetch('/api/run-script', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ script, args: [] }),
  });
  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? `Failed to start sandbox on port ${port}`);
  }
  return { success: true, message: `Started sandbox on port ${port}` };
}

export function msc_useSandboxMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: msc_runSandboxAction,
    onSuccess: (_, { port, action }) => {
      queryClient.invalidateQueries({ queryKey: MSC_QUERY_KEYS.health });
      toast.success(`Sandbox on port ${port} ${MSC_ACTION_TOAST[action]} successfully`);
    },
    onError: (error: Error, { port, action }) => {
      toast.error(`Failed to ${action} sandbox on port ${port}: ${error.message}`);
    },
  });
}
