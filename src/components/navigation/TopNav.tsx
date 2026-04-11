/** ============================================================
 * TopNav — Horizontal top navigation bar
 * Desktop: full nav with animated sliding pill indicator
 * Mobile: hidden (replaced by BottomNav)
 * ============================================================ */

"use client";

import { useEffect } from "react";
import { HomeSimple, CodeBrackets, Suitcase, Journal } from "iconoir-react";
import { usePill } from "./AnimatedPill";
import { NAV_ITEMS } from "@/data/portfolio";
import { useTranslations } from '@/hooks/use-translations';
import { initLocale } from "@/stores/localeStore";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const NAV_ICONS: Record<string, React.ReactNode> = {
  home: <HomeSimple width={15} height={15} strokeWidth={2} />,
  code: <CodeBrackets width={15} height={15} strokeWidth={2} />,
  briefcase: <Suitcase width={15} height={15} strokeWidth={2} />,
  blog: <Journal width={15} height={15} strokeWidth={2} />,
};

interface TopNavProps {
  currentPath: string;
}

export default function TopNav({ currentPath }: TopNavProps) {
  const t = useTranslations();

  useEffect(() => { initLocale(); }, []);

  const navLabels: Record<string, string> = {
    home: t.nav.home,
    projects: t.nav.projects,
    services: t.nav.services,
    blog: t.nav.blog,
  };

  const activeItem =
    NAV_ITEMS.find(
      (item) =>
        currentPath === item.href ||
        (item.href !== "/" && currentPath.startsWith(item.href))
    ) ?? NAV_ITEMS[0];

  const { containerRef, setItemRef, pill } = usePill(activeItem.id, { variant: 'line-bottom' });

  return (
    <header
      className="fixed top-0 left-0 md:left-[48px] right-0 z-40 h-[56px]
                 flex items-center justify-between px-4 sm:px-6
                 border-b border-border bg-bg-base/95 backdrop-blur-sm"
    >
      {/* Brand */}
      <a
        href="/"
        className="font-display font-black text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase
                   text-text-primary hover:text-accent transition-colors"
      >
        CharlyMech
      </a>

      {/* Desktop Nav + controls */}
      <div className="flex items-center gap-4">
        <nav
          ref={containerRef as React.RefObject<HTMLElement>}
          className="hidden md:flex items-center gap-1 relative"
          aria-label="Main navigation"
        >
          {pill}

          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              ref={(el) => setItemRef(item.id, el)}
              className={`relative z-10 px-4 h-[56px] flex items-center gap-2
                          font-mono text-xs tracking-[0.12em] uppercase
                          transition-colors duration-200
                          ${activeItem.id === item.id
                  ? "text-accent"
                  : "text-text-muted hover:text-text-secondary"
                }`}
              aria-current={activeItem.id === item.id ? "page" : undefined}
            >
              {NAV_ICONS[item.icon ?? "home"]}
              {navLabels[item.id] ?? item.label}
            </a>
          ))}
        </nav>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
