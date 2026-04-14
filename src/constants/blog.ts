import type { BlogPost } from '@/core/models/blog';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'architecting-for-latency',
    title: 'Architecting for Latency: Sub-10ms Systems',
    excerpt:
      'A field report on shaving milliseconds with queue design, cache locality, and backpressure.',
    date: '2024-02-12',
    readTime: '7 min',
    tags: ['Distributed', 'Performance', 'Rust'],
    featured: true,
    content: [
      'Latency is a product feature. Once you treat it as such, the architecture starts to look different: small services, aggressive caching, and a relentless focus on tail behavior.',
      'In practice that means bounding every queue, tracking P99.9, and designing for graceful degradation. We avoid cascading retries, and we bias toward stable throughput over peak spikes.',
      'The biggest wins came from moving compute closer to the data, partitioning by hot keys, and pushing work to the edge wherever possible.',
    ],
  },
  {
    id: 'post-2',
    slug: 'editorial-ui-systems',
    title: 'Editorial UI Systems for Engineers',
    excerpt:
      'Why serious software deserves typographic rhythm, grid discipline, and intentional UI copy.',
    date: '2024-01-04',
    readTime: '5 min',
    tags: ['Design', 'Frontend', 'Systems'],
    content: [
      'Editorial UI is not a style. It is a process: typography, hierarchy, and negative space working together to explain complex systems.',
      'Engineers benefit from UI clarity more than anyone. A calm grid reduces cognitive load and makes the important states obvious.',
      'The trick is to keep the system strict enough to scale, but flexible enough to handle edge cases without visual debt.',
    ],
  },
  {
    id: 'post-3',
    slug: 'microservices-without-the-mess',
    title: 'Microservices Without the Mess',
    excerpt:
      'A pragmatic checklist for service boundaries, observability, and sane deployment pipelines.',
    date: '2023-11-18',
    readTime: '6 min',
    tags: ['Architecture', 'Kubernetes', 'SRE'],
    content: [
      'If you cannot draw the service boundary on one napkin, it is too big. Start with one behavior, one owner, one set of metrics.',
      'Instrumentation is a first-class dependency. Logs, traces, and metrics should be part of the service template, not an afterthought.',
      'Most teams do not need more services. They need clearer contracts and better ownership.',
    ],
  },
  {
    id: 'post-4',
    slug: 'mobile-performance-baselines',
    title: 'Mobile Performance Baselines That Stick',
    excerpt:
      'Set targets for cold start, JS bundle size, and rendering stability to avoid regressions.',
    date: '2023-08-02',
    readTime: '4 min',
    tags: ['Mobile', 'React Native', 'Performance'],
    content: [
      'Performance budgets work only when they are visible. We bake them into CI and make the numbers part of the definition of done.',
      'The goal is not perfect speed. It is predictable speed. Reduce variance, reduce churn.',
      'Start by measuring cold start and JS bundle weight, then enforce the budget at build time.',
    ],
  },
];
