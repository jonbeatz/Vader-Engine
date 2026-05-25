import type { Payload } from 'payload';

let cached: Payload | null = null;

/** Lazy Payload bootstrap — no top-level CMS imports (static builds stay clean). */
export async function getVaderPayload(): Promise<Payload> {
  if (cached) return cached;

  const { getPayload } = await import('payload');
  const configModule = await import('@payload-config');
  cached = await getPayload({ config: configModule.default });
  return cached;
}
