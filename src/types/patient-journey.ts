import type { ApiResponse, SeoData } from "./api";

export interface JourneyHeroSection {
	tag_text?: string;
	headline?: string;
	description?: string;
}

export interface JourneyStepCardItem {
	step_number: string;
	sidebar_title: string;
	sidebar_description: string;
	main_title: string;
	main_description: string;
	image: string | null;
}

export interface JourneyStepsSection {
	journey_step_card?: JourneyStepCardItem[];
}

export interface JourneyDifferenceFeatureCard {
	icon: string | null;
	title: string;
	description: string;
}

export interface JourneyDifferenceSection {
	tag_text?: string;
	headline?: string;
	description?: string;
	feature_card?: JourneyDifferenceFeatureCard[];
}

export interface JourneyStatCard {
	number: string;
	title: string;
	description: string;
}

export interface JourneyStatsSection {
	stat_card?: JourneyStatCard[];
}

export interface JourneyConsultationCtaSection {
	headline?: string;
	description?: string;
	background_image?: string | null;
}

export interface PatientJourneyPageSections {
	"journey-hero"?: JourneyHeroSection;
	"journey-steps"?: JourneyStepsSection;
	"journey-difference"?: JourneyDifferenceSection;
	"journey-stats"?: JourneyStatsSection;
	"consultation-cta"?: JourneyConsultationCtaSection;
}

export interface PatientJourneyPageData {
	title: string;
	slug: string;
	seo?: SeoData | null;
	sections: PatientJourneyPageSections;
}

export type PatientJourneyPageResponse = ApiResponse<PatientJourneyPageData>;

