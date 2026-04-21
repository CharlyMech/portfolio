import { defaultLocale, type Locale } from "@/i18n";
import type {
	Education,
	ExperienceEntry,
	Period,
	WorkModality,
} from "@/core/models/experience";

type Multilang<T = string> = Record<Locale, T>;

type LocalizedModality = {
	key: WorkModality;
	label: string;
};

type PeriodI18n = {
	start: Multilang;
	end?: Multilang;
};

type ExperienceEntryI18n = Omit<
	ExperienceEntry,
	| "role"
	| "company"
	| "location"
	| "modality"
	| "modalityLabel"
	| "period"
	| "description"
	| "note"
> & {
	role: Multilang;
	company?: Multilang;
	location: Multilang;
	modality?: Multilang<LocalizedModality>;
	period: PeriodI18n;
	description?: Multilang;
	note?: Multilang;
};

type EducationI18n = Omit<
	Education,
	| "degree"
	| "institution"
	| "location"
	| "modality"
	| "modalityLabel"
	| "period"
	| "description"
	| "note"
> & {
	degree: Multilang;
	institution: Multilang;
	location?: Multilang;
	modality?: Multilang<LocalizedModality>;
	period: PeriodI18n;
	description?: Multilang;
	note?: Multilang;
};

const MODALITY = {
	remote: {
		en: { key: "remote", label: "Remote" },
		es: { key: "remote", label: "Remoto" },
	},
	onsite: {
		en: { key: "onsite", label: "On-site" },
		es: { key: "onsite", label: "Presencial" },
	},
	hybrid: {
		en: { key: "hybrid", label: "Hybrid" },
		es: { key: "hybrid", label: "Híbrido" },
	},
} as const satisfies Record<WorkModality, Multilang<LocalizedModality>>;

const EXPERIENCE_I18N: ExperienceEntryI18n[] = [
	{
		id: "exp-volone",
		role: {
			en: "Full Stack Engineer",
			es: "Ingeniero Full Stack",
		},
		company: {
			en: "Volone (Esloogan 360)",
			es: "Volone (Esloogan 360)",
		},
		location: {
			en: "Valladolid, Spain",
			es: "Valladolid, España",
		},
		modality: MODALITY.hybrid,
		period: {
			start: { en: "Jan 2026", es: "Ene 2026" },
		},
		description: {
			en: "Lead developer of Volone's core platform, a full-stack digital menu product with video-first browsing, map-based discovery, and QR integration.",
			es: "Desarrollador principal de la plataforma core de Volone, un producto de carta digital full stack con exploración centrada en vídeo, descubrimiento por mapa e integración con QR.",
		},
		tags: [
			"Next.js",
			"Tailwind CSS",
			"NestJs",
			"React Native Expo",
			"Flutter",
			"MongoDB",
			"AWS",
		],
	},
	{
		id: "exp-it2b",
		role: {
			en: "Full Stack Engineer",
			es: "Ingeniero Full Stack",
		},
		company: {
			en: "IT2B",
			es: "IT2B",
		},
		location: {
			en: "Palma de Mallorca, Spain",
			es: "Palma de Mallorca, España",
		},
		modality: MODALITY.onsite,
		period: {
			start: { en: "Jan 2025", es: "Ene 2025" },
			end:   { en: "Oct 2025", es: "Oct 2025" },
		},
		description: {
			en: "Maintained and extended a tourism back-office application for activity scheduling and booking flows, while building custom solutions for client-specific needs.",
			es: "Mantuve y amplié una aplicación de back office turístico para gestión de actividades y reservas, además de desarrollar soluciones a medida para necesidades específicas de clientes.",
		},
		tags: ["Angular", "Sass CSS", "Bootstrap", "PHP Symfony"],
		note: {
			en: "Contract ended due to personal relocation.",
			es: "El contrato terminó por una reubicación personal.",
		},
	},
	{
		id: "exp-freelance",
		role: {
			en: "Freelance Developer",
			es: "Desarrollador Freelance",
		},
		location: {
			en: "Ibiza, Spain",
			es: "Ibiza, España",
		},
		modality: MODALITY.remote,
		period: {
			start: { en: "Sep 2024", es: "Sep 2024" },
			end:   { en: "Mar 2026", es: "Mar 2026" },
		},
		description: {
			en: "Built end-to-end digital products ranging from cross-platform apps to APIs and modern dashboards, combining design sensitivity, performance, and clean architecture.",
			es: "Desarrollé productos digitales end-to-end, desde apps multiplataforma hasta APIs y dashboards modernos, combinando criterio de diseño, rendimiento y arquitectura limpia.",
		},
		tags: [
			"Astrojs",
			"Tailwind CSS",
			"Next.js",
			"Flutter",
			"React Native Expo",
			"NestJs",
			"Supabase",
		],
	},
	{
		id: "exp-onmi",
		role: {
			en: "Full Stack Developer (Internship)",
			es: "Desarrollador Full Stack (Prácticas)",
		},
		company: {
			en: "Omniaccess",
			es: "Omniaccess",
		},
		location: {
			en: "Palma de Mallorca, Spain",
			es: "Palma de Mallorca, España",
		},
		modality: MODALITY.hybrid,
		period: {
			start: { en: "Mar 2024", es: "Mar 2024" },
			end:   { en: "Jun 2024", es: "Jun 2024" },
		},
		description: {
			en: "Worked on API maintenance and feature delivery for real-time vessel networking and location systems, plus a final internship POC app for Starlink ISP clients.",
			es: "Trabajé en mantenimiento de APIs y entrega de funcionalidades para sistemas de red y localización de embarcaciones en tiempo real, además de una app POC final para clientes ISP de Starlink.",
		},
		tags: ["NestJs", "Vue2", "Flutter"],
	},
];

const NON_TECH_EXPERIENCE_I18N: ExperienceEntryI18n[] = [
	{
		id: "exp-miro",
		role: {
			en: "Delivery Driver",
			es: "Repartidor",
		},
		company: {
			en: "Exclusivas Miró",
			es: "Exclusivas Miró",
		},
		location: {
			en: "Ibiza, Spain",
			es: "Ibiza, España",
		},
		period: {
			start: { en: "Jun 2016", es: "Jun 2016" },
			end:   { en: "Oct 2021", es: "Oct 2021" },
		},
	},
	{
		id: "exp-javier",
		role: {
			en: "Delivery Driver",
			es: "Repartidor",
		},
		company: {
			en: "Frutas Javier",
			es: "Frutas Javier",
		},
		location: {
			en: "Ibiza, Spain",
			es: "Ibiza, España",
		},
		period: {
			start: { en: "Jun 2022", es: "Jun 2022" },
			end:   { en: "Oct 2023", es: "Oct 2023" },
		},
	},
	{
		id: "exp-bunyola",
		role: {
			en: "Valet",
			es: "Valet",
		},
		company: {
			en: "Virgin Exclusive Son Bunyola Hotel",
			es: "Virgin Exclusive Son Bunyola Hotel",
		},
		location: {
			en: "Palma de Mallorca, Spain",
			es: "Palma de Mallorca, España",
		},
		period: {
			start: { en: "Jul 2024", es: "Jul 2024" },
			end:   { en: "Nov 2024", es: "Nov 2024" },
		},
	},
];

const EDUCATION_I18N: EducationI18n[] = [
	{
		id: "edu-physics",
		degree: {
			en: "Bachelor's Degree in Physics",
			es: "Grado en Física",
		},
		institution: {
			en: "University of the Balearic Islands",
			es: "Universidad de las Islas Baleares",
		},
		location: {
			en: "Palma de Mallorca, Spain",
			es: "Palma de Mallorca, España",
		},
		period: {
			start: { en: "2017", es: "2017" },
			end:   { en: "2020", es: "2020" },
		},
		note: {
			en: "Studies not completed.",
			es: "Estudios no finalizados.",
		},
	},
	{
		id: "edu-asir",
		degree: {
			en: "Systems and Network Administration",
			es: "Administración de Sistemas y Redes",
		},
		institution: {
			en: "IES Sa Colomina",
			es: "IES Sa Colomina",
		},
		location: {
			en: "Ibiza, Spain",
			es: "Ibiza, España",
		},
		period: {
			start: { en: "2020", es: "2020" },
			end:   { en: "2022", es: "2022" },
		},
		tags: [
			"Linux",
			"Networking",
			"PHP",
			"Python",
			"Bash/Batch",
			"Powershell",
			"MySQL",
		],
	},
	{
		id: "edu-dam",
		degree: {
			en: "Cross-Platform Application Development",
			es: "Desarrollo de Aplicaciones Multiplataforma",
		},
		institution: {
			en: "CESUR",
			es: "CESUR",
		},
		location: {
			en: "Palma de Mallorca, Spain",
			es: "Palma de Mallorca, España",
		},
		period: {
			start: { en: "2022", es: "2022" },
			end:   { en: "2024", es: "2024" },
		},
		tags: [
			"Android",
			"Kotlin",
			"Java",
			"Flutter",
			"MongoDB",
			"PostgreSQL",
			"MySQL",
			"Git",
			"Scrum",
		],
	},
	{
		id: "edu-ai",
		degree: {
			en: "AI and Big Data Specialization",
			es: "Especialización en IA y Big Data",
		},
		institution: {
			en: "IEDIB",
			es: "IEDIB",
		},
		location: {
			en: "Palma de Mallorca, Spain",
			es: "Palma de Mallorca, España",
		},
		modality: MODALITY.remote,
		period: {
			start: { en: "2024", es: "2024" },
			end:   { en: "2025", es: "2025" },
		},
		tags: [
			"Python",
			"Jupyter",
			"Pandas",
			"NumPy",
			"Matplotlib/seaborn",
			"Scikit-learn",
			"TensorFlow",
			"PyTorch",
			"Hadoop",
			"Spark",
			"Azure",
			"Databricks",
			"Power BI",
		],
	},
];

const CERITIFICATES_I18N: EducationI18n[] = [];

function resolveField<T>(field: Multilang<T>, locale: Locale): T {
	return field[locale] ?? field[defaultLocale];
}

function localizePeriod(period: PeriodI18n, locale: Locale): Period {
	return {
		start: resolveField(period.start, locale),
		end: period.end ? resolveField(period.end, locale) : undefined,
	};
}

function localizeExperienceEntry(
	entry: ExperienceEntryI18n,
	locale: Locale,
): ExperienceEntry {
	const modality = entry.modality
		? resolveField(entry.modality, locale)
		: undefined;

	return {
		...entry,
		role: resolveField(entry.role, locale),
		company: entry.company ? resolveField(entry.company, locale) : undefined,
		location: resolveField(entry.location, locale),
		modality: modality?.key,
		modalityLabel: modality?.label,
		period: localizePeriod(entry.period, locale),
		description: entry.description
			? resolveField(entry.description, locale)
			: undefined,
		note: entry.note ? resolveField(entry.note, locale) : undefined,
	};
}

function localizeEducationEntry(
	entry: EducationI18n,
	locale: Locale,
): Education {
	const modality = entry.modality
		? resolveField(entry.modality, locale)
		: undefined;

	return {
		...entry,
		degree: resolveField(entry.degree, locale),
		institution: resolveField(entry.institution, locale),
		location: entry.location
			? resolveField(entry.location, locale)
			: undefined,
		modality: modality?.key,
		modalityLabel: modality?.label,
		period: localizePeriod(entry.period, locale),
		description: entry.description
			? resolveField(entry.description, locale)
			: undefined,
		note: entry.note ? resolveField(entry.note, locale) : undefined,
	};
}

export function getExperienceEntries(locale: Locale) {
	return EXPERIENCE_I18N.map((entry) =>
		localizeExperienceEntry(entry, locale),
	);
}

export function getNonTechExperienceEntries(locale: Locale) {
	return NON_TECH_EXPERIENCE_I18N.map((entry) =>
		localizeExperienceEntry(entry, locale),
	);
}

export function getEducationEntries(locale: Locale) {
	return EDUCATION_I18N.map((entry) => localizeEducationEntry(entry, locale));
}

export function getCertificateEntries(locale: Locale) {
	return CERITIFICATES_I18N.map((entry) =>
		localizeEducationEntry(entry, locale),
	);
}
