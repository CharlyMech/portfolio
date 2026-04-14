import type { ExperienceEntry, Education } from '@/core/models/experience';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'exp-1',
    role: 'Senior Architect',
    company: 'Editorial Tech Labs',
    period: '2022 — Present',
    isCurrent: true,
    description: 'Led the migration of legacy monolith to microservices using Rust and K8s.',
    tags: ['Rust', 'Kubernetes', 'Architecture'],
  },
  {
    id: 'exp-2',
    role: 'Full Stack Dev',
    company: 'Quantum Systems',
    period: '2019 — 2022',
    isCurrent: false,
    description: 'Developed real-time trading dashboards and low-latency API layers.',
    tags: ['React', 'Node.js', 'WebSocket'],
  },
  {
    id: 'exp-3',
    role: 'Frontend Engineer',
    company: 'Design Matrix',
    period: '2017 — 2019',
    isCurrent: false,
    description: 'Focused on WebGL implementations and complex UI animations.',
    tags: ['WebGL', 'Three.js', 'GSAP'],
  },
  {
    id: 'exp-4',
    role: 'Junior Developer',
    company: 'Startup Hub',
    period: '2015 — 2017',
    isCurrent: false,
    description: 'Building MVP products for early-stage fintech ventures.',
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
