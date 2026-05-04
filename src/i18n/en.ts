import type { Translations } from "./i-translate";

export const en: Translations = {
	// Navigation
	nav: {
		home: "Home",
		projects: "Projects",
		services: "Services",
		contact: "Contact",
		mainNavigation: "Main navigation",
		mobileNavigation: "Mobile navigation",
		verticalSidebar: "Vertical sidebar",
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
		main: "MAIN",
		moreSkills: "MORE SKILLS",
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
		title: "ALL OF MY CODE.",
		subtitle:
			"A curated set of projects across distributed systems, mobile engineering, and high-craft frontends.",
		status: {
			dev: "Dev",
			prod: "Prod",
			archived: "Archived",
			backlog: "Backlog",
			paused: "Paused",
		},
		viewProject: "View Project",
		viewCode: "View Code",
		featured: "Featured",
		filterAll: "All",
		sortShuffle: "Shuffle",
		sortYearNewest: "Year — Newest",
		sortYearOldest: "Year — Oldest",
		sortTitleAsc: "Title — A → Z",
		sortTitleDesc: "Title — Z → A",
		shuffleProjectsTitle: "Shuffle projects",
		items: {
			"proj-1": {
				description:
					"Time registration app for easy time tracking and PYME accessible.",
			},
			"proj-2": {
				description:
					"(MVP) Fleet management with time registration and reports tracking.",
			},
			"proj-3": {
				description: "VSCode extension that shames and blames your code.",
			},
			"proj-4": {
				description: "AdventJS Challenge 2024 version from @midudev.",
			},
			"proj-5": {
				description:
					"Flutter widget for displaying GitHub profile information.",
			},
			"proj-6": {
				description:
					"Weather app with offline capabilities and minimalism design.",
			},
			"proj-7": {
				description:
					"MacOS extension for dropping status icons into a phantom zone and viewing them as a dropdown menu.",
			},
			"proj-8": {
				description:
					"Logistics management all-in-one app for efficient cargo tracking and delivery.",
			},
			"proj-9": {
				description: "Social media app for travelers and food enthusiasts.",
			},
			"proj-10": {
				description:
					"Full stack app and server service to track, manage and interact with local and remote AI agents.",
			},
			"proj-11": {
				description:
					"Personal app to track home income and expenses, appointments, and shopping carts.",
			},
			"proj-12": {
				description: "All-in-one fitness, health, and wellness app.",
			},
		},
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
		builtForClientsTitle: "Products Built For Clients",
		builtForClientsSubtitle:
			"A selection of freelance products delivered for client teams.",
		deliverables: "Deliverables",
		getInTouch: "Get in touch",
		allServicesInclude: "All services include:",
		includes: [
			"Source code with full documentation",
			"Basic AI-generated design",
			"Simple deployment setup",
			"30-day post-delivery support",
		],
		notIncluded: "Not included (available via external specialists):",
		notIncludes: [
			"Full custom design (requires external designer)",
			"Full SEO strategy (requires external SEO specialist)",
		],
		availableMessage: "Currently available for new projects — limited slots",
		unavailableMessage:
			"Currently not available for new projects — check back later",
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
		namePlaceholder: "John Doe",
		emailPlaceholder: "john@company.com",
		subject: "Subject",
		message: "Message",
		subjectPlaceholder: "Architectural audit, collaboration, etc.",
		messagePlaceholder: "Tell me about your project...",
		sendMessage: "Send Message →",
		sending: "Sending...",
		// Success
		successToast: "Message sent. I'll get back to you soon.",
		transmissionReceived: "Transmission received.",
		replyPromise: "I'll get back to you within 24 hours.",
		sendAnother: "Send another",
		// Error toasts
		errorRateLimited: "Too many requests. Please try again later.",
		errorNetwork: "Connection issue. Check your network.",
		errorServer: "Server error. Try again later.",
		errorInvalid: "Invalid submission. Check your inputs.",
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
		nonTechExperience: "Other Experience",
		certificates: "Certificates",
		sortNewest: "Date — Newest",
		sortOldest: "Date — Oldest",
		present: "Present",
	},

	// Language switcher
	lang: {
		switchTo: "Switch language",
		en: "EN",
		es: "ES",
	},
} as const;
