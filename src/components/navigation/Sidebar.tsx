/** ============================================================
 * Sidebar — vertical left rail (desktop only)
 * Shows icons + vertical text. Animated pill tracks active route.
 * ============================================================ */

'use client';

import { Github, Linkedin, Twitter } from 'iconoir-react';
import { getYear } from '@/stores/dateStore';
import { PROFILE } from '@/data/portfolio';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  currentPath: string;
}

export default function Sidebar({ currentPath }: SidebarProps) {
  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 bottom-0 z-50
                 flex-col items-center justify-between
                 w-[48px] border-r border-border bg-bg-base"
      aria-label="Vertical sidebar"
    >
      {/* Copyright text — pushed toward top, not fully centered */}
      <div className="flex items-start justify-center pt-16 flex-1">
        <span
          className="writing-vertical label-mono text-text-muted select-none"
          style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}
        >
          &#169; Carlos Sánchez Recio (CharlyMech) - {getYear()}
        </span>
      </div>

      {/* Social icons — raised slightly above the very bottom */}
      <div className="flex flex-col items-center gap-3 pb-10">
        <TooltipProvider>
          {PROFILE.social.map((item) => {
            const Icon = item.icon === 'github'
              ? Github
              : item.icon === 'linkedin'
                ? Linkedin
                : Twitter;
            return (
              <Tooltip key={item.platform}>
                <TooltipTrigger asChild>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.platform}
                    className="group relative flex items-center justify-center w-8 h-8 rounded-md
                               text-text-muted transition-colors duration-200
                               hover:text-accent"
                  >
                    {/* Accent bg on hover */}
                    <span className="absolute inset-0 rounded-md bg-accent/0 group-hover:bg-accent/10 transition-colors duration-200" />
                    <Icon width={16} height={16} strokeWidth={1.5} className="relative z-10" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {item.handle}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </aside>
  );
}
