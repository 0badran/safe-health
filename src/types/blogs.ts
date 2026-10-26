export interface BlogItem {
	id: number;
	slug: string;
	title: string;
	content: string;
	image_url: string | null;
	author_name: string;
	author_image: string | null;
	published_at: string;
}

export interface BlogsApiResponse {
	key: string;
	message: string;
	data: BlogItem[];
	pagination?: {
		links?: {
			first?: string | null;
			last?: string | null;
			prev?: string | null;
			next?: string | null;
		};
		meta: {
			current_page: number;
			from?: number | null;
			last_page: number;
			path?: string;
			per_page?: number;
			to?: number | null;
			total?: number;
		};
	};
}

export interface SingleBlogApiResponse {
	key: string;
	message: string;
	data: BlogItem;
	pagination?: null;
}

