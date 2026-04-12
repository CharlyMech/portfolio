export type SkillLevel = 'expert' | 'proficient' | 'learning';

/** Three-tier skill grouping within a category */
export type SkillTier = 'primary' | 'secondary' | 'familiar';

export interface Skill {
  name: string;
  level: SkillLevel;
  tier: SkillTier;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  sublabel: string;
  skills: Skill[];
}
