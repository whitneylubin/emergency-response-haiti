import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { parseWhatsAppMessage, getAcknowledgement } from '../../../../lib/whatsappParser';
import crypto from 'node:crypto';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  if (!payload?.from || !payload?.body) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const parsed = parseWhatsAppMessage(payload);
  await prisma.request.create({
    data: {
      type: parsed.type,
      description: parsed.description,
      commune: parsed.commune || 'Unknown',
      contactName: payload.from,
      contactPhone: payload.from,
      contactEmail: undefined,
      publicHash: crypto.randomBytes(12).toString('hex'),
      source: 'WHATSAPP'
    }
  });
  const message = getAcknowledgement(parsed.language);
  return NextResponse.json({ ok: true, message });
}
