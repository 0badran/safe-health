import type { ApiResponse, SeoData } from "./api";

export interface AboutHeroSection {
	tag_text?: string;
	headline?: string;
	description?: string;
}

export interface AboutOverviewSection {
	headline?: string;
	description?: string;
	feature_image?: string | null;
	stat_card?: Array<{
		title: string;
		number: string;
	}>;
}

export interface GuidingPhilosophySection {
	tag_text?: string;
	headline?: string;
	description?: string;
	secondary_description?: string;
	section_image?: string | null;
}

export interface ApproachToCareSection {
	tag_text?: string;
	headline?: string;
	step_card?: Array<{
		step_number: string;
		icon?: string | null;
		title: string;
		description: string;
	}>;
}

export interface OurExpertiseSection {
	headline?: string;
	feature_image?: string | null;
	feature_card?: Array<{
		number: string;
		title: string;
		description: string;
	}>;
}

export interface GlobalReachSection {
	tag_text?: string;
	headline?: string;
	description?: string;
	map_image?: string | null;
	feature_card?: Array<{
		icon?: string | null;
		title: string;
		description: string;
	}>;
	bottom_feature_card?: Array<{
		icon?: string | null;
		title: string;
		description: string;
	}>;
	map_countries:
	{
		name: string
		flag: string,
		longitude: number,
		latitude: number
	}[]
}

export interface AboutConsultationCtaSection {
	headline?: string;
	description?: string;
	background_image?: string | null;
}

export interface AboutPageSections {
	"about-hero"?: AboutHeroSection;
	"about-overview"?: AboutOverviewSection;
	"guiding-philosophy"?: GuidingPhilosophySection;
	"approach-to-care"?: ApproachToCareSection;
	"our-expertise"?: OurExpertiseSection;
	"global-reach"?: GlobalReachSection;
	"consultation-cta"?: AboutConsultationCtaSection;
}

export interface AboutPageData {
	title: string;
	slug: string;
	seo?: SeoData | null;
	sections: AboutPageSections;
}

export type AboutPageResponse = ApiResponse<AboutPageData>;

