import { getDictionary } from '../lib/i18n';

export default async function Home() {
  const dict = getDictionary();
  return (
    <section className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">{dict['app.title']}</h1>
        <p className="mt-2 text-sm text-gray-700">{dict['app.tagline']}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <a
            className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800"
            href="/requests/new"
          >
            {dict['landing.cta.submit']}
          </a>
          <a className="rounded border border-gray-300 px-4 py-2 text-gray-800" href="/requests">
            {dict['landing.cta.view']}
          </a>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-lg bg-white p-4 text-sm shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Lite Mode</h2>
          <p className="mt-2 text-gray-700">
            Optimized for slow connections. Toggle anytime from the header.
          </p>
        </article>
        <article className="rounded-lg bg-white p-4 text-sm shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Dynamic Map</h2>
          <p className="mt-2 text-gray-700">
            Maps load only when you choose, keeping data usage minimal.
          </p>
        </article>
      </div>
    </section>
  );
}
