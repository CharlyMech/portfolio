'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map } from "@/components/ui/map";
import { Github, Linkedin, MapPin, CloudSunny, HalfMoon, SunLight, Cloud, Rain, Snow, Thunderstorm, Fog } from 'iconoir-react';
import { PROFILE } from '@/data/portfolio';
import { useTranslations } from '@/hooks/use-translations';
import { useWeatherStore } from '@/stores/weatherStore';
import { useDateStore } from '@/stores/dateStore';
import type { WeatherCondition } from '@/data/models/weather.model';
import { Card } from '../ui/card';

// ---- Animation variants ----
// ease arrays avoid the string literal type mismatch with Framer Motion's Easing type

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], delay },
});

const slideDown = (delay = 0) => ({
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay },
});

// ---- Sub-components ----

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

function Skeleton({ className }: { className?: string }) {
  return (
    <span className={`inline-block rounded bg-border animate-pulse ${className ?? ''}`} />
  );
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <Github width={16} height={16} strokeWidth={1.5} />,
  linkedin: <Linkedin width={16} height={16} strokeWidth={1.5} />,
};

// ---- Component ----

export default function HeroSection() {
  const t = useTranslations();
  const { weather, loading: weatherLoading, startPolling } = useWeatherStore();
  const { now, startClock } = useDateStore();

  useEffect(() => {
    const stop = startPolling();
    return stop;
  }, []);

  useEffect(() => {
    const stop = startClock();
    return stop;
  }, []);

  const localTime = weather?.timezone
    ? new Intl.DateTimeFormat('en-GB', {
        timeZone: weather.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)
    : null;

  const titleLines = t.hero.title.split('\n');

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] border-b border-border">

      {/* ---- Left: text + photo ---- */}
      <div className="p-4 md:p-8 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between min-h-[360px]">
        <div className="flex-1 flex flex-col md:flex-row justify-between items-center space-y-4">

          <div className="flex-1 flex flex-col justify-start items-start space-y-2">
            <motion.p {...fadeUp(0.1)} className="text-body text-text-secondary">
              {t.hero.name} ({t.hero.nickName})
            </motion.p>

            {titleLines.map((line, i) => (
              <motion.h1
                key={line}
                {...fadeUp(0.18 + i * 0.08)}
                className="text-display text-accent leading-[0.92] text-[clamp(3rem,8vw,6rem)] md:text-display"
              >
                {line}
              </motion.h1>
            ))}

            <motion.h2 {...fadeUp(0.34)} className="text-heading-sm text-text-primary">
              {t.hero.subtitle}
            </motion.h2>

            <motion.p {...fadeUp(0.42)} className="text-body text-text-secondary max-w-sm mt-2">
              {t.hero.bio}
            </motion.p>

            {/* Social links */}
            <motion.div {...fadeUp(0.5)} className="flex items-center gap-3 pt-2">
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
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div {...scaleIn(0.3)} className="flex flex-col h-full">
            <Card className="w-52 rounded-full flex items-center justify-center overflow-hidden">
              <img src="/carlos.png" alt="Carlos" className="w-full h-full object-cover rounded-full" />
            </Card>
          </motion.div>

        </div>
      </div>

      {/* ---- Right: map + overlay cards ---- */}
      {/* The Map component renders its own skeleton while tiles load */}
      <div className="relative min-h-[280px]">

        <motion.div {...fadeIn(0.2)} className="absolute inset-0">
          <Map
            center={PROFILE.location.coordinates}
            zoom={10}
            scrollZoom={false}
            dragPan={false}
            dragRotate={false}
            doubleClickZoom={false}
            touchZoomRotate={false}
            keyboard={false}
            className="w-full h-full"
          />
        </motion.div>

        {/* Overlay: clock + weather */}
        <div className="absolute top-2 left-2 right-2 flex justify-start items-center gap-2 z-20">

          {/* Clock card */}
          <motion.div {...slideDown(0.55)}>
            <Card className="w-fit">
              <div className="flex items-center gap-1.5">
                <MapPin width={11} height={11} strokeWidth={1.5} className="text-text-muted shrink-0" />
                <span className="label-mono text-text-muted">{PROFILE.location.city}</span>
                <span className="text-code text-text-primary tabular-nums normal-case tracking-normal ml-1">
                  {localTime ?? <Skeleton className="w-16 h-3" />}
                </span>
              </div>
            </Card>
          </motion.div>

          {/* Weather card */}
          <motion.div {...slideDown(0.65)}>
            <Card className="w-fit flex flex-row items-center gap-1.5">
              <AnimatePresence mode="wait">
                {weatherLoading && !weather ? (
                  <motion.span
                    key="weather-skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Skeleton className="w-20 h-3" />
                  </motion.span>
                ) : weather ? (
                  <motion.div
                    key="weather-data"
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                    className="flex items-center gap-1.5 text-text-secondary"
                  >
                    <WeatherIcon condition={weather.condition} isDay={weather.isDay} />
                    <span className="text-code tabular-nums normal-case tracking-normal text-text-primary">
                      {weather.temperatureC}°C
                    </span>
                    <span className="text-code-xs text-text-muted">
                      {weather.conditionLabel}
                    </span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="weather-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-code text-text-muted"
                  >
                    —
                  </motion.span>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

        </div>
      </div>

    </div>
  );
}
