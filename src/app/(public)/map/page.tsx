import { prisma } from '../../../lib/db';
import { RequestMap } from '../../../components/map/RequestMap';
import { getDictionary } from '../../../lib/i18n';

export default async function MapPage() {
  const dict = getDictionary();
  const requests = await prisma.request.findMany({
    select: { id: true, lat: true, lng: true, description: true },
    take: 50
  });

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold text-gray-900">{dict['nav.map']}</h1>
        <p className="text-sm text-gray-600">Map loads on demand to save data.</p>
      </header>
      <RequestMap
        requests={requests.map((item) => ({
          id: item.id,
          lat: item.lat,
          lng: item.lng,
          summary: item.description.slice(0, 80)
        }))}
        toggleLabel={dict['map.toggle']}
        liteFallback={dict['lite.fallback']}
      />
      <p className="text-xs text-gray-600">
        If the map fails to load, stay with the request list for reliable access.
      </p>
      <a className="text-xs text-blue-600 underline" href="https://www.openstreetmap.org/#map=7/18.6/-72.3" target="_blank" rel="noreferrer">
        {dict['map.offline']}
      </a>
    </section>
  );
}
