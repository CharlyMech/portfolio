'use client';

import { motion } from 'framer-motion';
import { SERVICES } from '@/constants/freelance';
import { PROFILE } from '@/constants/profile';
import { useTranslations } from '@/hooks/use-translations';

export default function ServicesSection() {
  const isAvailable = PROFILE.status.available;
  const t = useTranslations();

  return (
    <div className="p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`flex flex-wrap items-center gap-3 px-5 py-3 mb-10 border
                    ${
                      isAvailable
                        ? 'border-status-available/30 bg-status-available/5'
                        : 'border-border bg-elevated'
                    }`}
      >
        <span className={`status-dot ${isAvailable ? 'available' : 'busy'}`} />
        <span className="text-code-xs text-foreground-secondary">
          {isAvailable
            ? 'Currently available for new projects — limited slots'
            : 'Currently fully booked — open to exploratory calls'}
        </span>
        <span className="sm:ml-auto w-full sm:w-auto label-mono text-foreground-muted">
          Updated: {PROFILE.status.updatedAt}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border bg-border">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-elevated p-8 group hover:bg-overlay transition-colors"
          >
            <div className="font-mono text-heading-sm text-accent mb-6 group-hover:scale-110 transition-transform origin-left">
              {service.icon}
            </div>

            <h3 className="text-heading-sm mb-3">
              {service.title}
            </h3>

            <p className="text-body text-foreground-secondary mb-6">
              {service.description}
            </p>

            <div>
              <p className="label-mono mb-3">{t.services.deliverables}</p>
              <ul className="space-y-1.5">
                {service.deliverables.map((d) => (
                  <li key={d} className="skill-item text-xs">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-10 border border-border p-8 flex flex-col md:flex-row
                   items-start md:items-center justify-between gap-6"
      >
        <div>
          <h3 className="text-heading mb-1">
            {t.services.allServicesInclude}
          </h3>
          <ul className="text-body text-foreground-secondary space-y-1 mt-2">
            {t.services.includes.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>
        <a href="/contact" className="btn-primary flex-shrink-0">
          {t.services.getInTouch} →
        </a>
      </motion.div>
    </div>
  );
}
