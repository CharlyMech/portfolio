import type { Skill } from "@/core/models/skill";

export const SKILLS: Skill[] = [
	// ── MAIN ──────────────────────────────────────────────
	{
		group: "main",
		category: "Mobile",
		name: "React Native",
		icon: "devicon-react-original",
	},
	{
		group: "main",
		category: "Mobile",
		name: "Expo",
		icon: "devicon-expo-original",
	},
	{
		group: "main",
		category: "Mobile",
		name: "Flutter",
		icon: "devicon-flutter-plain",
	},
	{
		group: "main",
		category: "Front-end",
		name: "React",
		icon: "devicon-react-original",
	},
	{
		group: "main",
		category: "Front-end",
		name: "Next.js",
		icon: "devicon-nextjs-plain",
	},
	{
		group: "main",
		category: "Front-end",
		name: "Astro",
		icon: "devicon-astro-plain",
	},
	{
		group: "main",
		category: "Front-end",
		name: "Tailwind CSS",
		icon: "devicon-tailwindcss-plain",
	},
	{
		group: "main",
		category: "Back-end",
		name: "NestJS",
		icon: "devicon-nestjs-plain",
	},
	{
		group: "main",
		category: "Back-end",
		name: "FastAPI",
		icon: "devicon-fastapi-plain",
	},
	{
		group: "main",
		category: "Back-end",
		name: "Docker",
		icon: "devicon-docker-plain",
	},

	// ── OTHER ─────────────────────────────────────────────
	{
		group: "other",
		category: "Mobile",
		name: "Jetpack Compose",
		icon: "devicon-jetpackcompose-plain",
	},
	{
		group: "other",
		category: "Mobile",
		name: "Native Android",
		icon: "devicon-android-plain",
	},
	{
		group: "other",
		category: "Mobile",
		name: "Swift",
		icon: "devicon-swift-plain",
	},
	{
		group: "other",
		category: "Front-end",
		name: "Angular",
		icon: "devicon-angular-plain",
	},
	{
		group: "other",
		category: "Front-end",
		name: "Vue",
		icon: "devicon-vuejs-plain",
	},
	{
		group: "other",
		category: "Back-end",
		name: "Spring Boot",
		icon: "devicon-spring-plain",
	},
	{
		group: "other",
		category: "Back-end",
		name: "Flask",
		icon: "devicon-flask-original",
	},
	{
		group: "other",
		category: "Back-end",
		name: "Node.js",
		icon: "devicon-nodejs-plain",
	},
	{
		group: "other",
		category: "Data & AI",
		name: "Pandas",
		icon: "devicon-pandas-plain",
	},
	{
		group: "other",
		category: "Data & AI",
		name: "NumPy",
		icon: "devicon-numpy-plain",
	},
	{
		group: "other",
		category: "Data & AI",
		name: "Matplotlib",
		icon: "devicon-matplotlib-plain",
	},
	{
		group: "other",
		category: "Data & AI",
		name: "Scikit-learn",
		icon: "devicon-scikitlearn-plain",
	},
	{
		group: "other",
		category: "Data & AI",
		name: "Keras",
		icon: "devicon-keras-plain",
	},
	{
		group: "other",
		category: "Data & AI",
		name: "TensorFlow",
		icon: "devicon-tensorflow-original",
	},
	{
		group: "other",
		category: "Data & AI",
		name: "PyTorch",
		icon: "devicon-pytorch-plain",
	},
	{
		group: "other",
		category: "Data & AI",
		name: "LangChain",
		icon: "devicon-langchain-plain",
	},
	{ group: "other", category: "Data & AI", name: "OpenAI API" },
	{
		group: "other",
		category: "Data & AI",
		name: "PySpark",
		icon: "devicon-apachespark-plain",
	},
	{
		group: "other",
		category: "Databases",
		name: "MySQL",
		icon: "devicon-mysql-plain",
	},
	{
		group: "other",
		category: "Databases",
		name: "PostgreSQL",
		icon: "devicon-postgresql-plain",
	},
	{
		group: "other",
		category: "Databases",
		name: "SQLite",
		icon: "devicon-sqlite-plain",
	},
	{
		group: "other",
		category: "Databases",
		name: "GraphQL",
		icon: "devicon-graphql-plain",
	},
	{
		group: "other",
		category: "Databases",
		name: "Neo4j",
		icon: "devicon-neo4j-plain",
	},
	{ group: "other", category: "Databases", name: "Isar" },
	{
		group: "other",
		category: "Cloud & Ops",
		name: "AWS",
		icon: "devicon-amazonwebservices-plain",
	},
	{
		group: "other",
		category: "Cloud & Ops",
		name: "Azure",
		icon: "devicon-azure-plain",
	},
	{
		group: "other",
		category: "Cloud & Ops",
		name: "Linux",
		icon: "devicon-linux-plain",
	},
	{
		group: "other",
		category: "Cloud & Ops",
		name: "Git",
		icon: "devicon-git-plain",
	},
	{
		group: "other",
		category: "Cloud & Ops",
		name: "GitHub",
		icon: "devicon-github-original",
	},
	{
		group: "other",
		category: "Cloud & Ops",
		name: "Firebase",
		icon: "devicon-firebase-plain",
	},
	{
		group: "other",
		category: "Cloud & Ops",
		name: "Supabase",
		icon: "devicon-supabase-plain",
	},
	{ group: "other", category: "Cloud & Ops", name: "Proxmox" },
];

export function skillsByGroup(group: Skill["group"]): Record<string, Skill[]> {
	return SKILLS.filter((s) => s.group === group).reduce<
		Record<string, Skill[]>
	>((acc, s) => {
		if (!acc[s.category]) acc[s.category] = [];
		acc[s.category].push(s);
		return acc;
	}, {});
}
