import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { fetchData } from "@/lib/api";
import type { BlogsApiResponse } from "@/types/blogs";
import type { CasesApiResponse } from "@/types/before-after";

const BASE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://safehealthme.cloud";

const STATIC_ROUTES = [
	{ path: "", priority: 1.0, changeFrequency: "daily" as const },
	{ path: "/about-us", priority: 0.8, changeFrequency: "monthly" as const },
	{ path: "/treatments", priority: 0.9, changeFrequency: "weekly" as const },
	{ path: "/our-doctors", priority: 0.9, changeFrequency: "weekly" as const },
	{ path: "/before-after", priority: 0.9, changeFrequency: "weekly" as const },
	{ path: "/blogs", priority: 0.8, changeFrequency: "daily" as const },
	{
		path: "/patient-journey",
		priority: 0.8,
		changeFrequency: "monthly" as const,
	},
	{ path: "/contact-us", priority: 0.7, changeFrequency: "monthly" as const },
	{ path: "/consultation", priority: 0.9, changeFrequency: "weekly" as const },
	{
		path: "/privacy-policy",
		priority: 0.3,
		changeFrequency: "yearly" as const,
	},
	{
		path: "/terms-and-conditions",
		priority: 0.3,
		changeFrequency: "yearly" as const,
	},
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const locales = routing.locales;

	// 1. Static Routes across all locales with alternate links
	const staticEntries: MetadataRoute.Sitemap = [];

	for (const route of STATIC_ROUTES) {
		for (const locale of locales) {
			const languageAlternates: Record<string, string> = {};
			for (const altLocale of locales) {
				languageAlternates[altLocale] = `${BASE_URL}/${altLocale}${route.path}`;
			}

			staticEntries.push({
				url: `${BASE_URL}/${locale}${route.path}`,
				lastModified: new Date(),
				changeFrequency: route.changeFrequency,
				priority: route.priority,
				alternates: {
					languages: languageAlternates,
				},
			});
		}
	}

	// 2. Dynamic Blog Posts
	let blogEntries: MetadataRoute.Sitemap = [];
	try {
		const blogsRes = await fetchData<BlogsApiResponse>({
			route: "/blogs",
			params: { per_page: "100" },
		});
		const blogs = blogsRes?.data || [];

		blogEntries = blogs.flatMap((blog) =>
			locales.map((locale) => {
				const languageAlternates: Record<string, string> = {};
				for (const altLocale of locales) {
					languageAlternates[altLocale] =
						`${BASE_URL}/${altLocale}/blogs/${blog.slug}`;
				}

				return {
					url: `${BASE_URL}/${locale}/blogs/${blog.slug}`,
					lastModified: blog.published_at
						? new Date(blog.published_at)
						: new Date(),
					changeFrequency: "weekly" as const,
					priority: 0.7,
					alternates: {
						languages: languageAlternates,
					},
				};
			}),
		);
	} catch {
		// Fallback safely if API is temporarily unavailable
	}

	// 3. Dynamic Before & After Cases
	let caseEntries: MetadataRoute.Sitemap = [];
	try {
		const casesRes = await fetchData<CasesApiResponse>({
			route: "/cases",
			params: { per_page: "100" },
		});
		const cases = casesRes?.data || [];

		caseEntries = cases.flatMap((item) =>
			locales.map((locale) => {
				const languageAlternates: Record<string, string> = {};
				for (const altLocale of locales) {
					languageAlternates[altLocale] =
						`${BASE_URL}/${altLocale}/before-after/${item.slug}`;
				}

				return {
					url: `${BASE_URL}/${locale}/before-after/${item.slug}`,
					lastModified: new Date(),
					changeFrequency: "weekly" as const,
					priority: 0.7,
					alternates: {
						languages: languageAlternates,
					},
				};
			}),
		);
	} catch {
		// Fallback safely if API is temporarily unavailable
	}

	return [...staticEntries, ...blogEntries, ...caseEntries];
}
