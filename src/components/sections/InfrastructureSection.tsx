/** ============================================================
 * InfrastructureSection — Core skills grid
 * Shows tech stack in categorized columns with status tags
 * ============================================================ */

'use client';

import { motion } from 'framer-motion';
import { SKILL_CATEGORIES, EXPERIENCE } from '@/data/portfolio';
import type { ExperienceEntry } from '@/types';
import { useTranslations } from '@/i18n/useTranslations';

const DISPLAY_CATEGORIES = ['languages', 'frameworks', 'databases'];
const OPS_CATEGORIES = ['ops', 'design'];

export default function InfrastructureSection() {
  const t = useTranslations();
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] border-b border-border">
      {/* Left — Skills grid */}
      <div className="border-b md:border-b-0 md:border-r border-border">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 sm:px-8 py-5 border-b border-border">
          <h2 className="font-display font-black text-xl tracking-tight">
            {t.infrastructure.heading}
          </h2>
          <div className="flex items-center gap-2">
            <span className="label-mono">{t.infrastructure.systemReport}</span>
            <span className="font-mono text-accent text-base">⊞</span>
          </div>
        </div>

        {/* Main skills — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {SKILL_CATEGORIES.filter((c) => DISPLAY_CATEGORIES.includes(c.id)).map(
            (cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <p className="label-mono mb-4">{cat.sublabel}</p>
                <ul className="space-y-2">
                  {cat.skills.map((skill) => (
                    <li key={skill.name} className="skill-item">
                      <span>{skill.name}</span>
                      <span className="font-mono text-2xs text-accent ml-auto">
                        [OK]
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ),
          )}
        </div>

        {/* Bottom — Ops & Design tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border border-t border-border">
          {SKILL_CATEGORIES.filter((c) => OPS_CATEGORIES.includes(c.id)).map(
            (cat) => (
              <div key={cat.id} className="p-5">
                <p className="label-mono mb-3">{cat.sublabel}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill.name} className="tech-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Right — Experience log */}
      <ExperienceLog t={t} />
    </div>
  );
}

function ExperienceLog({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div>
      <div className="px-6 py-5 border-b border-border">
        <h2 className="font-display font-black text-xl tracking-tight">
          {t.infrastructure.logHistory}
        </h2>
      </div>
      <div className="divide-y divide-border">
        {EXPERIENCE.map((entry: ExperienceEntry, i: number) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`p-5 timeline-entry ${entry.isCurrent ? 'active' : ''}`}
          >
            {/* Period + progress bar */}
            <div className="flex items-center gap-3 mb-2">
              <span className="label-mono text-text-muted">{entry.period}</span>
              <div className="flex-1 progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: entry.isCurrent ? '100%' : `${70 - i * 15}%` }}
                />
              </div>
            </div>

            {/* Role */}
            <h3 className="font-display font-black text-base uppercase tracking-tight mb-0.5">
              {entry.role}
            </h3>
            <p className="label-mono text-text-muted mb-2">{entry.company}</p>
            <p className="font-body text-xs text-text-secondary leading-relaxed">
              {entry.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
