'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sort, SortDown, SortUp, NavArrowDown, Check } from 'iconoir-react';
import {
  getCertificateEntries,
  getEducationEntries,
  getExperienceEntries,
  getNonTechExperienceEntries,
} from '@/constants/experience';
import { skillsByGroup } from '@/constants/skills';
import { DEVICON_MAP } from '@/constants/devicon-map';
import { useTranslations } from '@/hooks/use-translations';
import { useLocaleStore } from '@/stores/localeStore';

type SortDir = 'desc' | 'asc';

import type { Period } from '@/core/models/experience';

function extractSortYear(period: Period): number {
  if (!period.end) return Infinity;
  const years = [...period.end.matchAll(/\d{4}/g)].map((m) => parseInt(m[0], 10));
  return years.length ? Math.max(...years) : 0;
}

function formatPeriod(period: Period, labelPresent: string): string {
  return period.end ? `${period.start} — ${period.end}` : `${period.start} — ${labelPresent}`;
}

function TagPill({ tag }: { tag: string }) {
  const icon = DEVICON_MAP[tag];
  return (
    <span className="tech-tag inline-flex items-center gap-1">
      {icon && <i className={`${icon} text-sm`} aria-hidden />}
      {tag}
    </span>
  );
}

function SortDropdown({
  value,
  onChange,
  labelNewest,
  labelOldest,
}: {
  value: SortDir;
  onChange: (v: SortDir) => void;
  labelNewest: string;
  labelOldest: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const options: { id: SortDir; label: string; icon: React.ReactNode }[] = [
    { id: 'desc', label: labelNewest, icon: <SortDown width={11} height={11} strokeWidth={1.5} /> },
    { id: 'asc',  label: labelOldest, icon: <SortUp   width={11} height={11} strokeWidth={1.5} /> },
  ];

  const active = options.find((o) => o.id === value)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 border border-border px-2.5 py-1 h-7
                   text-code-xs text-foreground-muted hover:text-foreground-secondary
                   transition-colors duration-200 outline-none"
      >
        <Sort width={11} height={11} strokeWidth={1.5} color="currentColor" />
        {active.label}
        <NavArrowDown
          width={10} height={10} strokeWidth={2} color="currentColor"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 mt-1 z-50 min-w-[160px]
                       border border-border bg-background shadow-md"
          >
            {options.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => { onChange(o.id); setOpen(false); }}
                  className={`w-full px-2.5 py-1.5 text-left text-code-xs
                              flex items-center gap-2 transition-colors duration-150
                              ${value === o.id
                                ? 'text-accent bg-accent/5'
                                : 'text-foreground-muted hover:text-foreground-secondary hover:bg-accent/5'
                              }`}
                >
                  <span className="flex-shrink-0 w-3.5 flex items-center justify-center">
                    {value === o.id
                      ? <Check width={11} height={11} strokeWidth={2} />
                      : o.icon}
                  </span>
                  {o.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExperienceSection() {
  const t = useTranslations();
  const locale = useLocaleStore((state) => state.locale);
  const [expSort, setExpSort] = useState<SortDir>('desc');
  const [eduSort, setEduSort] = useState<SortDir>('desc');

  const allExperienceEntries = getExperienceEntries(locale);
  const nonTechEntries = getNonTechExperienceEntries(locale);
  const allEducationEntries = getEducationEntries(locale);
  const certificateEntries = getCertificateEntries(locale);

  const sortEntries = <T extends { period: Period }>(arr: T[], dir: SortDir) =>
    [...arr].sort((a, b) => {
      const diff = extractSortYear(a.period) - extractSortYear(b.period);
      return dir === 'desc' ? -diff : diff;
    });

  const experienceEntries = sortEntries(allExperienceEntries, expSort);
  const educationEntries = sortEntries(allEducationEntries, eduSort);

  return (
    <div className="p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">

        {/* ── Left column: Tech + Non-Tech experience ── */}
        <div className="space-y-12">

          {/* Tech Experience */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 border-b border-border pb-4">
              <h2 className="text-heading">{t.experienceSection.experience}</h2>
              <div className="flex items-center gap-3">
                <span className="label-mono">{experienceEntries.length} {t.experienceSection.entries}</span>
                <SortDropdown
                  value={expSort}
                  onChange={setExpSort}
                  labelNewest={t.experienceSection.sortNewest}
                  labelOldest={t.experienceSection.sortOldest}
                />
              </div>
            </div>

            <div className="space-y-0">
              {experienceEntries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative pl-8 pb-10 border-l-2 ml-2
                              ${!entry.period.end ? 'border-accent' : 'border-border'}`}
                >
                  <div
                    className={`absolute -left-[7px] top-0 w-3 h-3 border-2
                                ${!entry.period.end
                        ? 'bg-accent border-accent shadow-[0_0_12px_var(--color-accent)]'
                        : 'bg-elevated border-border'
                      }`}
                  />

                  <div className="pl-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-heading-sm">{entry.role}</h3>
                        <p className="label-mono text-foreground-muted mt-0.5">
                          {entry.company}
                          {entry.location && <span className="text-foreground-muted/60"> · {entry.location}</span>}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-left sm:text-right">
                        <span className="text-code normal-case tracking-wider text-foreground-muted">
                          {formatPeriod(entry.period, t.experienceSection.present)}
                        </span>
                        {!entry.period.end && (
                          <div className="flex items-center gap-1.5 justify-end mt-1">
                            <span className="status-dot available" />
                            <span className="text-code-xs text-status-available">
                              {t.experienceSection.current}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-body text-foreground-secondary mb-4">{entry.description}</p>

                    {entry.note && (
                      <p className="text-code-xs text-foreground-muted italic mb-3">{entry.note}</p>
                    )}

                    {entry.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => <TagPill key={tag} tag={tag} />)}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Non-Tech Experience */}
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
              <h2 className="text-heading text-foreground-muted">{t.experienceSection.nonTechExperience}</h2>
            </div>
            <div className="space-y-4">
              {nonTechEntries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-2 border-b border-border/50"
                >
                  <div>
                    <p className="text-body-xs text-foreground-secondary font-mono">{entry.role}</p>
                    <p className="text-code-xs text-foreground-muted">
                      {entry.company}
                      {entry.location && <span> · {entry.location}</span>}
                    </p>
                  </div>
                  <span className="text-code-xs text-foreground-muted flex-shrink-0">{formatPeriod(entry.period, t.experienceSection.present)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-border pb-4">
              <h2 className="text-heading">{t.experienceSection.education}</h2>
              <SortDropdown
                value={eduSort}
                onChange={setEduSort}
                labelNewest={t.experienceSection.sortNewest}
                labelOldest={t.experienceSection.sortOldest}
              />
            </div>
            <div className="space-y-4">
              {educationEntries.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-border bg-surface/30 p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                    <h3 className="text-heading-xs">{edu.degree}</h3>
                    <span className="text-code-xs text-foreground-muted flex-shrink-0">{formatPeriod(edu.period, t.experienceSection.present)}</span>
                  </div>
                  <p className="label-mono text-foreground-muted">
                    {edu.institution}
                    {edu.location && <span className="text-foreground-muted/60"> · {edu.location}</span>}
                  </p>
                  {edu.note && (
                    <p className="text-code-xs text-foreground-muted italic mt-2">{edu.note}</p>
                  )}
                  {edu.description && (
                    <p className="text-body-xs text-foreground-secondary mt-2">{edu.description}</p>
                  )}
                  {edu.tags && edu.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {edu.tags.map((tag) => <TagPill key={tag} tag={tag} />)}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {certificateEntries.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                <h2 className="text-heading">{t.experienceSection.certificates}</h2>
              </div>
              <div className="space-y-4">
                {certificateEntries.map((cert, i) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="border border-border bg-surface/30 p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                      <h3 className="text-heading-xs">{cert.degree}</h3>
                      <span className="text-code-xs text-foreground-muted flex-shrink-0">{formatPeriod(cert.period, t.experienceSection.present)}</span>
                    </div>
                    <p className="label-mono text-foreground-muted">{cert.institution}</p>
                    {cert.description && (
                      <p className="text-body-xs text-foreground-secondary mt-2">{cert.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
