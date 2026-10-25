"use client";

import { PageHero } from "@/components/shared/page-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/lib/language-context";

export function ArticleDetailSkeleton() {
	const { t } = useTranslation();

	return (
		<main className="flex flex-col flex-1">
			<PageHero
				title={t("articles.loading")}
				breadcrumbs={[
					{ label: t("articles.title"), href: "/articles" },
					{ label: "..." },
				]}
			/>
			<div className="container max-w-4xl px-4 sm:px-6 py-12 md:py-16 space-y-8">
				{/* Author bar placeholder */}
				<div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
					<div className="flex items-center gap-3">
						<Skeleton className="size-10 rounded-full shrink-0" />
						<Skeleton className="h-4 w-32" />
					</div>
					<Skeleton className="h-4 w-24" />
				</div>

				{/* Cover image placeholder */}
				<Skeleton className="aspect-video w-full rounded-2xl" />

				{/* Content paragraphs */}
				<div className="space-y-4 pt-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-11/12" />
					<Skeleton className="h-4 w-4/5" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</div>
		</main>
	);
}

export default ArticleDetailSkeleton;

