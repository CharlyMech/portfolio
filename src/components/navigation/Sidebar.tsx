/** ============================================================
 * Sidebar — vertical left rail (desktop only)
 * Shows icons + vertical text. Animated pill tracks active route.
 * ============================================================ */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SidebarProps {
  currentPath: string;
}

const SIDE_ICONS = [
  { id: 'code', icon: '<>', label: 'Code', href: '/projects' },
  { id: 'photo', icon: '⬡', label: 'Gallery', href: '/projects' },
];

const SIDE_TEXT = 'CARLOS.DEV // 2024';

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
          {SIDE_TEXT}
        </span>
      </div>

      {/* Bottom — action icons */}
      <div className="flex flex-col items-center gap-5 pb-6">
        {SIDE_ICONS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            title={item.label}
            className="group w-8 h-8 flex items-center justify-center
                       text-text-muted hover:text-accent
                       transition-colors duration-200"
          >
            <span className="font-mono text-sm group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}
