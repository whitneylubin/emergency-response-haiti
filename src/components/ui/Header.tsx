'use client';

import Link from 'next/link';
import { useLiteMode } from '../../lib/lite';
import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  dict: Record<string, string>;
  locale: string;
}

const langOptions = [
  { value: 'ht', label: 'Kreyòl' },
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' }
];

export function Header({ dict, locale }: HeaderProps) {
  const { lite, setLite, suggested, dismissSuggestion } = useLiteMode();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [language, setLanguage] = useState(locale);

  const langCookie = process.env.NEXT_PUBLIC_LANG_COOKIE ?? 'supporthaiti_lang';

  const switchLanguage = (value: string) => {
    setLanguage(value);
    document.cookie = `${langCookie}=${value};path=/;max-age=31536000`;
    startTransition(() => router.refresh());
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 text-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold text-gray-900">
            {dict['app.title']}
          </Link>
          <nav className="hidden gap-3 sm:flex">
            <Link href="/requests" className="text-gray-700 hover:text-gray-900">
              {dict['nav.view']}
            </Link>
            <Link href="/requests/new" className="text-gray-700 hover:text-gray-900">
              {dict['nav.submit']}
            </Link>
            <Link href="/map" className="text-gray-700 hover:text-gray-900">
              {dict['nav.map']}
            </Link>
            <Link href="/settings" className="text-gray-700 hover:text-gray-900">
              {dict['nav.settings']}
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-gray-900">
              {dict['auth.login']}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <select
            aria-label={dict['settings.language']}
            className="rounded border border-gray-300 bg-white px-2 py-1"
            value={language}
            onChange={(event) => switchLanguage(event.target.value)}
            disabled={isPending}
          >
            {langOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setLite(!lite)}
            className="rounded border border-gray-300 px-3 py-1 text-xs text-gray-700"
            type="button"
          >
            {lite ? dict['lite.disable'] : dict['lite.enable']}
          </button>
        </div>
      </div>
      {suggested && (
        <div className="bg-yellow-100 px-4 py-2 text-xs text-yellow-900">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <span>{dict['lite.banner']}</span>
            <div className="flex gap-2">
              <button className="underline" onClick={() => setLite(true)}>
                {dict['lite.enable']}
              </button>
              <button className="underline" onClick={dismissSuggestion}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
