/**
 * Date store — Zustand store for reactive date/time state:
 *  - Current year (e.g. for copyright footers)
 *  - Browser locale and derived date-format order
 *  - Live clock ticking every second
 */
import { create } from 'zustand';
import { deriveDateOrder } from '@/lib/utils/dates';
import type { DateOrder } from '@/lib/utils/dates';

export type { DateOrder };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DateState {
  /** Current calendar year — static after hydration. */
  year: number;
  /** BCP-47 locale tag as reported by the browser (e.g. "es-ES", "en-US"). */
  browserLocale: string;
  /** High-level date-part ordering for the detected locale. */
  dateOrder: DateOrder;
  /** Separator used between date parts (/ or -). */
  dateSeparator: '/' | '-';
  /** Live Date object updated every second. */
  now: Date;
  /** Start the 1-second clock ticker. Returns a cleanup fn to stop it. */
  startClock: () => () => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

function detectBrowserLocale(): string {
  if (typeof navigator === 'undefined') return 'en-US';
  return navigator.language ?? 'en-US';
}

export const useDateStore = create<DateState>()((set) => {
  const browserLocale = detectBrowserLocale();
  const { order, separator } = deriveDateOrder(browserLocale);

  return {
    year: new Date().getFullYear(),
    browserLocale,
    dateOrder: order,
    dateSeparator: separator,
    now: new Date(),

    startClock() {
      const id = setInterval(() => set({ now: new Date() }), 1_000);
      return () => clearInterval(id);
    },
  };
});

/** The calendar year at page load — safe to use outside React. */
export const CURRENT_YEAR = new Date().getFullYear();

/** Selector — returns the current calendar year from the store. */
export const getYear = () => useDateStore.getState().year;
