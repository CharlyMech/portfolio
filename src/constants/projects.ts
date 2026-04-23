import type { Project } from "@/core/models/project";

export const PROJECTS: Project[] = [
	{
		id: "proj-1",
		title: "Timely",
		description:
			"Time registration app for easy time tracking and PYME accessible.",
		longDescription:
			"Simple and intuitive time registration app for easy time tracking and PYME accessible.",
		tags: ["Flutter", "Firebase"],
		status: "prod",
		github: "https://github.com/CharlyMech/timely",
		url: "https://timely.charlymech.com/",
		featured: true,
		year: "2025",
	},
	{
		id: "proj-2",
		title: "Transia",
		description:
			"(MVP) Fleet management with time registration and reports tracking.",
		longDescription:
			"(MVP) Fleet management with time registration and reports tracking. Built with React Native Expo, Zustand, and Supabase.",
		tags: ["React Native Expo", "TypeScript", "Zustand", "Supabase"],
		status: "archived",
		github: "https://github.com/CharlyMech/transia",
		featured: true,
		year: "2025",
	},
	{
		id: "proj-3",
		title: "CodeShamer",
		description: "VSCode extension that shames and blames your code.",
		longDescription:
			"VSCode extension that shames and blames you for your code. Made with rules for JavaScript, TypeScript, Python, Java, C, C++, Dart, PHP, HTML.",
		tags: ["TypeScript", "VSCode"],
		status: "dev",
		github: "https://github.com/CharlyMech/code-shamer",
		featured: true,
		year: "2026",
	},
	{
		id: "proj-4",
		title: "AdventJS 2024",
		description: "AdventJS Challenge 2024 version from @midudev.",
		tags: ["NextJS", "TypeScript", "Tailwind CSS", "Vercel"],
		status: "prod",
		url: "midudev-adventjs2024.vercel.app",
		github: "https://github.com/CharlyMech/adventjs2024",
		featured: false,
		year: "2024",
	},
	{
		id: "proj-5",
		title: "GitHub Profile Tile",
		description: "Flutter widget for displaying GitHub profile information.",
		tags: ["Flutter", "Dart", "GitHub API"],
		status: "paused",
		github: "https://github.com/CharlyMech/adventjs2024",
		featured: false,
		year: "2024",
	},
	{
		id: "proj-6",
		title: "Weatherlite",
		description:
			"Weather app with offline capabilities and minimalism design.",
		longDescription:
			"Minimalism weather app with offline capabilities and fully customizable layouts and widgets. Built with Flutter, Isar, and BLoC architecture. Integrates OpenWeather API for accurate forecasts.",
		tags: ["Flutter", "Dart", "Isar", "BLoC", "OpenWeather API"],
		status: "dev",
		github: "https://github.com/CharlyMech/weatherlite",
		featured: false,
		year: "2026",
	},
	{
		id: "proj-7",
		title: "Wisp",
		description:
			"MacOS extrension for dropping status icons into a phantom zone and be able to see them as dropdown menu.",
		status: "backlog",
		featured: false,
	},
	{
		id: "proj-8",
		title: "LogiKargo",
		description:
			"Logistics management all in one app for efficient cargo tracking and delivery.",
		status: "backlog",
		featured: false,
	},
	{
		id: "proj-9",
		title: "Gusto",
		description: "Social media app for travelers and food enthusiasts.",
		status: "backlog",
		featured: true,
	},
	{
		id: "proj-10",
		title: "AgentOs",
		description:
			"Full stack app and server service to track, manage and interact with local and remote AI agents.",
		status: "backlog",
		featured: true,
	},
];
