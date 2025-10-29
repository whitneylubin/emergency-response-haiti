import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/db';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !['ADMIN', 'RESPONDER'].includes((session.user as any)?.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  const { status } = await request.json();
  const allowed = ['NEW', 'IN_REVIEW', 'DISPATCHED', 'RESOLVED', 'REJECTED'];
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  await prisma.request.update({
    where: { id: params.id },
    data: { status }
  });
  return NextResponse.json({ ok: true });
}
