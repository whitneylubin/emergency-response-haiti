'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { LiteGuard } from '../../lib/lite';

const LeafletMap = dynamic(() => import('./leaflet/LeafletMap'), {
  ssr: false,
  loading: () => <p className="text-xs text-gray-600">Loading map...</p>
});

interface Props {
  requests: Array<{ id: string; lat: number | null; lng: number | null; summary: string }>;
  toggleLabel?: string;
  liteFallback?: string;
}

const STATIC_MAP_DATA_URI =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAJ0lEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAPwdA3kAAUouWz0AAAAASUVORK5CYII=';

export function RequestMap({ requests, toggleLabel = 'Toggle map', liteFallback = 'Map disabled in Lite Mode.' }: Props) {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="space-y-3">
      {!enabled && (
        <button
          type="button"
          className="rounded border border-gray-300 px-3 py-1 text-xs text-gray-700"
          onClick={() => setEnabled(true)}
        >
          {toggleLabel}
        </button>
      )}
      <LiteGuard fallback={<p className="text-xs text-gray-600">{liteFallback}</p>}>
        {enabled ? (
          <LeafletMap requests={requests} />
        ) : (
          <img
            src={STATIC_MAP_DATA_URI}
            alt="Static map"
            className="h-64 w-full rounded border border-gray-200 object-cover"
            loading="lazy"
          />
        )}
      </LiteGuard>
    </div>
  );
}
