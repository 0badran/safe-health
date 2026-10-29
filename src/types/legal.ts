import type { SeoData } from "./api";

export interface LegalPageContentSection {
	content: string;
}

export interface LegalPageData {
	title: string;
	slug: string;
	seo: SeoData;
	sections: Record<string, LegalPageContentSection>;
}

export interface LegalPageResponse {
	success: boolean;
	message: string;
	data: LegalPageData;
}

