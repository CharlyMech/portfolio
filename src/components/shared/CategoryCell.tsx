'use client';

import { motion } from 'framer-motion';

interface SkillItem {
  name: string;
  icon?: string;
}

interface CategoryCellProps {
  category: string;
  skills: SkillItem[];
  index?: number;
  direction?: 'row' | 'col';
  className?: string;
}

export function CategoryCell({
  category,
  skills,
  index = 0,
  direction = 'row',
  className,
}: CategoryCellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`py-3 px-5 flex flex-col gap-2 flex-1 ${className ?? ''}`}
    >
      <p className="label-mono mb-1">{category.toUpperCase()}</p>
      <div className={`flex flex-wrap items-center gap-y-1 ${direction === 'col' ? 'flex-col items-start' : 'flex-row'}`}>
        {skills.map((skill, i) => (
          <span key={skill.name} className="flex items-center gap-1.5">
            {skill.icon && (
              <i className={`${skill.icon} text-base text-foreground-secondary`} aria-hidden />
            )}
            <span className="text-code normal-case tracking-normal text-foreground-secondary">
              {skill.name}
            </span>
            {direction === 'row' && i < skills.length - 1 && (
              <span className="text-foreground-muted mx-1 select-none">·</span>
            )}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
