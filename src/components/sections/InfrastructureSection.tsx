'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  getCertificateEntries,
  getEducationEntries,
  getExperienceEntries,
} from '@/constants/experience';
import { skillsByGroup } from '@/constants/skills';
import type { Education, ExperienceEntry } from '@/core/models/experience';
import { useTranslations } from '@/hooks/use-translations';
import { Skeleton } from 'boneyard-js/react';
import { LanguagePie } from '@/components/charts/LanguagePie';
import { CategoryCell } from '@/components/shared/CategoryCell';
import { useGitHubActivityStore } from '@/stores/githubActivityStore';
import { useLocaleStore } from '@/stores/localeStore';

export default function InfrastructureSection() {
  const t = useTranslations();
  const { data: ghData, loading: ghLoading } = useGitHubActivityStore();
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
            {(showPie || ghLoading) && (
              <div className="sm:w-64 lg:w-[350px] flex-shrink-0 border-b sm:border-b-0 sm:border-r border-border p-4 flex items-center justify-center">
                <Skeleton name="language-pie" loading={ghLoading} className="w-full">
                  {showPie && <LanguagePie languages={topLanguages} />}
                </Skeleton>
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

const ROTATION_INTERVAL_MS = 5000;
const CATEGORY_ORDER = ['experience', 'education', 'certificate'] as const;

type LogCategory = (typeof CATEGORY_ORDER)[number];

type LogEntry = {
  id: string;
  category: LogCategory;
  categoryLabel: string;
  period: string;
  title: string;
  subtitle: string;
  description?: string;
  isCurrent?: boolean;
};

type LogSnapshot = {
  batch: number;
  items: LogEntry[];
};

const batchVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 24 },
};

function ExperienceLog({ t }: { t: ReturnType<typeof useTranslations> }) {
  const locale = useLocaleStore((state) => state.locale);
  const experienceEntries = getExperienceEntries(locale);
  const educationEntries = getEducationEntries(locale);
  const certificateEntries = getCertificateEntries(locale);

  const [snapshot, setSnapshot] = useState<LogSnapshot>(() => ({
    batch: 0,
    items: createLogSnapshot(t, experienceEntries, educationEntries, certificateEntries),
  }));

  useEffect(() => {
    setSnapshot({
      batch: 0,
      items: createLogSnapshot(t, experienceEntries, educationEntries, certificateEntries),
    });
  }, [locale, t]);

  useEffect(() => {
    let timeoutId: number | undefined;

    const scheduleRotation = () => {
      timeoutId = window.setTimeout(() => {
        setSnapshot((current) => ({
          batch: current.batch + 1,
          items: createLogSnapshot(
            t,
            experienceEntries,
            educationEntries,
            certificateEntries,
            current.items,
          ),
        }));
        scheduleRotation();
      }, ROTATION_INTERVAL_MS);
    };

    scheduleRotation();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [locale, t]);

  return (
    <div className="flex flex-col">
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <h2 className="text-heading-sm">{t.infrastructure.logHistory}</h2>
        <a href="/experience" className="label-mono text-foreground-muted hover:text-accent transition-colors">
          {t.infrastructure.viewAll}
        </a>
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={snapshot.batch}
            variants={batchVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="divide-y divide-border"
          >
            {snapshot.items.map((entry) => (
              <motion.article
                key={entry.id}
                variants={itemVariants}
                transition={{ duration: 0.4 }}
                className={`p-5 timeline-entry ${entry.isCurrent ? 'active' : ''}`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="label-mono text-accent uppercase">{entry.categoryLabel}</span>
                    {entry.isCurrent && <span className="status-dot available" aria-hidden />}
                  </div>
                  <span className="label-mono text-foreground-muted">{entry.period}</span>
                </div>

                <h3 className="font-display font-black text-base tracking-tight uppercase mb-0.5">
                  {entry.title}
                </h3>
                <p className="label-mono text-foreground-muted mb-2">{entry.subtitle}</p>

                {entry.description && (
                  <p className="text-body-xs text-foreground-secondary line-clamp-2">{entry.description}</p>
                )}
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function createLogSnapshot(
  t: ReturnType<typeof useTranslations>,
  experienceEntries: ExperienceEntry[],
  educationEntries: Education[],
  certificateEntries: Education[],
  previousItems: LogEntry[] = [],
): LogEntry[] {
  const previousByCategory = new Map(previousItems.map((item) => [item.category, item.id]));
  const items: LogEntry[] = [];

  const experience = pickRandomItem(experienceEntries, previousByCategory.get('experience'));
  if (experience) {
    items.push(mapExperienceToLogEntry(experience, t));
  }

  const education = pickRandomItem(educationEntries, previousByCategory.get('education'));
  if (education) {
    items.push(mapEducationToLogEntry(education, t, 'education'));
  }

  const certificate = pickRandomItem(certificateEntries, previousByCategory.get('certificate'));
  if (certificate) {
    items.push(mapEducationToLogEntry(certificate, t, 'certificate'));
  }

  return items.sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category),
  );
}

function pickRandomItem<T extends { id: string }>(items: T[], previousId?: string): T | null {
  if (items.length === 0) {
    return null;
  }

  const pool = items.length > 1 ? items.filter((item) => item.id !== previousId) : items;
  const candidates = pool.length > 0 ? pool : items;

  return candidates[Math.floor(Math.random() * candidates.length)] ?? null;
}

function mapExperienceToLogEntry(
  entry: ExperienceEntry,
  t: ReturnType<typeof useTranslations>,
): LogEntry {
  return {
    id: entry.id,
    category: 'experience',
    categoryLabel: t.experienceSection.experience,
    period: entry.period,
    title: entry.role,
    subtitle: [entry.company, entry.location].filter(Boolean).join(' · '),
    description: entry.description ?? entry.note,
    isCurrent: entry.isCurrent,
  };
}

function mapEducationToLogEntry(
  entry: Education,
  t: ReturnType<typeof useTranslations>,
  category: Extract<LogCategory, 'education' | 'certificate'>,
): LogEntry {
  return {
    id: entry.id,
    category,
    categoryLabel:
      category === 'education' ? t.experienceSection.education : t.experienceSection.certificates,
    period: entry.period,
    title: entry.degree,
    subtitle: [entry.institution, entry.location].filter(Boolean).join(' · '),
    description: entry.description ?? entry.note,
  };
}
