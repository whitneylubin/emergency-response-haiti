import { notFound } from 'next/navigation';
import { prisma } from '../../../../lib/db';
import { getDictionary } from '../../../../lib/i18n';

interface Props {
  params: { id: string };
}

export default async function RequestDetail({ params }: Props) {
  const dict = getDictionary();
  const request = await prisma.request.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      type: true,
      status: true,
      commune: true,
      description: true,
      createdAt: true,
      photoPath: true,
      source: true
    }
  });

  if (!request) {
    notFound();
  }

  return (
    <article className="space-y-4 rounded bg-white p-6 shadow-sm">
      <header className="border-b border-gray-200 pb-3">
        <h1 className="text-xl font-semibold text-gray-900">{dict[`request.type.${request.type}`]}</h1>
        <p className="text-sm text-gray-600">{dict[`request.status.${request.status}`]}</p>
      </header>
      <p className="text-sm text-gray-700">{request.description}</p>
      <dl className="grid grid-cols-1 gap-2 text-xs text-gray-600 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-gray-800">Commune</dt>
          <dd>{request.commune}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-800">Source</dt>
          <dd>{request.source}</dd>
        </div>
      </dl>
      {request.photoPath ? (
        <img
          src={request.photoPath}
          alt="Request photo"
          className="max-h-64 w-full rounded object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-32 items-center justify-center rounded border border-dashed border-gray-300 text-xs text-gray-500">
          No image available
        </div>
      )}
    </article>
  );
}
