/**
 * Locale store — Zustand store that:
 *  1. Detects browser language on first visit
 *  2. Persists the user's choice to localStorage
 *  3. Provides reactive locale to all React components
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '@/i18n';
import { locales, defaultLocale } from '@/i18n';

function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale;
  const lang = navigator.language?.split('-')[0];
  return (locales as string[]).includes(lang) ? (lang as Locale) : defaultLocale;
}

interface LocaleState {
  locale: Locale;
  /** true once the store has hydrated from localStorage */
  hydrated: boolean;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: defaultLocale,
      hydrated: false,
      setLocale: (locale) => {
        set({ locale });
        if (typeof document !== 'undefined') {
          document.getElementById('html-root')?.setAttribute('lang', locale);
          document.dispatchEvent(
            new CustomEvent('portfolio:locale-change', { detail: { locale } }),
          );
        }
      },
    }),
    {
      name: 'portfolio-locale',
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        // If no prior preference was stored, detect from browser
        if (!state.locale) {
          state.locale = detectBrowserLocale();
        }
        state.hydrated = true;
      },
    },
  ),
);

/**
 * Call once at app boot (client-side) to seed the locale from the browser
 * when no persisted value exists yet.
 */
export function initLocale() {
  const store = useLocaleStore.getState();
  if (!store.hydrated) {
    const detected = detectBrowserLocale();
    useLocaleStore.setState({ locale: detected, hydrated: true });
  }
}
