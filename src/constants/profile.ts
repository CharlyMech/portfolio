import type { Profile } from "@/core/models/profile";

export const PROFILE: Profile = {
	name: "Carlos",
	title: "ENGINEER",
	subtitle: "MOBILE // FULL STACK",
	tagline: "",
	github: {
		username: "CharlyMech",
	},
	location: {
		city: "Valladolid",
		country: "ES",
		coords: "41.6523° N, 4.7245° W",
		coordinates: { lat: 41.6523, lon: -4.7245 },
	},
	status: {
		available: false,
		availableForFreelance: false,
		updatedAt: "2026",
	},
	social: [
		{
			platform: "GitHub",
			url: "https://github.com/charlymech",
			handle: "@charlymech",
			icon: "github",
		},
		{
			platform: "LinkedIn",
			url: "https://linkedin.com/in/carlos-sanchezrecio-dev/",
			handle: "carlos-dev",
			icon: "linkedin",
		},
	],
	contact: [
		{
			type: "email",
			label: "Email",
			value: "hello@carlos.dev",
			url: "mailto:hello@carlos.dev",
		},
	],
};

export const SITE_META = {
	title: "Carlos Sánchez Recio — Mobile & Full Stack Engineer",
	description:
		"Software engineer building cross-platform and native apps, from performant backends to polished user experiences.",
	url: "https://charlymech.com",
	ogImage: "/og-image.svg",
	year: new Date().getFullYear(),
};
