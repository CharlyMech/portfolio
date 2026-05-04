/**
 * Fixed top navigation bar.
 * Desktop: full nav with animated pill indicator. Mobile: hidden (BottomNav takes over).
 */

"use client";

import { useEffect, useState } from "react";
import { HomeSimple, CodeBrackets, Suitcase, Mail } from "iconoir-react";
import { usePill } from "./AnimatedPill";
import { NAV_ITEMS } from "@/constants/navigation";
import { useTranslations } from '@/hooks/use-translations';
import { initLocale } from "@/stores/localeStore";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const NAV_ICONS: Record<string, React.ReactNode> = {
  home: <HomeSimple width={15} height={15} strokeWidth={2} />,
  code: <CodeBrackets width={15} height={15} strokeWidth={2} />,
  briefcase: <Suitcase width={15} height={15} strokeWidth={2} />,
  mail: <Mail width={15} height={15} strokeWidth={2} />,
};

interface TopNavProps {
  currentPath: string;
}

export default function TopNav({ currentPath: initialPath }: TopNavProps) {
  const t = useTranslations();
  const [currentPath, setCurrentPath] = useState(initialPath);

  useEffect(() => { initLocale(); }, []);

  useEffect(() => {
    function onNavigate() {
      setCurrentPath(window.location.pathname);
    }
    document.addEventListener('astro:page-load', onNavigate);
    return () => document.removeEventListener('astro:page-load', onNavigate);
  }, []);

  const navLabels: Record<string, string> = {
    home: t.nav.home,
    projects: t.nav.projects,
    services: t.nav.services,
    contact: t.nav.contact,
  };

  const activeItem = NAV_ITEMS.find(
    (item) =>
      currentPath === item.href ||
      (item.href !== "/" && currentPath.startsWith(item.href))
  );

  const { containerRef, setItemRef, pill } = usePill(activeItem?.id ?? '', { variant: 'line-bottom' });

  return (
    <header
      className="fixed top-0 left-0 md:left-[48px] right-0 z-40 h-[56px]
                 flex items-center justify-between px-4 sm:px-6
                 border-b border-border bg-background"
    >
      {/* Brand */}
      <a
        href="/"
        className="font-display font-black text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase
                   text-foreground hover:text-accent transition-colors"
      >
        CharlyMech
      </a>

      {/* Desktop Nav + controls */}
      <div className="flex items-center gap-4">
        <nav
          ref={containerRef as React.RefObject<HTMLElement>}
          className="hidden md:flex items-center gap-1 relative"
          aria-label={t.nav.mainNavigation}
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
                          ${activeItem?.id === item.id
                  ? "text-accent"
                  : "text-foreground-muted hover:text-foreground-secondary"
                }`}
              aria-current={activeItem?.id === item.id ? "page" : undefined}
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
