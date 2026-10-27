"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { BlogCard } from "@/components/blogs/blog-card";
import { BlogCardSkeletonGrid } from "@/components/blogs/skeletons";
import { BlogsFilter } from "@/components/blogs/blogs-filter";
import AppPagination from "@/components/shared/app-pagination";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import type { BlogsApiResponse } from "@/types/blogs";

export function BlogsList() {
	const { t } = useTranslation();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;
	const search = searchParams.get("search") || undefined;
	const published_after = searchParams.get("published_after") || undefined;
	const published_before = searchParams.get("published_before") || undefined;
	const sort = searchParams.get("sort") || undefined;

	const {
		data: apiResponse,
		isLoading,
		isError,
	} = useFetchData<BlogsApiResponse>({
		route: "/blogs",
		params: {
			page: String(page),
			per_page: "15",
			search,
			published_after,
			published_before,
			sort,
		},
	});

	const blogs = apiResponse?.data ?? [];
	const last_page = apiResponse?.pagination?.meta?.last_page ?? 1;

	return (
		<div id="blogs-list" className="w-full">
			<BlogsFilter className="mb-8 lg:mb-10" />

			{/* Loading State: Skeletons using Shadcn */}
			{isLoading && <BlogCardSkeletonGrid count={6} />}

			{/* Error State */}
			{!isLoading && isError && (
				<div className="text-center py-16 space-y-3">
					<p className="text-destructive font-medium small">
						{t("blogs.errorLoading")}
					</p>
				</div>
			)}

			{/* Empty State */}
			{!isLoading && !isError && blogs.length === 0 && (
				<div className="text-center py-16 space-y-3">
					<p className="text-muted-foreground small">
						{t("blogs.emptyBlogs")}
					</p>
				</div>
			)}

			{/* Success State: Reusable BlogCards Grid */}
			{!isLoading && !isError && blogs.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{blogs.map((blog) => (
						<BlogCard key={blog.id} blog={blog} />
					))}
				</div>
			)}

			{/* Pagination Control */}
			{!isLoading && !isError && (
				<AppPagination last_page={last_page} />
			)}
		</div>
	);
}

export default BlogsList;
