/**
 * Drop-in replacement for PageHeader.astro when i18n reactivity is needed.
 * Reads translations from the locale store, re-renders on locale change.
 */

'use client';

import { useTranslations } from '@/hooks/use-translations';
import type { Translations } from '@/i18n/i-translate';

export interface Props {
  section: keyof Pick<
    Translations,
    'experience' | 'projects' | 'services' | 'blog' | 'tech' | 'contact'
  >;
  [key: string]: unknown;
}

export default function PageHeaderReactive({ section }: Props) {
  const t = useTranslations();
  const s = t[section] as { label: string; title: string; subtitle?: string };

  return (
    <header className="border-b border-border px-6 sm:px-8 md:px-10 py-8">
      <p className="label-mono text-accent mb-2">{s.label}</p>
      <h1 className="text-heading-page">
        {s.title}
      </h1>
      {s.subtitle && (
        <p className="text-body text-foreground-secondary mt-4 max-w-xl">
          {s.subtitle}
        </p>
      )}
    </header>
  );
}
