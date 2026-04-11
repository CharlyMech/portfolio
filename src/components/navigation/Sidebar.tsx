/** ============================================================
 * Sidebar — vertical left rail (desktop only)
 * Shows icons + vertical text. Animated pill tracks active route.
 * ============================================================ */

'use client';

import { Github, Linkedin, Twitter } from 'iconoir-react';
import { getYear } from '@/stores/dateStore';
import { PROFILE } from '@/data/portfolio';

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
      {/* Top — vertical text */}
      <div className="flex items-center justify-center pt-16 flex-1">
        <span
          className="writing-vertical label-mono text-text-muted select-none"
          style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}
        >
          &#169; Carlos Sánchez Recio (CharlyMech) - {getYear()}
        </span>
      </div>

      {/* Bottom — social icons */}
      <div className="flex flex-col items-center gap-4 pb-6">
        {PROFILE.social.map((item) => {
          const Icon = item.icon === 'github'
            ? Github
            : item.icon === 'linkedin'
              ? Linkedin
              : Twitter;
          return (
            <a
              key={item.platform}
              href={item.url}
              title={item.handle}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-200"
            >
              <Icon width={16} height={16} strokeWidth={1.5} />
            </a>
          );
        })}
      </div>
    </aside>
  );
}
