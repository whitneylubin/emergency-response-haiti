import 'server-only';
import { cookies } from 'next/headers';
import ht from '../i18n/ht.json';
import fr from '../i18n/fr.json';
import en from '../i18n/en.json';

type Locale = 'ht' | 'fr' | 'en';

const dictionaries = { ht, fr, en } as const satisfies Record<Locale, Record<string, string>>;

const LANG_COOKIE = process.env.LANG_COOKIE_NAME ?? 'supporthaiti_lang';

export function getLocale(): Locale {
  const cookieStore = cookies();
  const cookieLang = cookieStore.get(LANG_COOKIE)?.value as Locale | undefined;
  return cookieLang && cookieLang in dictionaries ? cookieLang : 'ht';
}

export function getDictionary(locale?: Locale) {
  const current = locale ?? getLocale();
  return dictionaries[current];
}

export function t(key: string, locale?: Locale) {
  const dict = getDictionary(locale);
  return dict[key] ?? key;
}
