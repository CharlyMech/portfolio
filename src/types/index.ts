/* ============================================================
   PORTFOLIO — DOMAIN TYPES
   ============================================================ */

// ---- Availability & Status ----

export interface ProfileStatus {
  available: boolean;
  availableForFreelance: boolean;
  updatedAt: string;
}

// ---- Experience ----

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent: boolean;
  description: string;
  tags?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

// ---- Tech Stack ----

export type SkillLevel = 'expert' | 'proficient' | 'learning';

/** Three-tier skill grouping within a category */
export type SkillTier = 'primary' | 'secondary' | 'familiar';

export interface Skill {
  name: string;
  level: SkillLevel;
  tier: SkillTier;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  sublabel: string;
  skills: Skill[];
}

// ---- Projects ----

export type ProjectStatus = 'live' | 'wip' | 'archived';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  status: ProjectStatus;
  url?: string;
  github?: string;
  image?: string;
  featured?: boolean;
  year: string;
}

// ---- Services ----

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
}

// ---- Contact / Social ----

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon: string;
}

export interface ContactMethod {
  type: 'email' | 'calendly' | 'form';
  label: string;
  value: string;
  url?: string;
}

// ---- Profile ----

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  bio: string;
  location: {
    city: string;
    country: string;
    coords: string;
  };
  status: ProfileStatus;
  social: SocialLink[];
  contact: ContactMethod[];
}

// ---- Navigation ----

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

// ---- Blog ----

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
  featured?: boolean;
}

