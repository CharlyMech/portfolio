import type { Service } from '@/core/models/service';

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
