/**
 * useTranslations — React hook
 * Returns the translation dictionary for the current locale.
 */
import { useLocaleStore } from './localeStore';
import { getTranslations } from './index';

export function useTranslations() {
  const locale = useLocaleStore((s) => s.locale);
  return getTranslations(locale);
}
