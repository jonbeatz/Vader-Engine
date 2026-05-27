import { msc_bridgeHealth } from '@/lib/msc-bridge';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await msc_bridgeHealth();
    const payload = result.diagnostics;
    const inner = payload && 'diagnostics' in payload ? payload.diagnostics : payload;
    return Response.json({
      status: result.code === 0 && !result.parseError ? 'SUCCESS' : 'ERROR',
      diagnostics: inner ?? null,
      code: result.code,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Health failed';
    return Response.json({ status: 'ERROR', error: message }, { status: 500 });
  }
}
