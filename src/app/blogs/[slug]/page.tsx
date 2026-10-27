import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogDetailSkeleton } from "@/components/blogs/skeletons";
import { BlogDetailContent } from "@/components/blogs/blog-detail-content";
import { fetchData, getSeoMetadata, type ApiResponse } from "@/lib/api";
import type { BlogItem } from "@/types/blogs";

export const instant = false;

interface PageProps {
	params: Promise<{ slug: string }>;
}

async function getBlog(slug: string) {
	try {
		const json = await fetchData<ApiResponse<BlogItem>>({
			route: `/blogs/${slug}`,
		});
		return json?.data || null;
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const blog = await getBlog(slug);

	return getSeoMetadata(blog?.seo, blog?.title);
}

export default async function BlogDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const blog = await getBlog(slug);

	return (
		<Suspense fallback={<BlogDetailSkeleton />}>
			<BlogDetailContent slug={slug} initialBlog={blog} />
		</Suspense>
	);
}
