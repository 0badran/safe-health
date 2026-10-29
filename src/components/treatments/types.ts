export interface TreatmentCategory {
	id: string;
	number: string;
	title: string;
	tagline: string;
	discipline: string;
	description: string;
	procedures: string[];
	badge1: string;
	badge2: string;
	credential: string;
	image: string;
	anatomicalFocus: string[];
}

export type ServiceCategory = TreatmentCategory;
