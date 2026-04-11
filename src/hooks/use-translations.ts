/**
 * useTranslations — React hook
 * Returns the translation dictionary for the current locale.
 */
import { useLocaleStore } from '@/stores/localeStore';
import { getTranslations } from '@/i18n';

export function useTranslations() {
  const locale = useLocaleStore((s) => s.locale);
  return getTranslations(locale);
}
