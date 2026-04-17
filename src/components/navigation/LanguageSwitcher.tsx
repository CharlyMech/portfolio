'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavArrowDown, Translate } from 'iconoir-react';
import { useLocaleStore } from '@/stores/localeStore';
import { locales, localeLabels } from '@/i18n';
import type { Locale } from '@/i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative" aria-label="Language switcher">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 border border-border px-2.5 py-1 h-7
                   text-code-xs
                   text-foreground-muted hover:text-foreground-secondary
                   transition-colors duration-200 outline-none"
      >
        <Translate width={12} height={12} strokeWidth={1.5} color="currentColor" />
        {localeLabels[locale]}
        <NavArrowDown
          width={10}
          height={10}
          strokeWidth={2}
          color="currentColor"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 mt-1 z-50 min-w-full
                       border border-border bg-background shadow-md"
          >
            {locales.map((lang: Locale) => (
              <li key={lang}>
                <button
                  type="button"
                  role="option"
                  aria-selected={locale === lang}
                  onClick={() => { setLocale(lang); setOpen(false); }}
                  className={`w-full px-2.5 py-1.5 text-left
                              text-code-xs
                              transition-colors duration-150
                              ${locale === lang
                                ? 'text-accent bg-accent/5'
                                : 'text-foreground-muted hover:text-foreground-secondary hover:bg-accent/5'
                              }`}
                >
                  {localeLabels[lang]}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
