'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, MapPin, CloudSunny, HalfMoon, SunLight, Cloud, Rain, Snow, Thunderstorm, Fog } from 'iconoir-react';
import { PROFILE } from '@/data/portfolio';
import { useTranslations } from '@/hooks/use-translations';
import { useWeatherStore } from '@/stores/weatherStore';
import type { WeatherCondition } from '@/data/models/weather.model';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], delay },
});

function WeatherIcon({ condition, isDay }: { condition: WeatherCondition; isDay: boolean }) {
  const props = { width: 14, height: 14, strokeWidth: 1.5 };
  if (condition === 'clear') return isDay ? <SunLight {...props} /> : <HalfMoon {...props} />;
  if (condition === 'partly_cloudy') return <CloudSunny {...props} />;
  if (condition === 'cloudy') return <Cloud {...props} />;
  if (condition === 'foggy') return <Fog {...props} />;
  if (condition === 'rain' || condition === 'drizzle') return <Rain {...props} />;
  if (condition === 'snow') return <Snow {...props} />;
  if (condition === 'thunderstorm') return <Thunderstorm {...props} />;
  return <CloudSunny {...props} />;
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <Github width={16} height={16} strokeWidth={1.5} />,
  linkedin: <Linkedin width={16} height={16} strokeWidth={1.5} />,
};

export default function HeroSection() {
  const t = useTranslations();
  const { weather, startPolling } = useWeatherStore();

  useEffect(() => {
    const stop = startPolling();
    return stop;
  }, []);

  const titleLines = t.hero.title.split('\n');

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] border-b border-border">

      {/* ── Left — Main hero content ─────────────────────────── */}
      <div className="p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between min-h-[420px]">

        {/* Subtitle label */}
        <motion.p {...fadeUp(0.05)} className="label-mono mb-6">
          {t.hero.subtitle}
        </motion.p>

        {/* Display headline */}
        <div className="flex-1 flex flex-col justify-center">
          {titleLines.map((line, i) => (
            <motion.h1
              key={i}
              {...fadeUp(0.1 + i * 0.08)}
              className="hero-display text-[clamp(2.8rem,7vw,6.5rem)] text-text-primary leading-[0.92]"
            >
              {line}
            </motion.h1>
          ))}
        </div>

        {/* Bio */}
        <motion.p {...fadeUp(0.3)} className="font-body text-sm text-text-secondary leading-relaxed max-w-sm mt-8">
          {t.hero.bio}
        </motion.p>
      </div>

      {/* ── Right — Status panel ──────────────────────────────── */}
      <div className="flex flex-col divide-y divide-border">

        {/* Availability flags */}
        <div className="p-5 flex flex-col gap-2">
          {/* For hire */}
          <div className="flex items-center justify-between">
            <span className="label-mono text-text-muted">{t.hero.currentStatus}</span>
            <div className="flex items-center gap-1.5">
              <span className={`status-dot ${PROFILE.status.available ? 'available' : 'busy'}`} />
              <span className="font-mono text-[10px] tracking-wider uppercase text-text-secondary">
                {PROFILE.status.available ? t.hero.availableForHire : t.hero.notAvailableForHire}
              </span>
            </div>
          </div>
          {/* Freelance */}
          <div className="flex items-center justify-between">
            <span className="label-mono text-text-muted">Freelance</span>
            <div className="flex items-center gap-1.5">
              <span className={`status-dot ${PROFILE.status.availableForFreelance ? 'available' : 'busy'}`} />
              <span className="font-mono text-[10px] tracking-wider uppercase text-text-secondary">
                {PROFILE.status.availableForFreelance ? t.hero.availableForFreelance : t.hero.notAvailableForFreelance}
              </span>
            </div>
          </div>
        </div>

        {/* Location + local time */}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-text-muted">
            <MapPin width={12} height={12} strokeWidth={1.5} />
            <span className="label-mono">{t.hero.location}</span>
          </div>

          {/* Local time */}
          <div className="flex items-center justify-between">
            <span className="label-mono text-text-muted">{t.hero.localTime}</span>
            <span className="font-mono text-xs text-text-primary tabular-nums">
              {weather?.localTime ?? '--:--'}
            </span>
          </div>

          {/* Weather */}
          <div className="flex items-center justify-between">
            <span className="label-mono text-text-muted">{t.hero.weather}</span>
            {weather ? (
              <div className="flex items-center gap-1.5 text-text-secondary">
                <WeatherIcon condition={weather.condition} isDay={weather.isDay} />
                <span className="font-mono text-xs tabular-nums">
                  {weather.temperatureC}°C
                </span>
                <span className="font-mono text-[10px] text-text-muted">
                  {weather.conditionLabel}
                </span>
              </div>
            ) : (
              <span className="font-mono text-xs text-text-muted">—</span>
            )}
          </div>
        </div>

        {/* Location city + social */}
        <motion.div {...fadeUp(0.4)} className="p-5 flex-1 flex flex-col justify-between">
          {/* Year watermark */}
          <div className="relative overflow-hidden flex-1 flex flex-col justify-end">
            <span
              className="absolute bottom-0 right-0 font-display font-black text-[5rem] leading-none
                         text-text-primary/[0.04] select-none pointer-events-none"
            >
              {PROFILE.status.updatedAt}
            </span>

            <div>
              <h2 className="font-display font-black text-2xl text-text-primary mb-0.5">
                {PROFILE.location.city}, {PROFILE.location.country}
              </h2>
              <p className="coord-text">{PROFILE.location.coords}</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 mt-4">
            {PROFILE.social.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors"
                aria-label={social.platform}
                title={social.handle}
              >
                {SOCIAL_ICONS[social.icon] ?? null}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
}
