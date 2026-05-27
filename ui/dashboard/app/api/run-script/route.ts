import { msc_bridgeKillPort, msc_bridgeRunScript } from '@/lib/msc-bridge';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  script?: string;
  args?: string[];
  port?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const { script, args = [], port } = body;

    if (port !== undefined) {
      const result = await msc_bridgeKillPort(port);
      return Response.json({ ok: result.code === 0, code: result.code });
    }

    if (!script || typeof script !== 'string') {
      return Response.json({ error: 'script is required' }, { status: 400 });
    }

    const result = await msc_bridgeRunScript(script, args);
    return Response.json({ ok: result.code === 0, code: result.code });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Run failed';
    return Response.json({ error: message }, { status: 400 });
  }
}
