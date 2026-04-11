import { en } from './en';
import { es } from './es';

export type Locale = 'en' | 'es';

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'es'];

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

const translations = { en, es } as const;

/**
 * Returns the translation dictionary for the given locale.
 * Falls back to English when locale is undefined or unsupported.
 */
export function getTranslations(locale: string | undefined) {
  const key = (locale ?? defaultLocale) as Locale;
  return translations[key] ?? translations[defaultLocale];
}

/**
 * Extracts the locale from a URL pathname.
 * e.g. "/es/projects" → "es", "/projects" → "en"
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split('/')[1];
  return (locales as string[]).includes(segment)
    ? (segment as Locale)
    : defaultLocale;
}

/**
 * Returns the alternate-locale path for a given pathname.
 * e.g. "/projects" → "/es/projects", "/es/projects" → "/projects"
 */
export function getAlternatePath(pathname: string, targetLocale: Locale): string {
  const currentLocale = getLocaleFromPath(pathname);

  // Strip existing locale prefix if present
  const withoutLocale =
    currentLocale !== defaultLocale
      ? pathname.replace(`/${currentLocale}`, '') || '/'
      : pathname;

  return targetLocale === defaultLocale
    ? withoutLocale
    : `/${targetLocale}${withoutLocale === '/' ? '' : withoutLocale}`;
}
