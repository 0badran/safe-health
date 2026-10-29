import type { ApiResponse, PaginatedApiResponse, SeoData } from "./api";
import type { HomeConsultationCtaSection } from "./home";

export interface BeforeAfterHeroSection {
	tag_text?: string;
	headline?: string;
	description?: string;
}

export interface BeforeAfterPageSections {
	"before-after-hero"?: BeforeAfterHeroSection;
	"consultation-cta"?: HomeConsultationCtaSection;
}

export interface BeforeAfterPageData {
	title?: string;
	slug?: string;
	seo?: SeoData | null;
	sections?: BeforeAfterPageSections;
}

export type BeforeAfterPageResponse = ApiResponse<BeforeAfterPageData>;

export interface CaseItem {
	id: number;
	slug: string;
	treatment: string;
	title: string;
	location: string;
	description_preview: string;
	description_full: string;
	image_before_url: string;
	image_after_url: string;
}

export type CasesApiResponse = PaginatedApiResponse<CaseItem>;
export type CaseDropdownResponse = ApiResponse<string[]>;
