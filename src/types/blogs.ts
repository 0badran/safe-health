import type { ApiResponse } from "./api";

export interface BlogItem {
	id: number;
	slug: string;
	title: string;
	content: string;
	image_url: string | null;
	author_name: string;
	author_image: string | null;
	published_at: string;
	seo?: {
		meta_title: string | null;
		meta_description: string | null;
		meta_keywords: string | null;
	} | null;
}

export interface BlogsHeroSection {
	tag_text?: string;
	title?: string;
	description?: string;
}

export interface BlogsPageSections {
	"blogs-hero"?: BlogsHeroSection;
}

export interface BlogsPageData {
	title?: string;
	slug?: string;
	seo?: {
		meta_title?: string | null;
		meta_description?: string | null;
		meta_keywords?: string | null;
	} | null;
	sections?: BlogsPageSections;
}

export type BlogsApiResponse = ApiResponse<BlogItem[]>;
export type SingleBlogApiResponse = ApiResponse<BlogItem>;

export type ArticleItem = BlogItem;
export type ArticlesApiResponse = BlogsApiResponse;
export type SingleArticleApiResponse = SingleBlogApiResponse;
