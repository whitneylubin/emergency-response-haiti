import { getDictionary } from '../../../lib/i18n';
import LoginForm from '../../../components/forms/LoginForm';

export default async function LoginPage() {
  const dict = getDictionary();
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">{dict['auth.login']}</h1>
      <LoginForm dict={dict} />
    </section>
  );
}
