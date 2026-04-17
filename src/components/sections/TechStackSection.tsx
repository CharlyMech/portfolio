'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS, skillsByGroup } from '@/constants/skills';
import type { SkillGroup } from '@/core/models/skill';
import { useTranslations } from '@/hooks/use-translations';

const GROUPS: SkillGroup[] = ['main', 'other'];

const GROUP_LABELS: Record<SkillGroup, string> = {
  main: 'MAIN',
  other: 'OTHER SKILLS',
};

type FilterId = 'all' | SkillGroup;

export default function TechStackSection() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const t = useTranslations();

  const filters: Array<{ id: FilterId; label: string }> = [
    { id: 'all', label: t.skillLevel.all },
    { id: 'main', label: 'Main' },
    { id: 'other', label: 'Other Skills' },
  ];

  const visibleGroups: SkillGroup[] =
    activeFilter === 'all' ? GROUPS : [activeFilter as SkillGroup];

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 mb-8">
        <div>
          <h2 className="text-heading">{t.tech.title}</h2>
          <p className="text-body text-text-secondary mt-1">
            {SKILLS.length} {t.skillLevel.skills}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`text-code-xs px-3 py-1.5 border transition-all duration-150
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

      <div className="space-y-10">
        {visibleGroups.map((groupId, gi) => {
          const categories = skillsByGroup(groupId);
          const entries = Object.entries(categories);

          return (
            <motion.div
              key={groupId}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: gi * 0.07 }}
              viewport={{ once: true }}
            >
              {/* Group label */}
              <div className="flex items-center gap-4 mb-6">
                <span className="label-mono text-accent">{GROUP_LABELS[groupId]}</span>
                <div className="flex-1 h-px bg-border" />
                <span className="label-mono text-text-muted">
                  {SKILLS.filter((s) => s.group === groupId).length} {t.skillLevel.skills}
                </span>
              </div>

              {/* Categories */}
              <div className="space-y-6">
                {entries.map(([category, skills], ci) => (
                  <div key={category}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="label-mono text-text-muted">{category.toUpperCase()}</span>
                      <div className="flex-1 h-px bg-border/50" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {skills.map((skill, si) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: (ci * 0.03) + (si * 0.04) }}
                          viewport={{ once: true }}
                          whileHover={{ y: -2 }}
                          className="border border-border bg-bg-elevated p-4 cursor-default
                                     hover:border-accent/50 transition-colors"
                        >
                          <h4 className="text-heading-2xs">{skill.name}</h4>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
