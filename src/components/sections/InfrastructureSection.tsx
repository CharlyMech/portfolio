'use client';

import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/constants/experience';
import { skillsByGroup } from '@/constants/skills';
import type { ExperienceEntry } from '@/core/models/experience';
import { useTranslations } from '@/hooks/use-translations';
import { LanguagePie } from '@/components/charts/LanguagePie';
import { CategoryCell } from '@/components/shared/CategoryCell';
import { useGitHubActivityStore } from '@/stores/githubActivityStore';

export default function InfrastructureSection() {
  const t = useTranslations();
  const { data: ghData } = useGitHubActivityStore();
  const topLanguages = ghData?.topLanguages;
  const mainCategories = Object.entries(skillsByGroup('main'));
  const otherByCategory = skillsByGroup('other');
  const showPie = topLanguages && topLanguages.length > 0;

  const topRow = ['Mobile', 'Front-end', 'Back-end'].map((cat) => [cat, otherByCategory[cat] ?? []] as const);
  const fullRows = ['Databases', 'Data & AI', 'Cloud & Ops'].map((cat) => [cat, otherByCategory[cat] ?? []] as const);

  return (
    <div className="border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] border-b border-border">
        <div className="border-b md:border-b-0 md:border-r border-border flex flex-col">
          <div className="px-6 sm:px-8 py-5 border-b border-border flex items-center justify-between">
            <h2 className="text-heading-sm">{t.infrastructure.heading}</h2>
            <span className="label-mono text-foreground-muted">MAIN</span>
          </div>

          <div className="flex flex-col sm:flex-row flex-1 border-b border-border">
            {showPie && (
              <div className="sm:w-64 lg:w-[350px] flex-shrink-0 border-b sm:border-b-0 sm:border-r border-border p-4 flex items-center justify-center">
                <LanguagePie languages={topLanguages} />
              </div>
            )}
            <div className="flex-1 divide-y divide-border flex flex-col">
              {mainCategories.map(([category, skills], i) => (
                <CategoryCell className='flex-1' key={category} category={category} skills={skills} index={i} />
              ))}
            </div>
          </div>

          <div className="border-t border-border">
            <div className="px-6 sm:px-8 py-3 border-b border-border bg-elevated">
              <span className="label-mono text-foreground-muted">MORE SKILLS</span>
            </div>
            {/* Mobile · Front-end · Back-end — 3 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border-b border-border">
              {topRow.map(([category, skills], i) => (
                <CategoryCell key={category} category={category} skills={skills as { name: string; icon?: string }[]} index={i} />
              ))}
            </div>
            {/* Databases, Data & AI, Cloud & Ops — full-width rows */}
            <div className="divide-y divide-border">
              {fullRows.map(([category, skills], i) => (
                <CategoryCell key={category} category={category} skills={skills as { name: string; icon?: string }[]} index={topRow.length + i} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column: experience log */}
        <ExperienceLog t={t} />
      </div>
    </div>
  );
}

const LOG_LIMIT = 3;

function ExperienceLog({ t }: { t: ReturnType<typeof useTranslations> }) {
  const entries = EXPERIENCE.slice(0, LOG_LIMIT);

  return (
    <div className="flex flex-col">
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <h2 className="text-heading-sm">{t.infrastructure.logHistory}</h2>
        <a href="/experience" className="label-mono text-foreground-muted hover:text-accent transition-colors">
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
              <span className="label-mono text-foreground-muted">{entry.period}</span>
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
            <p className="label-mono text-foreground-muted mb-2">{entry.company}</p>
            <p className="text-body-xs text-foreground-secondary line-clamp-2">{entry.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-4 border-t border-border">
        <a href="/experience" className="label-mono text-foreground-muted hover:text-accent transition-colors">
          {EXPERIENCE.length - LOG_LIMIT} {t.experienceSection.entries} {t.infrastructure.viewAll}
        </a>
      </div>
    </div>
  );
}
