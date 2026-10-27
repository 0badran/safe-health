export interface PaginationLinks {
	first: string | null;
	last: string | null;
	prev: string | null;
	next: string | null;
}

export interface PaginationMetaLink {
	url: string | null;
	label: string;
	page?: number | null;
	active: boolean;
}

export interface PaginationMeta {
	current_page: number;
	from: number | null;
	last_page: number;
	links?: PaginationMetaLink[];
	path?: string;
	per_page: number;
	to: number | null;
	total?: number;
}

export interface Pagination {
	links?: PaginationLinks;
	meta?: PaginationMeta;
}

export interface SeoData {
	meta_title?: string | null;
	meta_description?: string | null;
	meta_keywords?: string | null;
}

export interface ApiResponse<T = any> {
	key?: string;
	success?: boolean;
	message?: string;
	data: T;
	pagination?: Pagination | null;
}

export type PaginatedApiResponse<T = any> = ApiResponse<T[]>;
export type SingleApiResponse<T = any> = ApiResponse<T>;

