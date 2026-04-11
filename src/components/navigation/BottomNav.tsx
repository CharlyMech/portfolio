/** ============================================================
 * BottomNav — Mobile fixed bottom navigation
 * Animated pill slides horizontally between nav items.
 * IMPORTANT: main content has padding-bottom to avoid overlap.
 * ============================================================ */

'use client';

import { HomeSimple, CodeBrackets, Suitcase, Calendar, Journal, Mail } from 'iconoir-react';
import { usePill } from './AnimatedPill';
import { NAV_ITEMS } from '@/data/portfolio';
import { useTranslations } from '@/hooks/use-translations';

interface BottomNavProps {
  currentPath: string;
}

const ICONS: Record<string, React.ReactNode> = {
  home: <HomeSimple width={18} height={18} strokeWidth={2} />,
  code: <CodeBrackets width={18} height={18} strokeWidth={2} />,
  briefcase: <Suitcase width={18} height={18} strokeWidth={2} />,
  timeline: <Calendar width={18} height={18} strokeWidth={2} />,
  blog: <Journal width={18} height={18} strokeWidth={2} />,
  mail: <Mail width={18} height={18} strokeWidth={2} />,
};

export default function BottomNav({ currentPath }: BottomNavProps) {
  const t = useTranslations();

  const navLabels: Record<string, string> = {
    home: t.nav.home,
    projects: t.nav.projects,
    services: t.nav.services,
    blog: t.nav.blog,
  };

  const activeItem = NAV_ITEMS.find(
    (item) =>
      currentPath === item.href ||
      (item.href !== '/' && currentPath.startsWith(item.href)),
  ) ?? NAV_ITEMS[0];

  const { containerRef, setItemRef, pill } = usePill(activeItem.id, { variant: 'line-top' });

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50
                 border-t border-border glass"
      style={{ height: 'var(--bottom-nav-height)' }}
      aria-label="Mobile navigation"
    >
      <div ref={containerRef as React.RefObject<HTMLDivElement>} className="relative flex h-full items-center">
        {pill}

        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            ref={(el) => setItemRef(item.id, el)}
            className={`relative z-10 flex flex-1 flex-col items-center justify-center gap-1 h-full
                        transition-colors duration-200
                        ${activeItem.id === item.id ? 'text-accent' : 'text-text-muted'}`}
            aria-current={activeItem.id === item.id ? 'page' : undefined}
          >
            <span className="flex-shrink-0">
              {ICONS[item.icon ?? 'home'] ?? ICONS.home}
            </span>
            <span className="font-mono text-[9px] tracking-widest uppercase">
              {navLabels[item.id] ?? item.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
