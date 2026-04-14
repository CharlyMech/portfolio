'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/constants/skills';
import type { SkillTier } from '@/types';
import { useTranslations } from '@/hooks/use-translations';

const TIER_COLORS: Record<SkillTier, string> = {
  primary: 'bg-accent',
  secondary: 'bg-accent/60',
  familiar: 'bg-accent/25',
};

const TIER_BADGE: Record<SkillTier, string> = {
  primary: 'text-accent border-accent/30 bg-accent/10',
  secondary: 'text-text-secondary border-border bg-bg-muted/50',
  familiar: 'text-text-muted border-border/50 bg-transparent',
};

const TIER_BAR_WIDTH: Record<SkillTier, string> = {
  primary: '95%',
  secondary: '65%',
  familiar: '30%',
};

type FilterTier = 'all' | SkillTier;

export default function TechStackSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTier>('all');
  const t = useTranslations();

  const TIER_LABELS: Record<SkillTier, string> = {
    primary: t.skillLevel.expert,
    secondary: t.skillLevel.proficient,
    familiar: t.skillLevel.learning,
  };

  const FILTERS: Array<{ id: FilterTier; label: string }> = [
    { id: 'all', label: t.skillLevel.all },
    { id: 'primary', label: t.skillLevel.expert },
    { id: 'secondary', label: t.skillLevel.proficient },
    { id: 'familiar', label: t.skillLevel.learning },
  ];

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 mb-8">
        <div>
          <h2 className="text-heading">
            {t.tech.title}
          </h2>
          <p className="text-body text-text-secondary mt-1">
            {SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)} {t.skillLevel.skills}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`text-code-xs px-3 py-1.5
                          border transition-all duration-150
                          ${
                            activeFilter === f.id
                              ? 'border-accent text-accent bg-accent/10'
                              : 'border-border text-text-muted hover:border-text-secondary hover:text-text-secondary'
                          }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 mb-8 flex-wrap">
        {(Object.keys(TIER_COLORS) as SkillTier[]).map((tier) => (
          <div key={tier} className="flex items-center gap-2">
            <div className={`w-8 h-1 rounded-none ${TIER_COLORS[tier]}`} />
            <span className="label-mono">{TIER_LABELS[tier]}</span>
          </div>
        ))}
      </div>

      <div className="space-y-10">
        {SKILL_CATEGORIES.map((cat, ci) => {
          const filteredSkills =
            activeFilter === 'all'
              ? cat.skills
              : cat.skills.filter((s) => s.tier === activeFilter);

          if (filteredSkills.length === 0) return null;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: ci * 0.07 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="label-mono text-accent">{cat.sublabel}</span>
                <div className="flex-1 h-px bg-border" />
                <span className="label-mono text-text-muted">
                  {filteredSkills.length} {t.skillLevel.skills}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredSkills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: si * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2 }}
                    className="border border-border bg-bg-elevated p-4 cursor-default
                               hover:border-accent/50 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h4 className="text-heading-2xs">
                        {skill.name}
                      </h4>
                      <span
                        className={`flex-shrink-0 text-code-xs
                                    px-1.5 py-0.5 border rounded-none
                                    ${TIER_BADGE[skill.tier]}`}
                      >
                        {skill.tier.slice(0, 3)}
                      </span>
                    </div>

                    <div className="progress-bar">
                      <motion.div
                        className={`progress-bar-fill ${TIER_COLORS[skill.tier]}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: TIER_BAR_WIDTH[skill.tier] }}
                        transition={{ duration: 0.8, delay: si * 0.05 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
