'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

export interface PillRefs<K extends string> {
  containerRef: React.RefObject<HTMLElement | null>;
  setItemRef: (key: K, el: HTMLElement | null) => void;
}

interface PillStyle { left: number; width: number }

const SPRING = { type: 'spring', stiffness: 500, damping: 35, mass: 0.5 } as const;

export interface UsePillOptions {
  /** Shrinks the pill inward from each side of the active item (px). Default 0. */
  inset?: number;
  /**
   * "center" — pill has a fixed height and is vertically centered (pass height via className).
   * "fill"   — pill stretches top-to-bottom inside the container (no height needed).
   * Default: "center".
   */
  variant?: 'center' | 'fill';
  /** Extra Tailwind classes on the pill (e.g. "h-9", "h-10"). */
  className?: string;
}

export function usePill<K extends string>(
  activeKey: K,
  options: UsePillOptions = {},
): PillRefs<K> & { pill: React.ReactNode } {
  const { inset = 0, variant = 'center', className = '' } = options;

  const containerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Map<K, HTMLElement>>(new Map());
  const [style, setStyle] = useState<PillStyle | null>(null);

  function measure() {
    const el = itemRefs.current.get(activeKey);
    const container = containerRef.current;
    if (!el || !container) return;
    const cr = container.getBoundingClientRect();
    const ir = el.getBoundingClientRect();
    setStyle({
      left: ir.left - cr.left + inset,
      width: ir.width - inset * 2,
    });
  }

  // useLayoutEffect runs synchronously after DOM mutations — the pill gets
  // the correct position on its very first paint, no jump from 0,0.
  useLayoutEffect(() => {
    measure();
  }, [activeKey, inset]);

  const positionClasses = variant === 'fill'
    ? 'top-0 bottom-0'
    : `top-1/2 -translate-y-1/2 ${className}`;

  // Only render once we have a measured position — avoids the 0,0 flash entirely.
  const pill = style ? (
    <motion.div
      aria-hidden
      className={`absolute rounded-sm bg-accent/10 border border-accent/20 pointer-events-none ${positionClasses}`}
      animate={{ left: style.left, width: style.width }}
      transition={SPRING}
    />
  ) : null;

  function setItemRef(key: K, el: HTMLElement | null) {
    if (el) itemRefs.current.set(key, el);
    else itemRefs.current.delete(key);
  }

  return { containerRef, setItemRef, pill };
}
