'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Sort, SortDown, SortUp, Shuffle, NavArrowDown, Check } from 'iconoir-react';
import { PROJECTS } from '@/constants/projects';
import { DEVICON_MAP } from '@/constants/devicon-map';
import type { Project, ProjectStatus } from '@/core/models/project';
import { useTranslations } from '@/hooks/use-translations';

const STATUS_COLORS: Record<ProjectStatus, string> = {
  prod: 'text-green-500/80 border-green-500/30 bg-green-500/10',
  dev: 'text-blue-400/80 border-blue-400/30 bg-blue-400/10',
  archived: 'text-yellow-500/80 border-yellow-500/30 bg-yellow-500/10',
  backlog: 'text-zinc-400/80 border-zinc-400/30 bg-zinc-400/10',
  paused: 'text-red-500/80 border-red-500/30 bg-red-500/10',
};

type SortKey = 'shuffle' | 'year-asc' | 'year-desc' | 'title-asc' | 'title-desc';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Dropdown({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 mt-1 z-50 min-w-[160px]
                       border border-border bg-background shadow-md"
            onClick={() => setOpen(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({
  active,
  icon,
  label,
  onClick,
}: {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-2.5 py-1.5 text-left text-code-xs
                  flex items-center gap-2 transition-colors duration-150
                  ${active
                    ? 'text-accent bg-accent/5'
                    : 'text-foreground-muted hover:text-foreground-secondary hover:bg-accent/5'
                  }`}
    >
      <span className="flex-shrink-0 w-3.5 flex items-center justify-center">
        {active ? <Check width={11} height={11} strokeWidth={2} /> : icon}
      </span>
      {label}
    </button>
  );
}

function DropdownSeparator() {
  return <div className="border-t border-border my-0.5" />;
}

function DropdownTrigger({
  icon,
  label,
  open,
}: {
  icon: React.ReactNode;
  label: string;
  open?: boolean;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 border border-border bg-surface px-2.5 py-1 h-7
                 text-code-xs text-foreground hover:text-foreground-secondary
                 transition-colors duration-200 outline-none cursor-pointer"
    >
      {icon}
      {label}
      <NavArrowDown
        width={10}
        height={10}
        strokeWidth={2}
        color="currentColor"
        className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('year-desc');
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const t = useTranslations();

  const STATUS_LABELS: Record<ProjectStatus, string> = {
    prod: t.projects.status.prod.toUpperCase(),
    dev: t.projects.status.dev.toUpperCase(),
    archived: t.projects.status.archived.toUpperCase(),
    backlog: t.projects.status.backlog.toUpperCase(),
    paused: t.projects.status.paused.toUpperCase(),
  };

  const FILTER_OPTIONS = [
    { id: 'all', label: 'All' },
    { id: 'prod', label: t.projects.status.prod },
    { id: 'dev', label: t.projects.status.dev },
    { id: 'paused', label: t.projects.status.paused },
    { id: 'backlog', label: t.projects.status.backlog },
    { id: 'archived', label: t.projects.status.archived },
  ];

  const SORT_OPTIONS: { id: SortKey; label: string; icon: React.ReactNode; group: number }[] = [
    { id: 'shuffle', label: 'Shuffle', icon: <Shuffle width={11} height={11} strokeWidth={1.5} />, group: 0 },
    { id: 'year-desc', label: 'Year — Newest', icon: <SortDown width={11} height={11} strokeWidth={1.5} />, group: 1 },
    { id: 'year-asc', label: 'Year — Oldest', icon: <SortUp width={11} height={11} strokeWidth={1.5} />, group: 1 },
    { id: 'title-asc', label: 'Title — A → Z', icon: <SortUp width={11} height={11} strokeWidth={1.5} />, group: 2 },
    { id: 'title-desc', label: 'Title — Z → A', icon: <SortDown width={11} height={11} strokeWidth={1.5} />, group: 2 },
  ];

  const handleShuffle = useCallback(() => {
    setSortKey('shuffle');
    setShuffleSeed((s) => s + 1);
  }, []);

  const getSorted = useCallback((projects: Project[]): Project[] => {
    if (sortKey === 'shuffle') return shuffleArray(projects);
    if (sortKey === 'year-asc') return [...projects].sort((a, b) => (a.year ?? '').localeCompare(b.year ?? ''));
    if (sortKey === 'year-desc') return [...projects].sort((a, b) => (b.year ?? '').localeCompare(a.year ?? ''));
    if (sortKey === 'title-asc') return [...projects].sort((a, b) => a.title.localeCompare(b.title));
    if (sortKey === 'title-desc') return [...projects].sort((a, b) => b.title.localeCompare(a.title));
    return projects;
  }, [sortKey, shuffleSeed]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = getSorted(
    PROJECTS.filter((p) => activeFilter === 'all' || p.status === activeFilter),
  );

  const activeFilterLabel = FILTER_OPTIONS.find((f) => f.id === activeFilter)?.label ?? 'All';
  const activeSortLabel = SORT_OPTIONS.find((s) => s.id === sortKey)?.label ?? 'Year — Newest';

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {/* Filter dropdown */}
        <Dropdown
          trigger={
            <DropdownTrigger
              icon={<Filter width={11} height={11} strokeWidth={1.5} color="currentColor" />}
              label={activeFilterLabel}
            />
          }
        >
          {FILTER_OPTIONS.map((f) => (
            <DropdownItem
              key={f.id}
              active={activeFilter === f.id}
              icon={<Filter width={11} height={11} strokeWidth={1.5} />}
              label={f.label}
              onClick={() => setActiveFilter(f.id)}
            />
          ))}
        </Dropdown>

        {/* Sort dropdown */}
        <Dropdown
          trigger={
            <DropdownTrigger
              icon={<Sort width={11} height={11} strokeWidth={1.5} color="currentColor" />}
              label={activeSortLabel}
            />
          }
        >
          {SORT_OPTIONS.map((s, i) => {
            const prev = SORT_OPTIONS[i - 1];
            const showSep = i > 0 && prev && prev.group !== s.group;
            return (
              <div key={s.id}>
                {showSep && <DropdownSeparator />}
                <DropdownItem
                  active={sortKey === s.id}
                  icon={s.icon}
                  label={s.label}
                  onClick={() => s.id === 'shuffle' ? handleShuffle() : setSortKey(s.id)}
                />
              </div>
            );
          })}
        </Dropdown>

        {/* Shuffle shortcut button */}
        <button
          type="button"
          onClick={handleShuffle}
          title="Shuffle projects"
          className="flex items-center gap-1.5 border border-border bg-surface px-2.5 py-1 h-7
                     text-code-xs text-foreground hover:text-foreground-secondary
                     transition-colors duration-200 outline-none"
        >
          <Shuffle width={11} height={11} strokeWidth={1.5} color="currentColor" />
        </button>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px
                   border border-border bg-border"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} statusLabels={STATUS_LABELS} t={t} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index, statusLabels, t }: {
  project: Project;
  index: number;
  statusLabels: Record<ProjectStatus, string>;
  t: ReturnType<typeof useTranslations>;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative bg-elevated p-6 flex flex-col gap-4
                 cursor-default group"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="label-mono text-foreground-muted">{project.year}</span>
          <h3 className="text-heading-xs mt-1">
            {project.title}
          </h3>
        </div>
        <span
          className={`flex-shrink-0 text-code-xs
                      px-2 py-1 border rounded-none
                      ${STATUS_COLORS[project.status]}`}
        >
          {statusLabels[project.status]}
        </span>
      </div>

      <p className="text-body text-foreground-secondary flex-1">
        {t.projects.items[project.id]?.description ?? project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags?.map((tag) => {
          const icon = DEVICON_MAP[tag];
          return (
            <span key={tag} className="tech-tag flex items-center gap-1">
              {icon && <i className={`${icon} text-[13px] leading-none`} />}
              {tag}
            </span>
          );
        })}
      </div>

      <div className="flex items-center gap-3 pt-1 border-t border-border">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-code normal-case tracking-wider text-foreground-muted hover:text-accent
                       transition-colors flex items-center gap-1"
          >
            <span>⌥</span> {t.projects.viewCode}
          </a>
        )}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-code normal-case tracking-wider text-foreground-muted hover:text-accent
                       transition-colors flex items-center gap-1 ml-auto"
          >
            {t.projects.viewProject} <span>→</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}
