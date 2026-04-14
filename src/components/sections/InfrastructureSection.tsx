'use client';

import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/constants/skills';
import { EXPERIENCE } from '@/constants/experience';
import type { ExperienceEntry, SkillTier } from '@/types';
import { useTranslations } from '@/hooks/use-translations';

const TIER_ORDER: SkillTier[] = ['primary', 'secondary', 'familiar'];

/** Dot indicator per tier */
function TierDot({ tier }: { tier: SkillTier }) {
  const colors: Record<SkillTier, string> = {
    primary: 'bg-accent',
    secondary: 'bg-text-secondary',
    familiar: 'bg-text-muted/50',
  };
  return <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors[tier]}`} />;
}

/** One category column */
function SkillColumn({
  cat,
  index,
  t,
}: {
  cat: typeof SKILL_CATEGORIES[number];
  index: number;
  t: ReturnType<typeof useTranslations>;
}) {
  const byTier = TIER_ORDER.reduce<Record<SkillTier, string[]>>(
    (acc, tier) => {
      acc[tier] = cat.skills.filter((s) => s.tier === tier).map((s) => s.name);
      return acc;
    },
    { primary: [], secondary: [], familiar: [] },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true }}
      className="p-5 flex flex-col gap-4"
    >
      <p className="label-mono">{cat.sublabel}</p>

      {TIER_ORDER.map((tier) => {
        const names = byTier[tier];
        if (!names.length) return null;
        return (
          <div key={tier}>
            <p className="text-code-2xs text-text-muted mb-1.5">
              {t.skillTier[tier]}
            </p>
            <div className="flex flex-col gap-1">
              {names.map((name) => (
                <div key={name} className="flex items-center gap-2">
                  <TierDot tier={tier} />
                  <span className="text-code normal-case tracking-normal text-text-secondary">{name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

export default function InfrastructureSection() {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] border-b border-border">
      <div className="border-b md:border-b-0 md:border-r border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 sm:px-8 py-5 border-b border-border">
          <h2 className="text-heading-sm">
            {t.infrastructure.heading}
          </h2>
          <div className="flex items-center gap-3">
            {/* Tier legend */}
            {/* Tier legend — hidden on mobile, shown in skill column labels instead */}
            <div className="hidden sm:flex items-center gap-3">
              {TIER_ORDER.map((tier) => (
                <div key={tier} className="flex items-center gap-1.5">
                  <TierDot tier={tier} />
                  <span className="text-code-2xs text-text-muted">
                    {t.skillTier[tier]}
                  </span>
                </div>
              ))}
            </div>
            <span className="label-mono text-text-muted hidden sm:block">·</span>
            <span className="label-mono">{t.infrastructure.systemReport}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 divide-x divide-border [&>*:nth-child(n+4)]:border-t [&>*:nth-child(n+4)]:border-border">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillColumn key={cat.id} cat={cat} index={i} t={t} />
          ))}
        </div>
      </div>

      <ExperienceLog t={t} />
    </div>
  );
}

const LOG_LIMIT = 3;

function ExperienceLog({ t }: { t: ReturnType<typeof useTranslations> }) {
  const entries = EXPERIENCE.slice(0, LOG_LIMIT);

  return (
    <div className="flex flex-col">
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <h2 className="text-heading-sm">
          {t.infrastructure.logHistory}
        </h2>
        <a
          href="/experience"
          className="label-mono text-text-muted hover:text-accent transition-colors"
        >
          {t.infrastructure.viewAll}
        </a>
      </div>

      <div className="divide-y divide-border flex-1">
        {entries.map((entry: ExperienceEntry, i: number) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`p-5 timeline-entry ${entry.isCurrent ? 'active' : ''}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="label-mono text-text-muted">{entry.period}</span>
              <div className="flex-1 progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: entry.isCurrent ? '100%' : `${70 - i * 18}%` }}
                />
              </div>
            </div>
            <h3 className="font-display font-black text-base tracking-tight uppercase mb-0.5">
              {entry.role}
            </h3>
            <p className="label-mono text-text-muted mb-2">{entry.company}</p>
            <p className="text-body-xs text-text-secondary line-clamp-2">
              {entry.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-4 border-t border-border">
        <a
          href="/experience"
          className="label-mono text-text-muted hover:text-accent transition-colors"
        >
          {EXPERIENCE.length - LOG_LIMIT} {t.experienceSection.entries} {t.infrastructure.viewAll}
        </a>
      </div>
    </div>
  );
}
