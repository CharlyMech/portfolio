import type { Translations } from "./i-translate";

export const en: Translations = {
	// Navigation
	nav: {
		home: "Home",
		projects: "Projects",
		services: "Services",
		contact: "Contact",
	},

	// Site meta
	site: {
		title: "Carlos Sánchez Recio — Mobile & Full Stack Engineer",
		description:
			"Mobile & Full Stack Engineer specialized in cross-platform frameworks and massive data analysis.",
	},

	// Hero section
	hero: {
		name: "Carlos Sánchez Recio",
		nickName: "CharlyMech",
		title: "MOBILE",
		subtitle: "& Full Stack Engineer",
		bio: "Building scalable systems and high-performance apps, turning complex problems into production-ready solutions.",
		currentStatus: "Current status",
		availableForHire: "Open to work",
		availableForFreelance: "Freelance open",
		notAvailableForHire: "Not available",
		notAvailableForFreelance: "Freelance closed",
		busy: "Busy",
		localTime: "Local time",
		weather: "Weather",
		location: "Valladolid, ES",
	},

	// Infrastructure section (home)
	infrastructure: {
		heading: "CORE INFRASTRUCTURE",
		systemReport: "System Report",
		logHistory: "LOG: HISTORY",
		viewAll: "Full history →",
	},

	// Skill tiers
	skillTier: {
		primary: "Daily drivers",
		secondary: "Strong knowledge",
		familiar: "Familiar",
	},

	// CTA section (home)
	cta: {
		heading: "LET'S BUILD\nTHE FUTURE.",
		button: "Send Transmission",
	},

	// Pages — Experience
	experience: {
		pageTitle: "Experience — Carlos Sánchez Recio",
		pageDescription:
			"9+ years of engineering experience across startups, scale-ups, and enterprise systems.",
		label: "// Experience",
		title: "THE LOG.",
		subtitle:
			"Nine years of shipping distributed systems, mobile apps, and high-performance interfaces.",
	},

	// Pages — Projects
	projects: {
		pageTitle: "Projects — Carlos Sánchez Recio",
		pageDescription:
			"A selection of projects spanning distributed systems, mobile apps, and editorial interfaces.",
		label: "// Projects",
		title: "SELECTED WORK.",
		subtitle:
			"A curated set of projects across distributed systems, mobile engineering, and high-craft frontends.",
		status: {
			live: "Live",
			wip: "WIP",
			archived: "Archived",
		},
		viewProject: "View Project",
		viewCode: "View Code",
		featured: "Featured",
	},

	// Pages — Services
	services: {
		pageTitle: "Services — Carlos Sánchez Recio",
		pageDescription:
			"Freelance services: architecture consulting, full stack development, mobile engineering, and performance auditing.",
		label: "// Services",
		title: "WHAT I BUILD.",
		subtitle:
			"Fractional engineering leadership and hands-on development for startups and scale-ups.",
		deliverables: "Deliverables",
		getInTouch: "Get in touch",
		allServicesInclude: "All services include:",
		includes: [
			"Source code with full documentation",
			"CI/CD pipeline setup",
			"Code review & knowledge transfer",
			"30-day post-delivery support",
		],
	},

	// Pages — Tech
	tech: {
		pageTitle: "Tech Stack — Carlos Sánchez Recio",
		pageDescription: "The tools and technologies I use daily.",
		label: "// Tech Stack",
		title: "THE ARSENAL.",
		subtitle:
			"Tools, languages, and frameworks I use to build high-performance systems.",
	},

	// Pages — Contact
	contact: {
		pageTitle: "Contact — Carlos Sánchez Recio",
		pageDescription:
			"Get in touch for collaborations, architectural audits, or just to say hello.",
		label: "// Contact",
		title: "LET'S TALK.",
		subtitle:
			"Open to collaborations, architectural audits, and ambitious side projects.",
		// Form
		sendTransmission: "Send Transmission",
		formSubtitle: "All messages encrypted. I usually respond within 24h.",
		name: "Name",
		email: "Email",
		subject: "Subject",
		message: "Message",
		subjectPlaceholder: "Architectural audit, collaboration, etc.",
		messagePlaceholder: "Tell me about your project...",
		sendMessage: "Send Message →",
		sending: "Sending...",
		// Success
		transmissionReceived: "Transmission received.",
		replyPromise: "I'll get back to you within 24 hours.",
		sendAnother: "Send another",
		// Sidebar
		directContact: "Direct Contact",
		findMeOnline: "Find Me Online",
		baseOfOperations: "Base of Operations",
		timezone: "CET / UTC+1 — Available for remote worldwide",
	},

	// 404
	notFound: {
		title: "404 — Not Found",
		heading: "404.",
		subheading: "This page does not exist.",
		back: "Return home",
	},

	// Skill levels
	skillLevel: {
		expert: "Expert",
		proficient: "Proficient",
		learning: "Learning",
		all: "All",
		skills: "skills",
	},

	// Experience page section headings
	experienceSection: {
		experience: "Experience",
		education: "Education",
		techStack: "Tech Stack",
		fullList: "Full list →",
		entries: "entries",
		current: "Current",
	},

	// Language switcher
	lang: {
		switchTo: "Switch language",
		en: "EN",
		es: "ES",
	},
} as const;
