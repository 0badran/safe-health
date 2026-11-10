import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { fetchData } from "@/lib/api";
import type { ApiResponse, SeoData } from "@/types/api";

export type { SeoData };

export interface SeoFallback {
	title?: string;
	description?: string;
}

export interface SeoRouteOptions {
	locale: string;
	path?: string;
}

/**
 * Builds self-referencing canonical and localized alternate links resolved against metadataBase
 */
export function buildAlternates(
	locale: string,
	path = "",
): NonNullable<Metadata["alternates"]> {
	const normalizedPath =
		!path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;

	const languages = Object.fromEntries(
		routing.locales.map((loc) => [loc, `/${loc}${normalizedPath}`]),
	);

	return {
		canonical: `/${locale}${normalizedPath}`,
		languages,
	};
}

/**
 * Transforms an API seo object into a Next.js Metadata object
 */
export function getSeoMetadata(
	seo?: SeoData | null,
	fallback?: string | SeoFallback,
	route?: SeoRouteOptions,
): Metadata {
	const fallbackTitle =
		typeof fallback === "string" ? fallback : fallback?.title;
	const fallbackDescription =
		typeof fallback === "object" ? fallback?.description : undefined;

	return {
		title: seo?.meta_title || fallbackTitle || undefined,
		description: seo?.meta_description || fallbackDescription || undefined,
		keywords: seo?.meta_keywords || undefined,
		...(route
			? { alternates: buildAlternates(route.locale, route.path) }
			: {}),
	};
}

/**
 * Fetches page SEO by slug from /pages/{slug} and returns a Next.js Metadata object
 */
export async function fetchPageSeo(
	slug: string,
	fallback?: string | SeoFallback,
	route?: SeoRouteOptions,
): Promise<Metadata> {
	try {
		const json = await fetchData<ApiResponse<{ seo?: SeoData | null }>>({
			route: `/pages/${slug}`,
		});
		return getSeoMetadata(json?.data?.seo, fallback, route);
	} catch {
		return getSeoMetadata(null, fallback, route);
	}
}

export default getSeoMetadata;
