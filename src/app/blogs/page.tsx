import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { BlogsList } from "@/components/blogs/blogs-list";
import { BlogCardSkeletonGrid } from "@/components/blogs/skeletons";
import { fetchData, getSeoMetadata, type ApiResponse } from "@/lib/api";
import type { BlogsPageData } from "@/types/blogs";

export const instant = false;

async function getBlogsPage() {
	try {
		const json = await fetchData<ApiResponse<BlogsPageData>>({
			route: "/pages/blogs",
		});
		return json?.data || null;
	} catch {
		return null;
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getBlogsPage();
	return getSeoMetadata(page?.seo);
}

export default async function BlogsPage() {
	const page = await getBlogsPage();
	const hero = page?.sections?.["blogs-hero"];

	return (
		<main className="flex flex-col flex-1">
			<PageHeader
				badge={hero?.tag_text}
				title={hero?.title}
				description={hero?.description}
			/>

			<div className="container mb-20">
				<Suspense fallback={<BlogCardSkeletonGrid count={6} />}>
					<BlogsList />
				</Suspense>
			</div>
		</main>
	);
}
