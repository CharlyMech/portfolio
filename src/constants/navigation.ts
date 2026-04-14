import type { NavItem } from '@/core/models/navigation';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', icon: 'home' },
  { id: 'projects', label: 'Projects', href: '/projects', icon: 'code' },
  { id: 'services', label: 'Services', href: '/services', icon: 'briefcase' },
  { id: 'blog', label: 'Blog', href: '/blog', icon: 'blog' },
];
