import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/db';
import { getDictionary } from '../../../lib/i18n';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  const dict = getDictionary();
  const requests = await prisma.request.findMany({
    where: { status: 'NEW' },
    take: 20,
    orderBy: { createdAt: 'desc' }
  });
  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold text-gray-900">{dict['admin.inbox']}</h1>
        <p className="text-sm text-gray-600">Latest incoming requests.</p>
      </header>
      <ul className="space-y-3">
        {requests.map((request) => (
          <li key={request.id} className="rounded border border-gray-200 bg-white p-4 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>{request.description.slice(0, 100)}</span>
              <span className="text-xs text-gray-500">{request.commune}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
