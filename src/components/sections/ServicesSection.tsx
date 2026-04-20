'use client';

import { motion } from 'framer-motion';
import * as Iconoir from 'iconoir-react';
import { getServices } from '@/constants/freelance';
import { PROFILE } from '@/constants/profile';
import { useTranslations } from '@/hooks/use-translations';
import { useLocaleStore } from '@/stores/localeStore';

export default function ServicesSection() {
  const isAvailable = PROFILE.status.available;
  const t = useTranslations();
  const locale = useLocaleStore((s) => s.locale);
  const services = getServices(locale);

  return (
    <div className="p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`w-fit flex flex-wrap items-center justify-end gap-3 px-5 py-3 mb-10 border
                    ${isAvailable
            ? 'border-status-available/30 bg-status-available/5'
            : 'border-border bg-elevated'
          }`}
      >
        <span className={`status-dot ${isAvailable ? 'available' : 'busy'}`} />
        <span className="text-code-xs text-foreground-secondary">
          {isAvailable ? t.services.availableMessage : t.services.unavailableMessage}
        </span>
        <span className="sm:ml-auto w-full sm:w-auto label-mono text-foreground-muted">
          Updated: {PROFILE.status.updatedAt}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border bg-border">
        {services.map((service, i) => {
          const Icon = (Iconoir as Record<string, React.ElementType>)[service.icon];
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-elevated p-8 group hover:bg-overlay transition-colors"
            >
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform origin-left w-fit">
                {Icon ? (
                  <Icon width={28} height={28} strokeWidth={1.5} />
                ) : (
                  <span className="font-mono text-heading-sm">{service.icon}</span>
                )}
              </div>

              <h3 className="text-heading-sm mb-3">{service.title}</h3>

              <p className="text-body text-foreground-secondary mb-6">{service.description}</p>

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
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-10 border border-border p-8 flex flex-col md:flex-row
                   items-start md:items-center justify-between gap-6"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-heading mb-1">{t.services.allServicesInclude}</h3>
            <ul className="text-body text-foreground-secondary space-y-1 mt-2">
              {t.services.includes.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-mono text-foreground-muted mb-1">{t.services.notIncluded}</p>
            <ul className="text-body text-foreground-muted space-y-1">
              {t.services.notIncludes.map((item) => (
                <li key={item} className="line-through decoration-foreground-muted/40">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a href="/contact" className="btn-primary flex-shrink-0">
          {t.services.getInTouch} →
        </a>
      </motion.div>
    </div>
  );
}
