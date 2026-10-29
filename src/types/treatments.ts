import type { ApiResponse, SeoData } from "./api";
import type { HomeConsultationCtaSection, HomePatientJourneySection } from "./home";

export interface TreatmentsHeroSection {
	tag_text?: string;
	headline?: string;
	description?: string;
}

export interface ExploreOurTreatmentsSection {
	tag_text?: string;
	headline?: string;
	description?: string;
}

export interface TreatmentsPageSections {
	"treatments-hero"?: TreatmentsHeroSection;
	"explore-our-treatments"?: ExploreOurTreatmentsSection;
	"treatment-journey"?: HomePatientJourneySection;
	"consultation-cta"?: HomeConsultationCtaSection;
}

export interface TreatmentsPageData {
	title?: string;
	slug?: string;
	seo?: SeoData;
	sections?: TreatmentsPageSections;
}

export type TreatmentsPageResponse = ApiResponse<TreatmentsPageData>;

