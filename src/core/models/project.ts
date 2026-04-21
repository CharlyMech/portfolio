export type ProjectStatus = "dev" | "prod" | "archived" | "backlog" | "paused";

export interface Project {
	id: string;
	title: string;
	description: string;
	longDescription?: string;
	tags?: string[];
	status: ProjectStatus;
	url?: string;
	github?: string;
	image?: string;
	featured?: boolean;
	year?: string;
}
