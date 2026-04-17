'use client';

import { motion } from 'framer-motion';
import { BLOG_POSTS } from '@/constants/blog';
import { useTranslations } from '@/hooks/use-translations';

export default function BlogSection() {
  const t = useTranslations();
  const featured = BLOG_POSTS.filter((post) => post.featured);
  const totalTags = Array.from(
    new Set(BLOG_POSTS.flatMap((post) => post.tags)),
  );

  return (
    <div className="p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
        <div className="space-y-4">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="border border-border bg-elevated p-6 hover:border-accent/50 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="label-mono text-foreground-muted">{post.date}</span>
                <span className="label-mono text-foreground-muted">•</span>
                <span className="label-mono text-foreground-muted">{post.readTime}</span>
                {post.featured && (
                  <span className="sm:ml-auto text-code-xs text-accent">
                    {t.projects.featured}
                  </span>
                )}
              </div>

              <h3 className="text-heading-sm mb-2">
                {post.title}
              </h3>
              <p className="text-body text-foreground-secondary mb-4">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={`/blog/${post.slug}`}
                className="text-code normal-case tracking-wider text-accent hover:underline"
              >
                {t.blog.readMore} →
              </a>
            </motion.article>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="border border-border bg-elevated p-5">
            <p className="label-mono mb-3">Journal Index</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-code normal-case tracking-wider text-foreground-muted">Entries</span>
                <span className="text-heading-2xs">
                  {BLOG_POSTS.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-code normal-case tracking-wider text-foreground-muted">Featured</span>
                <span className="text-heading-2xs">
                  {featured.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-code normal-case tracking-wider text-foreground-muted">Topics</span>
                <span className="text-heading-2xs">
                  {totalTags.length}
                </span>
              </div>
            </div>
          </div>

          <div className="border border-border bg-elevated p-5">
            <p className="label-mono mb-3">Focus Areas</p>
            <div className="flex flex-wrap gap-1.5">
              {totalTags.slice(0, 8).map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border border-border p-5">
            <p className="label-mono mb-2">Writing Cadence</p>
            <p className="text-body text-foreground-secondary">
              Deep dives on architecture, mobile systems, and editorial UI. New
              entries every few weeks.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
