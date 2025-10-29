import { getDictionary } from '../../../../lib/i18n';
import { NewRequestForm } from '../../../../components/forms/NewRequestForm';

export default async function NewRequestPage() {
  const dict = getDictionary();
  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold text-gray-900">{dict['nav.submit']}</h1>
      </header>
      <NewRequestForm dict={dict} />
    </section>
  );
}
