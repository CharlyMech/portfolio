/** ============================================================
 * ProjectsGrid — Interactive project cards
 * Status badge, tags, external links
 * ============================================================ */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/data/portfolio';
import type { Project, ProjectStatus } from '@/types';
import { useTranslations } from '@/hooks/use-translations';

const STATUS_COLORS: Record<ProjectStatus, string> = {
  live: 'text-status-available border-status-available/30 bg-status-available/10',
  wip: 'text-accent border-accent/30 bg-accent/10',
  archived: 'text-text-muted border-border bg-bg-muted/50',
};

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState('all');
  const t = useTranslations();

  const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'live', label: t.projects.status.live },
    { id: 'wip', label: t.projects.status.wip },
    { id: 'archived', label: t.projects.status.archived },
  ];

  const STATUS_LABELS: Record<ProjectStatus, string> = {
    live: t.projects.status.live.toUpperCase(),
    wip: t.projects.status.wip.toUpperCase(),
    archived: t.projects.status.archived.toUpperCase(),
  };

  const filtered = PROJECTS.filter(
    (p) => activeFilter === 'all' || p.status === activeFilter,
  );

  return (
    <div className="p-6 md:p-10">
      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <span className="label-mono mr-2">Filter:</span>  {/* "Filter:" is a UI label intentionally kept in EN */}
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`font-mono text-xs tracking-widest uppercase px-3 py-1.5
                        border transition-all duration-150
                        ${
                          activeFilter === f.id
                            ? 'border-accent text-accent bg-accent/10'
                            : 'border-border text-text-muted hover:border-text-secondary hover:text-text-secondary'
                        }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
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
      className="relative bg-bg-elevated p-6 flex flex-col gap-4
                 cursor-default group"
    >
      {/* Hover accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="label-mono text-text-muted">{project.year}</span>
          <h3 className="font-display font-black text-lg mt-1 tracking-tight">
            {project.title}
          </h3>
        </div>
        <span
          className={`flex-shrink-0 font-mono text-2xs tracking-widest uppercase
                      px-2 py-1 border rounded-none
                      ${STATUS_COLORS[project.status]}`}
        >
          {statusLabels[project.status]}
        </span>
      </div>

      {/* Description */}
      <p className="font-body text-sm text-text-secondary leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="tech-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-1 border-t border-border">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-text-muted hover:text-accent
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
            className="font-mono text-xs text-text-muted hover:text-accent
                       transition-colors flex items-center gap-1 ml-auto"
          >
            {t.projects.viewProject} <span>→</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}
