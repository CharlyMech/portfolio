'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'iconoir-react';
import { PROFILE } from '@/data/portfolio';
import { useTranslations } from '@/i18n/useTranslations';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], delay },
});

export default function HeroSection() {
  const t = useTranslations();
  const lines = PROFILE.tagline.split('\n');

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] border-b border-border">
      {/* Left — Main hero content */}
      <div className="p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between min-h-[420px]">
        {/* Subtitle label */}
        <motion.p {...fadeUp(0.05)} className="label-mono mb-6">
          {PROFILE.subtitle}
        </motion.p>

        {/* Display headline */}
        <div className="flex-1 flex flex-col justify-center">
          {lines.map((line, i) => (
            <motion.h1
              key={i}
              {...fadeUp(0.1 + i * 0.08)}
              className="hero-display text-[clamp(3rem,8vw,7rem)] text-text-primary"
            >
              {line}
            </motion.h1>
          ))}
        </div>

        {/* Bio */}
        <motion.p {...fadeUp(0.3)} className="font-body text-sm text-text-secondary leading-relaxed max-w-sm mt-8">
          {PROFILE.bio}
        </motion.p>
      </div>

      {/* Right — Status panel */}
      <div className="flex flex-col">
        {/* Top: year + status */}
        <div className="flex-1 relative p-6 flex flex-col justify-between border-b border-border overflow-hidden">
          {/* Large year watermark */}
          <span
            className="absolute bottom-0 right-0 font-display font-black text-[7rem] leading-none
                       text-text-primary/[0.04] select-none pointer-events-none"
          >
            {PROFILE.status.updatedAt}
          </span>

          {/* Status badge */}
          <div className="flex items-center gap-2 self-end">
            <span
              className={`status-dot ${PROFILE.status.availability === 'available' ? 'available' : 'busy'
                }`}
            />
            <span className="font-mono text-xs text-text-secondary tracking-wider uppercase">
              {PROFILE.status.availability === 'available'
                ? t.hero.availableForHire
                : t.hero.busy}
            </span>
          </div>

          <p className="label-mono self-end">{t.hero.currentStatus}</p>
        </div>

        {/* Bottom: location */}
        <motion.div {...fadeUp(0.4)} className="p-6">
          <h2 className="font-display font-black text-3xl text-text-primary mb-1">
            {PROFILE.location.city}, {PROFILE.location.country}
          </h2>
          <p className="coord-text">{PROFILE.location.coords}</p>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-5">
            {PROFILE.social.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors"
                aria-label={social.platform}
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    github: <Github width={18} height={18} />,
    linkedin: <Linkedin width={18} height={18} />,
    twitter: <Twitter width={18} height={18} />,
  };

  return icons[icon] ?? null;
}
