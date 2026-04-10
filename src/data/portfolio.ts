import type {
  Profile,
  ExperienceEntry,
  Education,
  SkillCategory,
  Project,
  Service,
  NavItem,
  BlogPost,
} from '@/types';

/* ============================================================
   PROFILE
   ============================================================ */

export const PROFILE: Profile = {
  name: 'Carlos',
  title: 'Mobile & Full Stack',
  subtitle: 'SYSTEM ARCHITECT // FULL STACK',
  tagline: 'THE CODE\nAS CRAFT.',
  bio: 'Specializing in high-performance distributed systems and pixel-perfect editorial interfaces. Building digital infrastructure with mathematical precision.',
  location: {
    city: 'Berlin',
    country: 'DE',
    coords: '52.5200° N, 13.4050° E',
  },
  status: {
    availability: 'available',
    label: 'Available for hire',
    updatedAt: '2024',
  },
  social: [
    { platform: 'GitHub', url: 'https://github.com', handle: '@carlos', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', handle: 'carlos-dev', icon: 'linkedin' },
    { platform: 'Twitter', url: 'https://twitter.com', handle: '@carlos_dev', icon: 'twitter' },
  ],
  contact: [
    { type: 'email', label: 'Email', value: 'hello@carlos.dev', url: 'mailto:hello@carlos.dev' },
    { type: 'calendly', label: 'Schedule a call', value: 'Calendly', url: 'https://calendly.com' },
  ],
};

/* ============================================================
   NAVIGATION
   ============================================================ */

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', icon: 'home' },
  { id: 'projects', label: 'Projects', href: '/projects', icon: 'code' },
  { id: 'services', label: 'Services', href: '/services', icon: 'briefcase' },
  { id: 'blog', label: 'Blog', href: '/blog', icon: 'blog' },
];

/* ============================================================
   EXPERIENCE
   ============================================================ */

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'exp-1',
    role: 'Senior Architect',
    company: 'Editorial Tech Labs',
    period: '2022 — Present',
    isCurrent: true,
    description:
      'Led the migration of legacy monolith to microservices using Rust and K8s.',
    tags: ['Rust', 'Kubernetes', 'Architecture'],
  },
  {
    id: 'exp-2',
    role: 'Full Stack Dev',
    company: 'Quantum Systems',
    period: '2019 — 2022',
    isCurrent: false,
    description:
      'Developed real-time trading dashboards and low-latency API layers.',
    tags: ['React', 'Node.js', 'WebSocket'],
  },
  {
    id: 'exp-3',
    role: 'Frontend Engineer',
    company: 'Design Matrix',
    period: '2017 — 2019',
    isCurrent: false,
    description:
      'Focused on WebGL implementations and complex UI animations.',
    tags: ['WebGL', 'Three.js', 'GSAP'],
  },
  {
    id: 'exp-4',
    role: 'Junior Developer',
    company: 'Startup Hub',
    period: '2015 — 2017',
    isCurrent: false,
    description:
      'Building MVP products for early-stage fintech ventures.',
    tags: ['React Native', 'Firebase', 'Stripe'],
  },
];

export const EDUCATION: Education[] = [
  {
    id: 'edu-1',
    degree: 'B.Sc. Computer Science',
    institution: 'Technical University Berlin',
    period: '2011 — 2015',
    description: 'Specialization in distributed systems and compilers.',
  },
  {
    id: 'edu-2',
    degree: 'AWS Solutions Architect',
    institution: 'Amazon Web Services',
    period: '2020',
  },
  {
    id: 'edu-3',
    degree: 'Certified Kubernetes Administrator',
    institution: 'CNCF',
    period: '2021',
  },
];

/* ============================================================
   TECH STACK
   ============================================================ */

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    sublabel: 'CORE TECH',
    skills: [
      { name: 'TypeScript', level: 'expert' },
      { name: 'Rust', level: 'expert' },
      { name: 'Golang', level: 'proficient' },
      { name: 'Python', level: 'proficient' },
      { name: 'Swift', level: 'learning' },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    sublabel: 'FRONTEND',
    skills: [
      { name: 'React Native', level: 'expert' },
      { name: 'Next.js', level: 'expert' },
      { name: 'Flutter', level: 'proficient' },
      { name: 'Axum', level: 'proficient' },
      { name: 'Tailwind', level: 'expert' },
    ],
  },
  {
    id: 'databases',
    label: 'Database',
    sublabel: 'DATA LAYER',
    skills: [
      { name: 'PostgreSQL', level: 'expert' },
      { name: 'Redis', level: 'proficient' },
      { name: 'MongoDB', level: 'proficient' },
      { name: 'PlanetScale', level: 'learning' },
    ],
  },
  {
    id: 'ops',
    label: 'Operations & Cloud',
    sublabel: 'INFRASTRUCTURE',
    skills: [
      { name: 'Docker', level: 'expert' },
      { name: 'Kubernetes', level: 'expert' },
      { name: 'AWS', level: 'proficient' },
      { name: 'Terraform', level: 'proficient' },
      { name: 'CI/CD', level: 'expert' },
      { name: 'Grafana', level: 'proficient' },
    ],
  },
  {
    id: 'design',
    label: 'Design & Prototyping',
    sublabel: 'TOOLS',
    skills: [
      { name: 'Figma', level: 'proficient' },
      { name: 'Spline 3D', level: 'learning' },
      { name: 'Adobe CC', level: 'proficient' },
      { name: 'Blender', level: 'learning' },
    ],
  },
];

/* ============================================================
   PROJECTS
   ============================================================ */

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'TradingOS',
    description: 'Real-time trading dashboard with sub-5ms latency and WebSocket feeds.',
    longDescription:
      'A high-performance trading interface built with Rust backend (Axum) and React frontend. Features order book visualization, depth charts, and real-time P&L tracking.',
    tags: ['Rust', 'React', 'WebSocket', 'Axum', 'PostgreSQL'],
    status: 'live',
    github: 'https://github.com',
    url: 'https://tradingos.dev',
    featured: true,
    year: '2023',
  },
  {
    id: 'proj-2',
    title: 'Microservice Mesh',
    description: 'Kubernetes operator for dynamic service mesh configuration at scale.',
    tags: ['Golang', 'Kubernetes', 'gRPC', 'Prometheus'],
    status: 'live',
    github: 'https://github.com',
    featured: true,
    year: '2023',
  },
  {
    id: 'proj-3',
    title: 'EditorialUI',
    description: 'Open-source React component library for editorial-grade interfaces.',
    tags: ['React', 'TypeScript', 'Storybook', 'Radix'],
    status: 'wip',
    github: 'https://github.com',
    featured: true,
    year: '2024',
  },
  {
    id: 'proj-4',
    title: 'Fleet Mobile',
    description: 'Cross-platform fleet management app for logistics operators.',
    tags: ['React Native', 'Firebase', 'Maps SDK', 'Redux'],
    status: 'live',
    url: 'https://fleetapp.io',
    featured: false,
    year: '2022',
  },
  {
    id: 'proj-5',
    title: 'DevLog CLI',
    description: 'Terminal-based developer journal with encrypted local storage.',
    tags: ['Rust', 'TUI', 'SQLite'],
    status: 'archived',
    github: 'https://github.com',
    featured: false,
    year: '2021',
  },
];

/* ============================================================
   BLOG
   ============================================================ */

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

/* ============================================================
   SERVICES
   ============================================================ */

export const SERVICES: Service[] = [
  {
    id: 'svc-1',
    title: 'Architecture Consulting',
    description:
      'System design reviews, microservices migration strategy, and infrastructure audits for engineering teams.',
    deliverables: ['Architecture docs', 'ADR templates', 'Tech roadmap', 'Team workshops'],
    icon: '⬡',
  },
  {
    id: 'svc-2',
    title: 'Full Stack Development',
    description:
      'End-to-end product development from API design to pixel-perfect frontend implementation.',
    deliverables: ['Source code', 'Tests & CI/CD', 'Documentation', 'Deployment'],
    icon: '◈',
  },
  {
    id: 'svc-3',
    title: 'Mobile Engineering',
    description:
      'React Native and Flutter cross-platform mobile apps with native performance and editorial design quality.',
    deliverables: ['iOS + Android app', 'Store submission', 'OTA updates', 'Analytics setup'],
    icon: '▣',
  },
  {
    id: 'svc-4',
    title: 'Performance Auditing',
    description:
      'Identify bottlenecks, optimize database queries, reduce bundle sizes, and establish monitoring dashboards.',
    deliverables: ['Performance report', 'Optimization PRs', 'Grafana dashboards'],
    icon: '◎',
  },
];

/* ============================================================
   FOOTER / META
   ============================================================ */

export const SITE_META = {
  title: 'Carlos — Mobile & Full Stack Engineer',
  description:
    'System architect specializing in high-performance distributed systems and pixel-perfect editorial interfaces.',
  url: 'https://carlos.dev',
  ogImage: '/og-image.png',
  year: new Date().getFullYear(),
};
