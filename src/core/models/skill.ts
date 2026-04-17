export type SkillGroup = 'main' | 'other';

export interface Skill {
	name: string;
	group: SkillGroup;
	category: string;
	icon?: string;
}
