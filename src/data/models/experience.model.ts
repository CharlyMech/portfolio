export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent: boolean;
  description: string;
  tags?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}
