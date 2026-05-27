export type MscHealthResponse = {
  status?: string;
  diagnostics?: {
    ports?: { port: number; status: string }[];
    envLocal?: string;
    nodeVersion?: string;
  };
};

export type MscGradeResponse = {
  ok: boolean;
  parsed: {
    passed: number;
    total: number;
    pct: number;
    checks: { name: string; ok: boolean }[];
    ok: boolean;
  };
  code: number | null;
};

export async function msc_fetchHealth(): Promise<MscHealthResponse> {
  const res = await fetch('/api/health', { cache: 'no-store' });
  if (!res.ok) throw new Error('Health request failed');
  return res.json();
}

export async function msc_fetchGrade(): Promise<MscGradeResponse> {
  const res = await fetch('/api/grade', { cache: 'no-store' });
  if (!res.ok) throw new Error('Grade request failed');
  return res.json();
}

export async function msc_runScript(body: {
  script: string;
  args?: string[];
  port?: number;
}): Promise<{ ok: boolean; code: number | null }> {
  const res = await fetch('/api/run-script', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Script run failed');
  return data;
}

export async function msc_killPort(port: number): Promise<{ ok: boolean; code: number | null }> {
  return msc_runScript({ script: 'msc:kill', args: [String(port)], port });
}
