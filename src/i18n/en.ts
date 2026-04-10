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
    currentStatus: 'Current status',
    availableForHire: 'Available for hire',
    busy: 'Busy',
  },

  // Infrastructure section (home)
  infrastructure: {
    heading: 'CORE INFRASTRUCTURE',
    systemReport: 'System Report',
    logHistory: 'LOG: HISTORY',
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

export type Translations = typeof en;
