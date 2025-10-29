import { getDictionary } from '../../lib/i18n';

export default async function SettingsPage() {
  const dict = getDictionary();
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">{dict['nav.settings']}</h1>
      <p className="text-sm text-gray-600">
        Lite Mode and language preferences can be adjusted from the header controls.
      </p>
    </section>
  );
}
