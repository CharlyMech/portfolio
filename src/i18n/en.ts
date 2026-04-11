/** English translations */
export const en = {
  // Navigation
  nav: {
    home: 'Home',
    projects: 'Projects',
    services: 'Services',
    blog: 'Blog',
  },

  // Site meta
  site: {
    title: 'Carlos — Mobile & Full Stack Engineer',
    description:
      'System architect specializing in high-performance distributed systems and pixel-perfect editorial interfaces.',
  },

  // Hero section
  hero: {
    title: 'COMPILE.\nSHIP.\nREPEAT.',
    subtitle: 'MOBILE // FULL STACK ENGINEER',
    bio: 'I build things that run in production — mobile apps, distributed systems, and the kind of interfaces that make engineers jealous. Coffee-fuelled. Star Wars-approved.',
    currentStatus: 'Current status',
    availableForHire: 'Open to work',
    availableForFreelance: 'Freelance open',
    notAvailableForHire: 'Not available',
    notAvailableForFreelance: 'Freelance closed',
    busy: 'Busy',
    localTime: 'Local time',
    weather: 'Weather',
    location: 'Valladolid, ES',
  },

  // Infrastructure section (home)
  infrastructure: {
    heading: 'CORE INFRASTRUCTURE',
    systemReport: 'System Report',
    logHistory: 'LOG: HISTORY',
    viewAll: 'Full history →',
  },

  // Skill tiers
  skillTier: {
    primary: 'Daily drivers',
    secondary: 'Strong knowledge',
    familiar: 'Familiar',
  },

  // CTA section (home)
  cta: {
    heading: 'LET\'S BUILD\nTHE FUTURE.',
    subheading: 'Open for collaborations and architectural audits.',
    button: 'Send Transmission',
  },

  // Pages — Experience
  experience: {
    pageTitle: 'Experience — Carlos Dev',
    pageDescription:
      '9+ years of engineering experience across startups, scale-ups, and enterprise systems.',
    label: '// Experience',
    title: 'THE LOG.',
    subtitle:
      'Nine years of shipping distributed systems, mobile apps, and high-performance interfaces.',
  },

  // Pages — Projects
  projects: {
    pageTitle: 'Projects — Carlos Dev',
    pageDescription:
      'A selection of projects spanning distributed systems, mobile apps, and editorial interfaces.',
    label: '// Projects',
    title: 'SELECTED WORK.',
    subtitle:
      'A curated set of projects across distributed systems, mobile engineering, and high-craft frontends.',
    status: {
      live: 'Live',
      wip: 'WIP',
      archived: 'Archived',
    },
    viewProject: 'View Project',
    viewCode: 'View Code',
    featured: 'Featured',
  },

  // Pages — Services
  services: {
    pageTitle: 'Services — Carlos Dev',
    pageDescription:
      'Freelance services: architecture consulting, full stack development, mobile engineering, and performance auditing.',
    label: '// Services',
    title: 'WHAT I BUILD.',
    subtitle:
      'Fractional engineering leadership and hands-on development for startups and scale-ups.',
    deliverables: 'Deliverables',
    getInTouch: 'Get in touch',
    allServicesInclude: 'All services include:',
    includes: [
      'Source code with full documentation',
      'CI/CD pipeline setup',
      'Code review & knowledge transfer',
      '30-day post-delivery support',
    ],
  },

  // Pages — Blog
  blog: {
    pageTitle: 'Blog — Carlos Dev',
    pageDescription:
      'Field notes on distributed systems, mobile performance, and editorial UI design.',
    label: '// Blog',
    title: 'FIELD NOTES.',
    subtitle: 'Essays on architecture, performance, and the craft of digital systems.',
    readMore: 'Read more',
    minRead: 'min read',
  },

  // Pages — Tech
  tech: {
    pageTitle: 'Tech Stack — Carlos Dev',
    pageDescription: 'The tools and technologies I use daily.',
    label: '// Tech Stack',
    title: 'THE ARSENAL.',
    subtitle: 'Tools, languages, and frameworks I use to build high-performance systems.',
  },

  // Pages — Contact
  contact: {
    pageTitle: 'Contact — Carlos Dev',
    pageDescription:
      'Get in touch for collaborations, architectural audits, or just to say hello.',
    label: '// Contact',
    title: 'LET\'S TALK.',
    subtitle: 'Open to collaborations, architectural audits, and ambitious side projects.',
    // Form
    sendTransmission: 'Send Transmission',
    formSubtitle: 'All messages encrypted. I usually respond within 24h.',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    subjectPlaceholder: 'Architectural audit, collaboration, etc.',
    messagePlaceholder: 'Tell me about your project...',
    sendMessage: 'Send Message →',
    sending: 'Sending...',
    // Success
    transmissionReceived: 'Transmission received.',
    replyPromise: "I'll get back to you within 24 hours.",
    sendAnother: 'Send another',
    // Sidebar
    directContact: 'Direct Contact',
    findMeOnline: 'Find Me Online',
    baseOfOperations: 'Base of Operations',
    timezone: 'CET / UTC+1 — Available for remote worldwide',
  },

  // 404
  notFound: {
    title: '404 — Not Found',
    heading: '404.',
    subheading: 'This page does not exist.',
    back: 'Return home',
  },

  // Skill levels
  skillLevel: {
    expert: 'Expert',
    proficient: 'Proficient',
    learning: 'Learning',
    all: 'All',
    skills: 'skills',
  },

  // Experience page section headings
  experienceSection: {
    experience: 'Experience',
    education: 'Education',
    techStack: 'Tech Stack',
    fullList: 'Full list →',
    entries: 'entries',
    current: 'Current',
  },

  // Language switcher
  lang: {
    switchTo: 'Switch language',
    en: 'EN',
    es: 'ES',
  },
} as const;

export interface Translations {
  nav: { home: string; projects: string; services: string; blog: string };
  site: { title: string; description: string };
  hero: { title: string; subtitle: string; bio: string; currentStatus: string; availableForHire: string; availableForFreelance: string; notAvailableForHire: string; notAvailableForFreelance: string; busy: string; localTime: string; weather: string; location: string };
  infrastructure: { heading: string; systemReport: string; logHistory: string; viewAll: string };
  skillTier: { primary: string; secondary: string; familiar: string };
  cta: { heading: string; subheading: string; button: string };
  experience: { pageTitle: string; pageDescription: string; label: string; title: string; subtitle: string };
  projects: {
    pageTitle: string; pageDescription: string; label: string; title: string; subtitle: string;
    status: { live: string; wip: string; archived: string };
    viewProject: string; viewCode: string; featured: string;
  };
  services: {
    pageTitle: string; pageDescription: string; label: string; title: string; subtitle: string;
    deliverables: string; getInTouch: string; allServicesInclude: string; includes: string[];
  };
  blog: { pageTitle: string; pageDescription: string; label: string; title: string; subtitle: string; readMore: string; minRead: string };
  tech: { pageTitle: string; pageDescription: string; label: string; title: string; subtitle: string };
  contact: {
    pageTitle: string; pageDescription: string; label: string; title: string; subtitle: string;
    sendTransmission: string; formSubtitle: string; name: string; email: string; subject: string;
    message: string; subjectPlaceholder: string; messagePlaceholder: string; sendMessage: string;
    sending: string; transmissionReceived: string; replyPromise: string; sendAnother: string;
    directContact: string; findMeOnline: string; baseOfOperations: string; timezone: string;
  };
  notFound: { title: string; heading: string; subheading: string; back: string };
  skillLevel: { expert: string; proficient: string; learning: string; all: string; skills: string };
  experienceSection: { experience: string; education: string; techStack: string; fullList: string; entries: string; current: string };
  lang: { switchTo: string; en: string; es: string };
}
