import type { Project } from "@/core/models/project";

export const PROJECTS: Project[] = [
	{
		id: "3EEC1127-E09F-4C28-8873-E0031AE14462",
		title: "Timely",
		description:
			"Time registration app for easy time tracking and PYME accessible.",
		longDescription:
			"Simple and intuitive time registration app for easy time tracking and PYME accessible.",
		tags: ["Flutter", "Firebase"],
		status: "prod",
		isFreelance: true,
		github: "https://github.com/CharlyMech/timely",
		url: "https://timely.charlymech.com/",
		year: "2025",
	},
	{
		id: "F1F0BB09-52E3-43FE-ACA4-50DFF2939A40",
		title: "Transia",
		description:
			"(MVP) Fleet management with time registration and reports tracking.",
		longDescription:
			"(MVP) Fleet management with time registration and reports tracking. Built with React Native Expo, Zustand, and Supabase.",
		tags: ["React Native Expo", "TypeScript", "Zustand", "Supabase"],
		status: "archived",
		isFreelance: true,
		github: "https://github.com/CharlyMech/transia",
		year: "2025",
	},
	{
		id: "5903CC16-5690-4D08-BABE-0FB44D951178",
		title: "CodeShamer",
		description: "VSCode extension that shames and blames your code.",
		longDescription:
			"VSCode extension that shames and blames you for your code. Made with rules for JavaScript, TypeScript, Python, Java, C, C++, Dart, PHP, HTML.",
		tags: ["TypeScript", "VSCode"],
		status: "paused",
		github: "https://github.com/CharlyMech/code-shamer",
		year: "2026",
	},
	{
		id: "506D604F-6648-4B37-A4A0-B059D7D9340E",
		title: "AdventJS 2024",
		description: "AdventJS Challenge 2024 version from @midudev.",
		tags: ["NextJS", "TypeScript", "Tailwind CSS", "Vercel"],
		status: "prod",
		url: "midudev-adventjs2024.vercel.app",
		github: "https://github.com/CharlyMech/adventjs2024",
		year: "2024",
	},
	{
		id: "E310668C-91A3-43BE-9A6F-888BBFE396D7",
		title: "GitHub Profile Tile",
		description: "Flutter widget for displaying GitHub profile information.",
		tags: ["Flutter", "Dart", "GitHub API"],
		status: "paused",
		github: "https://github.com/CharlyMech/adventjs2024",
		year: "2024",
	},
	// {
	// 	id: "proj-6",
	// 	title: "Weatherlite",
	// 	description:
	// 		"Weather app with offline capabilities and minimalism design.",
	// 	longDescription:
	// 		"Minimalism weather app with offline capabilities and fully customizable layouts and widgets. Built with Flutter, Isar, and BLoC architecture. Integrates OpenWeather API for accurate forecasts.",
	// 	tags: ["Flutter", "Dart", "Isar", "BLoC", "OpenWeather API"],
	// 	status: "paused",
	// 	github: "https://github.com/CharlyMech/weatherlite",
	// 	year: "2026",
	// },
	// {
	// 	id: "proj-7",
	// 	title: "Wisp",
	// 	description:
	// 		"MacOS extrension for dropping status icons into a phantom zone and be able to see them as dropdown menu.",
	// 	status: "backlog",
	// },
	// {
	// 	id: "proj-8",
	// 	title: "LogiKargo",
	// 	description:
	// 		"Logistics management all in one app for efficient cargo tracking and delivery.",
	// 	status: "backlog",
	// },
	// {
	// 	id: "proj-9",
	// 	title: "Gusto",
	// 	description: "Social media app for travelers and food enthusiasts.",
	// 	status: "backlog",
	// 	collaborators: ["https://github.com/IsaacLolade],
	// },
	{
		id: "A3C0160A-2E1B-45EF-9F0F-C9AF3E185259",
		title: "Hestia",
		description:
			"Personal app to track house money sources income/outcome, personal appointments and shooping carts.",
		longDescription:
			"Personal app that allows my home expenses and incomes to be registered, categorized, and analyzed, personal or shared. Implemented personal and shared appointments, sync with Google calendar, and shopping carts for shared groceries.",
		tags: ["Swift", "Supabase"],
		status: "backlog",
	},
	// {
	// 	id: "proj-12",
	// 	title: "Pulse",
	// 	description: "All in one fitness, health and wellness app.",
	// 	status: "backlog",
	// 	collaborators: [
	// 		"https://github.com/IsaacLolade",
	// 		"https://github.com/MarcASO1560",
	// 	],
	// },
	// {
	// 	id: "proj-13",
	// 	title: "Notx",
	// 	description: "MacOS notch extension for developers.",
	// 	status: "backlog",
	// },
	// {
	// 	id: "proj-14",
	// 	title: "Gitpilot",
	// 	description: "Automate your git commit flow with your rules.",
	// 	status: "backlog",
	// },
	{
		id: "46C9E593-F1F3-474D-97F0-E24AB6EB84E8",
		title: "Kluxter",
		description: "Proxmox cluster dashboard visualization.",
		longDescription:
			"Proxmox cluster dashboard visualization, with interactive infrastructure visualization, realtime data and analytics.",
		tags: ["React", "NextJS", "TypeScript", "Tailwind CSS", "Docker"],
		status: "backlog",
	},
	{
		id: "3FDFB6B6-5CE7-4265-B6F3-06990F4212F7",
		title: "Nivelo",
		description: "Bubble level app.",
		longDescription: "Easy and always in the pocket bubble level app.",
		tags: ["Dart", "Flutter"],
		status: "dev",
	},
];
