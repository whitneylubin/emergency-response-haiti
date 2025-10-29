'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface Props {
  dict: Record<string, string>;
}

export default function RequestFilters({ dict }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete('page');
    startTransition(() => router.push(`/requests?${next.toString()}`));
  };

  return (
    <form className="flex flex-wrap gap-3 text-xs text-gray-700" onSubmit={(event) => event.preventDefault()}>
      <label className="flex flex-col">
        <span>{dict['filters.status']}</span>
        <select
          defaultValue={params.get('status') ?? ''}
          onChange={(event) => updateParam('status', event.target.value)}
          disabled={isPending}
          className="rounded border border-gray-300 bg-white px-2 py-1"
        >
          <option value="">--</option>
          <option value="NEW">{dict['request.status.NEW']}</option>
          <option value="IN_REVIEW">{dict['request.status.IN_REVIEW']}</option>
          <option value="DISPATCHED">{dict['request.status.DISPATCHED']}</option>
          <option value="RESOLVED">{dict['request.status.RESOLVED']}</option>
          <option value="REJECTED">{dict['request.status.REJECTED']}</option>
        </select>
      </label>
      <label className="flex flex-col">
        <span>{dict['filters.type']}</span>
        <select
          defaultValue={params.get('type') ?? ''}
          onChange={(event) => updateParam('type', event.target.value)}
          disabled={isPending}
          className="rounded border border-gray-300 bg-white px-2 py-1"
        >
          <option value="">--</option>
          <option value="FOOD">{dict['request.type.FOOD']}</option>
          <option value="WATER">{dict['request.type.WATER']}</option>
          <option value="MEDICAL">{dict['request.type.MEDICAL']}</option>
          <option value="SHELTER">{dict['request.type.SHELTER']}</option>
          <option value="CONNECTIVITY">{dict['request.type.CONNECTIVITY']}</option>
          <option value="OTHER">{dict['request.type.OTHER']}</option>
        </select>
      </label>
      <label className="flex flex-col">
        <span>{dict['request.commune']}</span>
        <input
          type="text"
          defaultValue={params.get('commune') ?? ''}
          onChange={(event) => updateParam('commune', event.target.value)}
          disabled={isPending}
          className="rounded border border-gray-300 px-2 py-1"
        />
      </label>
      <label className="flex flex-col">
        <span>{dict['filters.search']}</span>
        <input
          type="search"
          defaultValue={params.get('q') ?? ''}
          onChange={(event) => updateParam('q', event.target.value)}
          disabled={isPending}
          className="rounded border border-gray-300 px-2 py-1"
        />
      </label>
    </form>
  );
}
