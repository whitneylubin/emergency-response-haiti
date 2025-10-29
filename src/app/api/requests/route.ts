import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { rateLimit } from '../../../lib/rateLimit';
import { requestSchema } from '../../../lib/schemas';
import crypto from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export async function POST(request: NextRequest) {
  const limit = rateLimit(request);
  if (!limit.ok) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const formData = await request.formData();
  const rawValues = Object.fromEntries(formData.entries());
  try {
    const parsed = requestSchema.parse(rawValues);
    let photoPath: string | undefined;
    const file = formData.get('photo');
    if (file && typeof file !== 'string') {
      const arrayBuffer = await file.arrayBuffer();
      if (arrayBuffer.byteLength > 1024 * 1024) {
        return NextResponse.json({ error: 'File too large' }, { status: 400 });
      }
      const fileName = `${Date.now()}-${file.name}`;
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(arrayBuffer));
      photoPath = `/uploads/${fileName}`;
    }

    await prisma.request.create({
      data: {
        type: parsed.type,
        description: parsed.description,
        commune: parsed.commune,
        lat: parsed.lat ?? undefined,
        lng: parsed.lng ?? undefined,
        contactName: parsed.contactName,
        contactPhone: parsed.contactPhone,
        contactEmail: parsed.contactEmail,
        photoPath,
        publicHash: crypto.randomBytes(12).toString('hex')
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const status = searchParams.get('status') ?? undefined;
  const type = searchParams.get('type') ?? undefined;
  const commune = searchParams.get('commune') ?? undefined;
  const q = searchParams.get('q') ?? undefined;
  const data = await prisma.request.findMany({
    take: 20,
    skip: (page - 1) * 20,
    orderBy: { createdAt: 'desc' },
    where: {
      status: status as any,
      type: type as any,
      commune: commune || undefined,
      description: q ? { contains: q, mode: 'insensitive' } : undefined
    }
  });
  return NextResponse.json(data);
}
