'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from 'boneyard-js/react';
import { Star, Group, CodeBrackets, FireFlame, GithubCircle, Activity, NavArrowDown } from 'iconoir-react';
import { useGitHubActivityStore } from '@/stores/githubActivityStore';
import { useContributionsStore, GITHUB_ACCOUNT_START_YEAR } from '@/stores/contributionsStore';
import { ContributionHeatmap } from '@/components/charts/ContributionHeatmap';

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - GITHUB_ACCOUNT_START_YEAR + 1 },
  (_, i) => currentYear - i,
);

function Bone({ className }: { className?: string }) {
  return <div className={`rounded bg-surface animate-pulse ${className ?? ''}`} />;
}

function GitHubSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-lg bg-surface border border-border p-3">
            <Bone className="h-3 w-16" />
            <Bone className="h-6 w-10" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-elevated p-4">
        <Bone className="h-3 w-24 mb-3" />
        <Bone className="h-32 w-full" />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: {
  label: string;
  value: React.ReactNode;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-none bg-surface/50 border border-border p-3">
      <div className="flex items-center gap-1.5 text-foreground-secondary">
        <Icon width={12} height={12} strokeWidth={1.5} />
        <span className="text-xs font-mono uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-xl font-display font-bold text-foreground">{value}</span>
    </div>
  );
}

function YearDropdown({
  selectedYear,
  onSelect,
}: {
  selectedYear: number;
  onSelect: (y: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative flex-shrink-0 bg-surface">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 border border-border px-2.5 py-1 h-7
                   text-code-xs text-foreground hover:text-foreground-secondary
                   transition-colors duration-200 outline-none"
      >
        {selectedYear}
        <NavArrowDown
          width={10} height={10} strokeWidth={2} color="currentColor"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full right-0 mt-1 z-50 min-w-full
                       border border-border bg-background shadow-md max-h-48 overflow-y-auto no-scrollbar"
          >
            {years.map((y) => (
              <li key={y}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selectedYear === y}
                  onClick={() => { onSelect(y); setOpen(false); }}
                  className={`w-full px-2.5 py-1.5 text-left text-code-xs transition-colors duration-150
                    ${selectedYear === y
                      ? 'text-accent bg-accent/5'
                      : 'text-foreground-muted hover:text-foreground-secondary hover:bg-accent/5'
                    }`}
                >
                  {y}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function GitHubDataContent() {
  const { data, loading } = useGitHubActivityStore();
  const { fetchYear } = useContributionsStore();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  function handleYearSelect(y: number) {
    setSelectedYear(y);
    if (y !== currentYear) fetchYear(y);
  }

  return (
    <Skeleton name="github-activity" loading={loading} fallback={<GitHubSkeleton />}>
      <div className="flex flex-col gap-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatCard label="Stars" value={data?.totalStars ?? '—'} icon={Star} />
          <StatCard label="Followers" value={data?.followers ?? '—'} icon={Group} />
          <StatCard label="Repos" value={data?.totalRepos ?? '—'} icon={CodeBrackets} />
          <StatCard label="Streak" value={data ? `${data.metrics.currentStreak}d` : '—'} icon={FireFlame} />
        </div>

        {/* Heatmap */}
        <div className="space-y-2">
          <div className="w-full flex justify-end">
            <YearDropdown selectedYear={selectedYear} onSelect={handleYearSelect} />
          </div>
          <div className="rounded-none border border-border bg-elevated p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity width={12} height={12} strokeWidth={1.5} className="text-foreground-muted" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted">Contributions</span>
              </div>
            </div>
            <ContributionHeatmap
              initialContributions={data?.contributions ?? []}
              initialYear={currentYear}
              selectedYear={selectedYear}
            />
          </div>
        </div>
      </div>
    </Skeleton>
  );
}

export default function GitHubActivitySection() {
  const data = useGitHubActivityStore((s) => s.data);

  useLayoutEffect(() => {
    void useGitHubActivityStore.getState().fetch();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8">
      <div className="flex items-center gap-3 mb-8">
        <GithubCircle width={18} height={18} strokeWidth={1.5} className="text-accent flex-shrink-0" />
        <h2 className="font-display text-xs tracking-[0.2em] uppercase text-foreground-secondary">
          GitHub Activity
        </h2>
        <div className="flex-1 h-px bg-border" />
        {data && (
          <a
            href={`https://github.com/${data.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-foreground-muted hover:text-accent transition-colors font-mono"
          >
            @{data.login}
          </a>
        )}
      </div>

      <GitHubDataContent />
    </section>
  );
}
