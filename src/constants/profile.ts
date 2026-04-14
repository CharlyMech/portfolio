import type { Profile } from '@/core/models/profile';

export const PROFILE: Profile = {
  name: 'Carlos',
  title: 'ENGINEER',
  subtitle: 'MOBILE // FULL STACK',
  tagline: '',
  bio: 'Specializing in high-performance distributed systems and pixel-perfect editorial interfaces. Building digital infrastructure with mathematical precision.',
  github: {
    username: 'CharlyMech',
  },
  location: {
    city: 'Valladolid',
    country: 'ES',
    coords: '41.6523° N, 4.7245° W',
    coordinates: { lat: 41.6523, lon: -4.7245 },
  },
  status: {
    available: true,
    availableForFreelance: true,
    updatedAt: '2025',
  },
  social: [
    {
      platform: 'GitHub',
      url: 'https://github.com/charlymech',
      handle: '@charlymech',
      icon: 'github',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/carlos-sanchezrecio-dev/',
      handle: 'carlos-dev',
      icon: 'linkedin',
    },
  ],
  contact: [
    {
      type: 'email',
      label: 'Email',
      value: 'hello@carlos.dev',
      url: 'mailto:hello@carlos.dev',
    },
  ],
};

export const SITE_META = {
  title: 'Carlos Sánchez Recio — Mobile & Full Stack Engineer',
  description:
    'System architect specializing in high-performance distributed systems and pixel-perfect editorial interfaces.',
  url: 'https://charlymech.com',
  ogImage: '/og-image.svg',
  year: new Date().getFullYear(),
};
