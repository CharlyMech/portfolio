export type WorkModality = "remote" | "onsite" | "hybrid";

export interface Period {
	start: string;
	end?: string;
}

export interface ExperienceEntry {
	id: string;
	role: string;
	company?: string;
	location: string;
	modality?: WorkModality;
	modalityLabel?: string;
	period: Period;
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
	period: Period;
	description?: string;
	tags?: string[];
	note?: string;
}
