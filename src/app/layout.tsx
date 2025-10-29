import '../styles/globals.css';
import type { Metadata } from 'next';
import { getDictionary, getLocale } from '../lib/i18n';
import { LiteProvider } from '../lib/lite';
import { Header } from '../components/ui/Header';

export const metadata: Metadata = {
  title: 'SupportHaiti',
  description: 'Low-bandwidth disaster support portal for Haiti',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  const dict = getDictionary(locale);
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gray-100">
        <LiteProvider>
          <Header dict={dict} locale={locale} />
          <main className="mx-auto w-full max-w-5xl px-4 py-6">{children}</main>
        </LiteProvider>
      </body>
    </html>
  );
}
