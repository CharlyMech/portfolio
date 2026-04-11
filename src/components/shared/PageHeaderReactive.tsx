/** ============================================================
 * PageHeaderReactive — Client-side page header that reacts to locale changes.
 * Drop-in replacement for PageHeader.astro when i18n is needed.
 * ============================================================ */

'use client';

import { useTranslations } from '@/hooks/use-translations';
import type { Translations } from '@/i18n/en';

interface Props {
  section: keyof Pick<
    Translations,
    'experience' | 'projects' | 'services' | 'blog' | 'tech' | 'contact'
  >;
}

export default function PageHeaderReactive({ section }: Props) {
  const t = useTranslations();
  const s = t[section] as { label: string; title: string; subtitle?: string };

  return (
    <header className="border-b border-border px-6 sm:px-8 md:px-10 py-8">
      <p className="label-mono text-accent mb-2">{s.label}</p>
      <h1 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight">
        {s.title}
      </h1>
      {s.subtitle && (
        <p className="font-body text-sm text-text-secondary mt-4 max-w-xl leading-relaxed">
          {s.subtitle}
        </p>
      )}
    </header>
  );
}
