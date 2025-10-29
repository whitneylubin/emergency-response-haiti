import { NextRequest } from 'next/server';

const WINDOW_MS = 60 * 60 * 1000;
const limit = Number(process.env.REQUESTS_PER_IP_PER_HOUR ?? '20');

const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || record.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return { ok: true };
  }
  record.count += 1;
  if (record.count > limit) {
    return { ok: false, retryAfter: Math.ceil((record.reset - now) / 1000) };
  }
  return { ok: true };
}
