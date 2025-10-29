import { prisma } from '../../../lib/db';
import { getDictionary } from '../../../lib/i18n';
import RequestFilters from '../../../components/forms/RequestFilters';
import { Suspense } from 'react';
import { LiteGuard } from '../../../lib/lite';

interface Props {
  searchParams?: Record<string, string | string[]>;
}

export default async function RequestsPage({ searchParams }: Props) {
  const dict = getDictionary();
  const filters = parseFilters(searchParams);
  const requests = await prisma.request.findMany({
    where: {
      type: filters.type,
      status: filters.status,
      commune: filters.commune,
      description: filters.query ? { contains: filters.query, mode: 'insensitive' } : undefined
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
    skip: (filters.page - 1) * 20,
    select: {
      id: true,
      type: true,
      status: true,
      commune: true,
      description: true,
      createdAt: true
    }
  });

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold text-gray-900">{dict['requests.title']}</h1>
        <p className="text-sm text-gray-600">{dict['requests.filters']}</p>
      </header>
      <Suspense fallback={<p>Loading...</p>}>
        <RequestFilters dict={dict} />
      </Suspense>
      <LiteGuard fallback={<p className="text-xs text-gray-600">{dict['lite.fallback']}</p>}>
        <ul className="space-y-3">
          {requests.length === 0 && <li className="text-sm text-gray-600">{dict['requests.empty']}</li>}
          {requests.map((request) => (
            <li key={request.id} className="rounded border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-1 text-sm text-gray-700">
                <span className="font-semibold text-gray-900">{dict[`request.type.${request.type}`]}</span>
                <span>{request.commune}</span>
                <span>{dict[`request.status.${request.status}`]}</span>
                <p className="text-xs text-gray-600">{request.description.slice(0, 120)}...</p>
                <a className="text-xs text-blue-600" href={`/requests/${request.id}`}>
                  {dict['nav.view']}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </LiteGuard>
    </section>
  );
}

function parseFilters(params?: Record<string, string | string[]>) {
  const page = Number(params?.page ?? '1') || 1;
  return {
    page,
    status: (params?.status as string) || undefined,
    type: (params?.type as string) || undefined,
    commune: (params?.commune as string) || undefined,
    query: (params?.q as string) || undefined
  };
}
