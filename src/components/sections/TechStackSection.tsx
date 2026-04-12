/** ============================================================
 * TechStackSection — Full interactive tech stack display
 * Filterable by level, drag-reorderable categories
 * ============================================================ */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/data/portfolio';
import type { SkillLevel } from '@/types';
import { useTranslations } from '@/hooks/use-translations';

const LEVEL_COLORS: Record<SkillLevel, string> = {
  expert: 'bg-accent',
  proficient: 'bg-accent/60',
  learning: 'bg-accent/25',
};

const LEVEL_BADGE: Record<SkillLevel, string> = {
  expert: 'text-accent border-accent/30 bg-accent/10',
  proficient: 'text-text-secondary border-border bg-bg-muted/50',
  learning: 'text-text-muted border-border/50 bg-transparent',
};

type FilterLevel = 'all' | SkillLevel;

export default function TechStackSection() {
  const [activeFilter, setActiveFilter] = useState<FilterLevel>('all');
  const t = useTranslations();

  const LEVEL_LABELS: Record<SkillLevel, string> = {
    expert: t.skillLevel.expert,
    proficient: t.skillLevel.proficient,
    learning: t.skillLevel.learning,
  };

  const FILTERS: Array<{ id: FilterLevel; label: string }> = [
    { id: 'all', label: t.skillLevel.all },
    { id: 'expert', label: t.skillLevel.expert },
    { id: 'proficient', label: t.skillLevel.proficient },
    { id: 'learning', label: t.skillLevel.learning },
  ];

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 mb-8">
        <div>
          <h2 className="text-heading">
            {t.tech.title}
          </h2>
          <p className="text-body text-text-secondary mt-1">
            {SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)} {t.skillLevel.skills}
          </p>
        </div>

        {/* Level filter */}
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

      {/* Legend */}
      <div className="flex items-center gap-6 mb-8 flex-wrap">
        {(Object.keys(LEVEL_COLORS) as SkillLevel[]).map((level) => (
          <div key={level} className="flex items-center gap-2">
            <div className={`w-8 h-1 rounded-none ${LEVEL_COLORS[level]}`} />
            <span className="label-mono">{LEVEL_LABELS[level]}</span>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {SKILL_CATEGORIES.map((cat, ci) => {
          const filteredSkills =
            activeFilter === 'all'
              ? cat.skills
              : cat.skills.filter((s) => s.level === activeFilter);

          if (filteredSkills.length === 0) return null;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: ci * 0.07 }}
              viewport={{ once: true }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-4">
                <span className="label-mono text-accent">{cat.sublabel}</span>
                <div className="flex-1 h-px bg-border" />
                <span className="label-mono text-text-muted">
                  {filteredSkills.length} {t.skillLevel.skills}
                </span>
              </div>

              {/* Skills */}
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
                                    ${LEVEL_BADGE[skill.level]}`}
                      >
                        {skill.level.slice(0, 3)}
                      </span>
                    </div>

                    {/* Level bar */}
                    <div className="progress-bar">
                      <motion.div
                        className={`progress-bar-fill ${LEVEL_COLORS[skill.level]}`}
                        initial={{ width: 0 }}
                        whileInView={{
                          width:
                            skill.level === 'expert'
                              ? '95%'
                              : skill.level === 'proficient'
                              ? '65%'
                              : '30%',
                        }}
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
