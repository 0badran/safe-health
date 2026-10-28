import type { PaginatedApiResponse } from "./api";

export interface ServiceItem {
	id: number;
	slug: string;
	title: string;
	description?: string | null;
	sub_services?: string[] | null;
	image_url?: string | null;
	is_active?: boolean;
}

export type ServicesApiResponse = PaginatedApiResponse<ServiceItem>;

