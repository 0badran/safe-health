import type { Metadata } from "next";
import { fetchData } from "@/lib/api";
import type { ApiResponse, SeoData } from "@/types/api";

export type { SeoData };

export interface SeoFallback {
	title?: string;
	description?: string;
}

/**
 * Transforms an API seo object into a Next.js Metadata object
 */
export function getSeoMetadata(
	seo?: SeoData | null,
	fallback?: string | SeoFallback,
): Metadata {
	const fallbackTitle =
		typeof fallback === "string" ? fallback : fallback?.title;
	const fallbackDescription =
		typeof fallback === "object" ? fallback?.description : undefined;

	return {
		title: seo?.meta_title || fallbackTitle || undefined,
		description: seo?.meta_description || fallbackDescription || undefined,
		keywords: seo?.meta_keywords || undefined,
	};
}

/**
 * Fetches page SEO by slug from /pages/{slug} and returns a Next.js Metadata object
 */
export async function fetchPageSeo(
	slug: string,
	fallback?: string | SeoFallback,
): Promise<Metadata> {
	try {
		const json = await fetchData<ApiResponse<{ seo?: SeoData | null }>>({
			route: `/pages/${slug}`,
		});
		return getSeoMetadata(json?.data?.seo, fallback);
	} catch {
		return getSeoMetadata(null, fallback);
	}
}

export default getSeoMetadata;

