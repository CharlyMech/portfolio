'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SunLight, HalfMoon } from 'iconoir-react';
import { useThemeStore } from '@/stores/themeStore';

export default function ThemeToggle() {
  const { theme, toggle } = useThemeStore();

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative flex items-center justify-center w-7 h-7 rounded-sm
                 border border-border text-text-muted hover:text-accent
                 hover:border-accent/40 hover:bg-accent/5
                 transition-colors duration-200 overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute"
          >
            <HalfMoon width={15} height={15} strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute"
          >
            <SunLight width={15} height={15} strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
