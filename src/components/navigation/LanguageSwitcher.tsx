/** ============================================================
 * LanguageSwitcher — Animated pill toggle between EN / ES
 * ============================================================ */

'use client';

import { usePill } from './AnimatedPill';
import { useLocaleStore } from '@/i18n/localeStore';
import { locales } from '@/i18n';
import type { Locale } from '@/i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore();
  const { containerRef, setItemRef, pill } = usePill<Locale>(locale, { variant: 'fill' });

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="relative flex items-center border border-border rounded-sm overflow-hidden"
      role="group"
      aria-label="Language switcher"
    >
      {pill}

      {locales.map((lang: Locale) => (
        <button
          key={lang}
          ref={(el) => setItemRef(lang, el)}
          onClick={() => setLocale(lang)}
          aria-pressed={locale === lang}
          className={`relative z-10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase
                      transition-colors duration-200
                      ${locale === lang ? 'text-accent' : 'text-text-muted hover:text-text-secondary'}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
