/** Desktop-only vertical left rail with social links and copyright. */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'iconoir-react';
import { getYear } from '@/stores/dateStore';
import { PROFILE } from '@/constants/profile';
import { useTranslations } from '@/hooks/use-translations';

interface SidebarProps {
  currentPath: string;
}

function SocialLink({ item }: { item: typeof PROFILE.social[number] }) {
  const [hovered, setHovered] = useState(false);

  const Icon = item.icon === 'github'
    ? Github
    : item.icon === 'linkedin'
      ? Linkedin
      : Twitter;

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.platform}
        className="relative flex items-center justify-center w-8 h-8"
        whileHover="hover"
        initial="rest"
        animate={hovered ? 'hover' : 'rest'}
      >
        {/* bg pill */}
        <motion.span
          className="absolute inset-0 rounded-md bg-accent"
          variants={{
            rest: { opacity: 0, scale: 0.7 },
            hover: { opacity: 0.12, scale: 1 },
          }}
          transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        />

        {/* icon */}
        <motion.span
          className="relative z-10"
          variants={{
            rest: { color: 'var(--color-foreground-muted)', y: 0 },
            hover: { color: 'var(--color-accent)', y: -1 },
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Icon width={16} height={16} strokeWidth={1.5} />
        </motion.span>
      </motion.a>

      {/* tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, x: -6, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -4, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute left-full ml-3 z-50 pointer-events-none
                       whitespace-nowrap px-2.5 py-1
                       bg-surface border border-border
                       label-mono text-foreground text-[0.65rem]"
          >
            {item.handle}
            {/* arrow */}
            <span
              className="absolute right-full top-1/2 -translate-y-1/2
                         border-4 border-transparent border-r-border"
            />
            <span
              className="absolute right-full top-1/2 -translate-y-1/2 translate-x-px
                         border-4 border-transparent border-r-surface"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar({ currentPath }: SidebarProps) {
  const t = useTranslations();

  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 bottom-0 z-50
                 flex-col items-center justify-between
                 w-[48px] border-r border-border bg-background"
      aria-label={t.nav.verticalSidebar}
    >
      <div className="flex items-start justify-center pt-16 flex-1">
        <span
          className="writing-vertical label-mono text-foreground-muted select-none"
          style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}
        >
          &#169; Carlos Sánchez Recio (CharlyMech) - {getYear()}
        </span>
      </div>

      <div className="flex flex-col items-center gap-3 pb-10">
        {PROFILE.social.map((item) => (
          <SocialLink key={item.platform} item={item} />
        ))}
      </div>
    </aside>
  );
}
