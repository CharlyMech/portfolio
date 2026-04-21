import { defaultLocale, type Locale } from "@/i18n";
import type { Service } from "@/core/models/service";

type Multilang<T = string> = Record<Locale, T>;

interface ServiceI18n {
	id: string;
	icon: string;
	title: Multilang;
	description: Multilang;
	deliverables: Multilang<string[]>;
}

const SERVICES_I18N: ServiceI18n[] = [
	{
		id: "svc-landing",
		icon: "Globe",
		title: {
			en: "Landing Page",
			es: "Landing Page",
		},
		description: {
			en: "High-converting landing pages for products, startups, and campaigns. Built for performance, SEO, and visual impact. AI-assisted design — not a designer, but the result looks like one built it.",
			es: "Landing pages de alta conversión para productos, startups y campañas. Construidas para rendimiento, SEO e impacto visual. Diseño asistido por IA — no soy diseñador, pero el resultado lo parece.",
		},
		deliverables: {
			en: [
				"Responsive design",
				"Basic SEO setup",
				"Analytics integration",
				"Custom made solutions",
			],
			es: [
				"Diseño responsive",
				"SEO básico",
				"Integración de analíticas",
				"Soluciones a medida",
			],
		},
	},
	{
		id: "svc-webapp",
		icon: "AppWindow",
		title: {
			en: "Web Application",
			es: "Aplicación Web",
		},
		description: {
			en: "Full-featured web apps: dashboards, SaaS platforms, internal tools. End-to-end from architecture to deployment. AI-assisted UI design included.",
			es: "Aplicaciones web completas: dashboards, plataformas SaaS, herramientas internas. De la arquitectura al despliegue. Diseño de UI asistido por IA incluido.",
		},
		deliverables: {
			en: [
				"Source code & tests",
				"Auth & role management",
				"UI&UX design",
				"Simple deployment",
			],
			es: [
				"Código fuente y tests",
				"Auth y gestión de roles",
				"Diseño UI&UX",
				"Despliegue simple",
			],
		},
	},
	{
		id: "svc-native-mobile",
		icon: "SmartphoneDevice",
		title: {
			en: "Native Mobile App",
			es: "App Móvil Nativa",
		},
		description: {
			en: "iOS and Android native applications when platform-specific performance and APIs matter. Swift / Kotlin for demanding use cases.",
			es: "Aplicaciones nativas iOS y Android cuando importa el rendimiento y las APIs de plataforma. Swift / Kotlin para casos de uso exigentes.",
		},
		deliverables: {
			en: [
				"iOS + Android builds",
				"App Store submission",
				"Push notifications",
				"Analytics setup",
			],
			es: [
				"Builds iOS + Android",
				"Publicación en tiendas",
				"Notificaciones push",
				"Configuración de analíticas",
			],
		},
	},
	{
		id: "svc-cross-platform",
		icon: "MobileDevMode",
		title: {
			en: "Cross-Platform App",
			es: "App Multiplataforma",
		},
		description: {
			en: "React Native Expo and Flutter apps that run on iOS and Android from a single codebase. Near-native performance without duplicating effort.",
			es: "Apps en React Native Expo y Flutter que funcionan en iOS y Android desde una sola base de código. Rendimiento casi nativo sin duplicar esfuerzo.",
		},
		deliverables: {
			en: [
				"iOS + Android",
				"OTA updates",
				"Store submission",
				"Offline support",
			],
			es: [
				"iOS + Android",
				"Actualizaciones OTA",
				"Publicación en tiendas",
				"Soporte offline",
			],
		},
	},
	{
		id: "svc-fullstack",
		icon: "Server",
		title: {
			en: "Full Stack Development",
			es: "Desarrollo Full Stack",
		},
		description: {
			en: "Complete product engineering: REST / GraphQL APIs, database design, and frontend (web or mobile).",
			es: "Ingeniería de producto completa: APIs REST / GraphQL, diseño de base de datos y frontend (web o móvil).",
		},
		deliverables: {
			en: [
				"API design & implementation",
				"Database schema",
				"Frontend (web & mobile)",
				"Docs & handover",
			],
			es: [
				"Diseño e implementación de API",
				"Esquema de base de datos",
				"Frontend (web y móvil)",
				"Documentación y entrega",
			],
		},
	},
];

function resolveService(entry: ServiceI18n, locale: Locale): Service {
	return {
		id: entry.id,
		icon: entry.icon,
		title: entry.title[locale] ?? entry.title[defaultLocale],
		description:
			entry.description[locale] ?? entry.description[defaultLocale],
		deliverables:
			entry.deliverables[locale] ?? entry.deliverables[defaultLocale],
	};
}

export function getServices(locale: Locale): Service[] {
	return SERVICES_I18N.map((s) => resolveService(s, locale));
}
