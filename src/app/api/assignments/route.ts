import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/db';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  const { requestId, responderId, note } = await request.json();
  await prisma.assignment.create({
    data: {
      requestId,
      responderId,
      note
    }
  });
  return NextResponse.json({ ok: true });
}
