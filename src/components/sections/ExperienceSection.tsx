'use client';

import { motion } from 'framer-motion';
import { EXPERIENCE, EDUCATION } from '@/constants/experience';
import { SKILL_CATEGORIES } from '@/constants/skills';
import { useTranslations } from '@/hooks/use-translations';

export default function ExperienceSection() {
  const t = useTranslations();
  return (
    <div className="p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 border-b border-border pb-4">
            <h2 className="text-heading">
              {t.experienceSection.experience}
            </h2>
            <span className="label-mono">{EXPERIENCE.length} {t.experienceSection.entries}</span>
          </div>

          <div className="space-y-0">
            {EXPERIENCE.map((entry, i) => (
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
                                : 'bg-bg-elevated border-border'
                              }`}
                />

                <div className="pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-heading-sm">
                        {entry.role}
                      </h3>
                      <p className="label-mono text-text-muted mt-0.5">
                        {entry.company}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-left sm:text-right">
                      <span className="text-code normal-case tracking-wider text-text-muted">
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

                  <p className="text-body text-text-secondary mb-4">
                    {entry.description}
                  </p>

                  {entry.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="tech-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-border pb-4">
              <h2 className="text-heading">
                {t.experienceSection.education}
              </h2>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="border-l-2 border-border pl-4"
                >
                  <h3 className="text-heading-xs">
                    {edu.degree}
                  </h3>
                  <p className="label-mono text-text-muted">{edu.institution}</p>
                  <p className="text-code normal-case tracking-wider text-text-muted mt-1">
                    {edu.period}
                  </p>
                  {edu.description && (
                    <p className="text-body-xs text-text-secondary mt-2">
                      {edu.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-border pb-4">
              <h2 className="text-heading">
                {t.experienceSection.techStack}
              </h2>
              <a href="/tech" className="text-code normal-case text-accent hover:underline">
                {t.experienceSection.fullList}
              </a>
            </div>

            <div className="space-y-5">
              {SKILL_CATEGORIES.slice(0, 3).map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <p className="label-mono mb-2">{cat.sublabel}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span key={skill.name} className="tech-tag">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
