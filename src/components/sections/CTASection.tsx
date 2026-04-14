'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/use-translations';

export default function CTASection() {
  const t = useTranslations();
  const headingLines = t.cta.heading.split('\n');

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
      <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12 border-b md:border-b-0 md:border-r border-border min-h-[260px] sm:min-h-[280px]">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-heading-cta mb-3"
        >
          {headingLines[0]}<br />{headingLines[1]}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          viewport={{ once: true }}
          className="label-mono text-text-muted mb-8"
        >
          {t.cta.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          viewport={{ once: true }}
        >
          <a href="/contact" className="btn-primary inline-flex">
            {t.cta.button}
            <span className="font-mono">→</span>
          </a>
        </motion.div>
      </div>

      <div
        className="relative overflow-hidden min-h-[200px] md:min-h-0"
        aria-hidden="true"
      >
        <CircuitPattern />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 right-3">
          <span className="label-mono text-text-muted/60">BERLIN, 2024</span>
        </div>
      </div>
    </div>
  );
}

/** SVG circuit-board decorative pattern */
function CircuitPattern() {
  return (
    <svg
      className="w-full h-full min-h-[200px]"
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="300" fill="var(--color-bg-elevated)" />

      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 44}
          y1="0"
          x2={i * 44}
          y2="300"
          stroke="var(--color-border)"
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 44}
          x2="400"
          y2={i * 44}
          stroke="var(--color-border)"
          strokeWidth="0.5"
        />
      ))}

      <path d="M44 44 H132 V132 H220" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.4" />
      <path d="M220 132 H308 V88 H400" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.3" />
      <path d="M0 176 H88 V220 H176 V176 H264" stroke="var(--color-accent)" strokeWidth="1" opacity="0.25" />
      <path d="M132 264 V220 H264 V264" stroke="var(--color-accent)" strokeWidth="1" opacity="0.2" />

      {[
        [44, 44], [132, 44], [132, 132], [220, 132],
        [308, 88], [88, 176], [176, 220], [264, 176],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill="var(--color-bg-elevated)" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
          <circle cx={x} cy={y} r="1.5" fill="var(--color-accent)" opacity="0.8" />
        </g>
      ))}

      <rect x="160" y="56" width="48" height="32" rx="2" fill="var(--color-bg-overlay)" stroke="var(--color-border)" strokeWidth="1" />
      <rect x="240" y="160" width="40" height="28" rx="2" fill="var(--color-bg-overlay)" stroke="var(--color-border)" strokeWidth="1" />

      <text x="170" y="76" fill="var(--color-accent)" fontSize="6" fontFamily="monospace" opacity="0.6">CPU</text>
      <text x="248" y="177" fill="var(--color-accent)" fontSize="6" fontFamily="monospace" opacity="0.6">I/O</text>
    </svg>
  );
}
