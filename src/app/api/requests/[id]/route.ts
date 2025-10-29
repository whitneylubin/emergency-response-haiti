import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const data = await prisma.request.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      type: true,
      status: true,
      commune: true,
      description: true,
      createdAt: true,
      contactName: session ? true : false,
      contactPhone: session ? true : false,
      contactEmail: session ? true : false
    }
  });
  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(data);
}
