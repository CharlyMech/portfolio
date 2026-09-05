'use client';

import { PROFILE } from '@/constants/profile';
import { useTranslations } from '@/hooks/use-translations';

export interface Props {
  className?: string;
}

/** Availability status list shared by the hero and the page headers. */
export default function CurrentStatus({ className }: Props) {
  const t = useTranslations();

  return (
    <div className={`space-y-2 ${className ?? ''}`}>
      <p className="label-mono text-foreground-muted">{t.hero.currentStatus}</p>
      <ul className="space-y-1.5 text-left" aria-label={t.hero.currentStatus}>
        <li className="flex items-center gap-2 text-code-xs text-foreground-secondary">
          <span
            className={`status-dot shrink-0 ${PROFILE.status.available ? 'available' : 'busy'}`}
            aria-hidden
          />
          <span>
            {PROFILE.status.available ? t.hero.availableForHire : t.hero.notAvailableForHire}
          </span>
        </li>
        <li className="flex items-center gap-2 text-code-xs text-foreground-secondary">
          <span
            className={`status-dot shrink-0 ${PROFILE.status.availableForFreelance ? 'available' : 'busy'}`}
            aria-hidden
          />
          <span>
            {PROFILE.status.availableForFreelance
              ? t.hero.availableForFreelance
              : t.hero.notAvailableForFreelance}
          </span>
        </li>
      </ul>
    </div>
  );
}
