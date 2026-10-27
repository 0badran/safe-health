import type { ApiResponse, SeoData } from "./api";

export interface HomeHeroSection {
	headline?: string;
	description?: string;
	background_image?: string | null;
	hero_video?: string | null;
}

export interface HomeStatsSection {
	stat_card?: Array<{
		number: string;
		title: string;
	}>;
}

export interface HomeWhyChooseSection {
	tag_text?: string;
	headline?: string;
	description?: string;
	feature_card?: Array<{
		title: string;
		description: string;
		image?: string | null;
	}>;
}

export interface HomeCoreSpecialtySection {
	tag_text?: string;
	tag_icon?: string | null;
	headline?: string;
	description?: string;
	image?: string | null;
	feature_card?: Array<{
		icon?: string | null;
		title: string;
		description: string;
	}>;
}

export interface ServiceItem {
	id: number | string;
	slug: string;
	title: string;
	description: string;
	sub_services?: string[];
	image_url?: string | null;
	is_active?: boolean;
}

export interface HomeHealthcareOptionsSection {
	headline?: string;
	description?: string;
}

export interface HomeDoctorsSection {
	tag_text?: string;
	headline?: string;
	description?: string;
	feature_card?: Array<{
		icon?: string | null;
		title: string;
		description: string;
	}>;
}

export interface HomePatientJourneySection {
	headline?: string;
	description?: string;
	step_card?: Array<{
		step_number: string;
		icon?: string | null;
		title: string;
		description: string;
		image?: string | null;
	}>;
}

export interface HomeFaqSection {
	section_image?: string | null;
	faq_card?: Array<{
		number: string;
		question: string;
		answer: string;
	}>;
}

export interface HomeBlogsSection {
	tag_text?: string;
	headline?: string;
}

export interface HomeConsultationCtaSection {
	headline?: string;
	description?: string;
	background_image?: string | null;
}

export interface HomePageSections {
	"home-hero"?: HomeHeroSection;
	"stats-section"?: HomeStatsSection;
	"why-choose-us"?: HomeWhyChooseSection;
	"core-specialty"?: HomeCoreSpecialtySection;
	"healthcare-options"?: HomeHealthcareOptionsSection;
	"home-doctors"?: HomeDoctorsSection;
	"patient-journey"?: HomePatientJourneySection;
	"faq-section"?: HomeFaqSection;
	"home-blogs"?: HomeBlogsSection;
	"consultation-cta"?: HomeConsultationCtaSection;
}

export interface HomePageData {
	title: string;
	slug: string;
	seo?: SeoData | null;
	sections: HomePageSections;
}

export type HomePageResponse = ApiResponse<HomePageData>;

