import type { ApiResponse, SeoData } from "./api";

export interface ConsultationPageData {
	title?: string;
	slug?: string;
	seo?: SeoData | null;
	sections?: any;
}

export type ConsultationPageResponse = ApiResponse<ConsultationPageData>;

