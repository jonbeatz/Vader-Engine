'use client';

import { useQuery } from '@tanstack/react-query';
import type { MscLogEntry } from '@/lib/msc-api';

type MscLogSnapshotLine = {
  ts?: string;
  timestamp?: string;
  line: string;
  level?: string;
  source?: string;
  id?: string;
};

function msc_normalizeLogEntry(raw: MscLogSnapshotLine, index: number): MscLogEntry {
  const timestamp = raw.timestamp ?? raw.ts ?? new Date().toISOString();
  const level = raw.level === 'error' ? 'error' : raw.level === 'warn' ? 'warn' : 'info';

  return {
    id: raw.id ?? `log-${index}-${timestamp}`,
    timestamp,
    line: raw.line,
    level,
    source: raw.source,
  };
}

async function msc_fetchLogs(): Promise<MscLogEntry[]> {
  const response = await fetch('/api/logs', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch logs');
  }
  const data = await response.json();
  const raw: MscLogSnapshotLine[] = Array.isArray(data) ? data : (data.lines ?? data.logs ?? []);
  return raw.map(msc_normalizeLogEntry);
}

export const MSC_LOG_QUERY_KEY = ['msc', 'logs'] as const;

export function msc_useLogs() {
  return useQuery<MscLogEntry[]>({
    queryKey: MSC_LOG_QUERY_KEY,
    queryFn: msc_fetchLogs,
    refetchInterval: 5_000,
    staleTime: 2_000,
  });
}
