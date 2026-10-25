"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { ArticleCard } from "@/components/articles/article-card";
import { ArticleCardSkeletonGrid } from "@/components/articles/skeletons";
import AppPagination from "@/components/shared/app-pagination";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import type { BlogsApiResponse } from "@/types/blogs";

export function ArticlesList() {
	const { t } = useTranslation();
	const searchParams = useSearchParams();
	const current_page = Number(searchParams.get("page")) || 1;

	const {
		data: apiResponse,
		isLoading,
		isError,
	} = useFetchData<BlogsApiResponse>({
		route: "/blogs",
		params: { page: String(current_page) },
	});

	const blogs = apiResponse?.data ?? [];
	const last_page = apiResponse?.pagination?.meta?.last_page ?? 1;

	return (
		<div id="articles-list" className="w-full">
			{/* Loading State: Skeletons using Shadcn */}
			{isLoading && <ArticleCardSkeletonGrid count={6} />}

			{/* Error State */}
			{!isLoading && isError && (
				<div className="text-center py-16 space-y-3">
					<p className="text-destructive font-medium small">
						{t("articles.errorLoading")}
					</p>
				</div>
			)}

			{/* Empty State */}
			{!isLoading && !isError && blogs.length === 0 && (
				<div className="text-center py-16 space-y-3">
					<p className="text-muted-foreground small">
						{t("articles.emptyArticles")}
					</p>
				</div>
			)}

			{/* Success State: Reusable ArticleCards Grid */}
			{!isLoading && !isError && blogs.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{blogs.map((article) => (
						<ArticleCard key={article.id} article={article} />
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

export default ArticlesList;
