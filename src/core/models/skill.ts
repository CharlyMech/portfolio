export type SkillTier = "primary" | "secondary" | "familiar";

export interface Skill {
	name: string;
	tier: SkillTier;
	icon?: string;
}

export interface SkillCategory {
	id: string;
	label: string;
	sublabel: string;
	skills: Skill[];
}
