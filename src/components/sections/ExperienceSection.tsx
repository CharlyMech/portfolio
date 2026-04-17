'use client';

import { motion } from 'framer-motion';
import {
  getCertificateEntries,
  getEducationEntries,
  getExperienceEntries,
  getNonTechExperienceEntries,
} from '@/constants/experience';
import { skillsByGroup } from '@/constants/skills';
import { useTranslations } from '@/hooks/use-translations';
import { useLocaleStore } from '@/stores/localeStore';

const TAG_ICON_MAP: Record<string, string> = {
  'Next.js': 'devicon-nextjs-plain',
  'Tailwind CSS': 'devicon-tailwindcss-plain',
  'NestJs': 'devicon-nestjs-plain',
  'NestJS': 'devicon-nestjs-plain',
  'React Native Expo': 'devicon-react-original',
  'React Native': 'devicon-react-original',
  'React': 'devicon-react-original',
  'Flutter': 'devicon-flutter-plain',
  'MongoDB': 'devicon-mongodb-plain',
  'AWS': 'devicon-amazonwebservices-plain',
  'Angular': 'devicon-angular-plain',
  'Sass CSS': 'devicon-sass-plain',
  'Bootstrap': 'devicon-bootstrap-plain',
  'PHP Symfony': 'devicon-symfony-plain',
  'Vue2': 'devicon-vuejs-plain',
  'Vue': 'devicon-vuejs-plain',
  'Astrojs': 'devicon-astro-plain',
  'Astro': 'devicon-astro-plain',
  'Supabase': 'devicon-supabase-plain',
  'Docker': 'devicon-docker-plain',
  'PostgreSQL': 'devicon-postgresql-plain',
  'MySQL': 'devicon-mysql-plain',
  'Python': 'devicon-python-plain',
  'Linux': 'devicon-linux-plain',
  'Git': 'devicon-git-plain',
  'Kotlin': 'devicon-kotlin-plain',
  'Java': 'devicon-java-plain',
  'Android': 'devicon-android-plain',
  'Azure': 'devicon-azure-plain',
  'Firebase': 'devicon-firebase-plain',
  'FastAPI': 'devicon-fastapi-plain',
  'Node.js': 'devicon-nodejs-plain',
  'GraphQL': 'devicon-graphql-plain',
  'Swift': 'devicon-swift-plain',
  'GitHub': 'devicon-github-original',
  'Expo': 'devicon-expo-original',
};

function TagPill({ tag }: { tag: string }) {
  const icon = TAG_ICON_MAP[tag];
  return (
    <span className="tech-tag inline-flex items-center gap-1">
      {icon && <i className={`${icon} text-sm`} aria-hidden />}
      {tag}
    </span>
  );
}

export default function ExperienceSection() {
  const t = useTranslations();
  const locale = useLocaleStore((state) => state.locale);
  const experienceEntries = getExperienceEntries(locale);
  const nonTechEntries = getNonTechExperienceEntries(locale);
  const educationEntries = getEducationEntries(locale);
  const certificateEntries = getCertificateEntries(locale);

  return (
    <div className="p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">

        {/* ── Left column: Tech + Non-Tech experience ── */}
        <div className="space-y-12">

          {/* Tech Experience */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 border-b border-border pb-4">
              <h2 className="text-heading">{t.experienceSection.experience}</h2>
              <span className="label-mono">{experienceEntries.length} {t.experienceSection.entries}</span>
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
                              ${entry.isCurrent ? 'border-accent' : 'border-border'}`}
                >
                  <div
                    className={`absolute -left-[7px] top-0 w-3 h-3 border-2
                                ${entry.isCurrent
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
                          {entry.period}
                        </span>
                        {entry.isCurrent && (
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
                  <span className="text-code-xs text-foreground-muted flex-shrink-0">{entry.period}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-border pb-4">
              <h2 className="text-heading">{t.experienceSection.education}</h2>
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
                    <span className="text-code-xs text-foreground-muted flex-shrink-0">{edu.period}</span>
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
                      <span className="text-code-xs text-foreground-muted flex-shrink-0">{cert.period}</span>
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
