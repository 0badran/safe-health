import type { ApiResponse, SeoData } from "./api";
import type { HomeConsultationCtaSection } from "./home";

export interface ContactHeroSection {
	tag_text?: string;
	headline?: string;
	description?: string;
}

export interface ContactFormSection {
	tag_text?: string;
	headline?: string;
	description?: string;
}

export interface ContactPageSections {
	"contact-hero"?: ContactHeroSection;
	"contact-form-section"?: ContactFormSection;
	"consultation-cta"?: HomeConsultationCtaSection;
}

export interface ContactPageData {
	title: string;
	slug: string;
	seo?: SeoData | null;
	sections: ContactPageSections;
}

export type ContactPageResponse = ApiResponse<ContactPageData>;
