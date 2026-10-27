import type { ApiResponse, SeoData } from "./api";

export interface DoctorsHeroSection {
	tag_text?: string;
	headline?: string;
	description?: string;
}

export interface DoctorsConsultationCtaSection {
	headline?: string;
	description?: string;
	background_image?: string | null;
}

export interface DoctorsPageSections {
	"doctors-hero"?: DoctorsHeroSection;
	"consultation-cta"?: DoctorsConsultationCtaSection;
}

export interface DoctorsPageData {
	title: string;
	slug: string;
	seo?: SeoData | null;
	sections: DoctorsPageSections;
}

export type DoctorsPageResponse = ApiResponse<DoctorsPageData>;

export interface DoctorItem {
	id: number;
	name: string;
	title: string;
	experience_years: number;
	specialties: string[];
	bio: string;
	image: string | null;
	is_active: boolean;
}

export type DoctorsApiResponse = ApiResponse<DoctorItem[]>;

export interface DoctorsQueryParams {
	search?: string;
	title?: string;
	specialty?: string;
	page?: number | string;
	per_page?: number | string;
}

