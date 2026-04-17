export type WorkModality = "remote" | "onsite" | "hybrid";

export interface ExperienceEntry {
	id: string;
	role: string;
	company?: string;
	location: string;
	modality?: WorkModality;
	modalityLabel?: string;
	period: string;
	isCurrent: boolean;
	description?: string;
	tags?: string[];
	note?: string;
}

export interface Education {
	id: string;
	degree: string;
	institution: string;
	location?: string;
	modality?: WorkModality;
	modalityLabel?: string;
	period: string;
	description?: string;
	onGoing?: boolean;
	tags?: string[];
	note?: string;
}
