import { msc_bridgeGrade } from '@/lib/msc-bridge';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await msc_bridgeGrade();
    return Response.json({
      ok: result.parsed.ok,
      parsed: result.parsed,
      code: result.code,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Grade failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
