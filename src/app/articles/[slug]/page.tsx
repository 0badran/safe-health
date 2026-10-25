"use client";

import { ArticleDetailSkeleton } from "@/components/articles/skeletons";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import type { SingleBlogApiResponse } from "@/types/blogs";
import { ArrowRightIcon, CalendarIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, use } from "react";

function ArticleContent({ params }: { params: Promise<{ slug: string }> }) {
	const resolvedParams = use(params);
	const slug = resolvedParams.slug;
	const { t } = useTranslation();

	const {
		data: apiResponse,
		isLoading,
		isError,
	} = useFetchData<SingleBlogApiResponse>({
		route: `/blogs/${slug}`,
	});

	const article = apiResponse?.data;

	if (isLoading) {
		return <ArticleDetailSkeleton />;
	}

	if (isError || !article) {
		return (
			<main className="flex flex-col flex-1">
				<PageHero
					title={t("articles.notFoundTitle")}
					breadcrumbs={[
						{ label: t("articles.title"), href: "/articles" },
						{ label: t("articles.error") },
					]}
				/>
				<div className="container max-w-4xl px-4 py-20 text-center space-y-4">
					<p className="small text-muted-foreground">
						{t("articles.notFoundDesc")}
					</p>
					<Button asChild variant="default">
						<Link href="/articles" className="gap-2">
							<ArrowRightIcon className="size-4 rtl:rotate-180" />
							<span className="small">{t("articles.backToArticles")}</span>
						</Link>
					</Button>
				</div>
			</main>
		);
	}

	return (
		<main className="flex flex-col flex-1">
			{/* Hero Banner with Article Title and Breadcrumbs */}
			<PageHero
				title={article.title}
				imageSrc={article.image_url || undefined}
				breadcrumbs={[
					{ label: t("articles.title"), href: "/articles" },
					{ label: article.title },
				]}
			/>

			<article className="container max-w-4xl px-4 sm:px-6 py-12 md:py-16 space-y-8">
				{/* Metadata & Author Bar - Only real available data */}
				{(article.author_name || article.published_at) && (
					<div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
						{article.author_name && (
							<div className="flex items-center gap-3">
								<div className="relative size-10 rounded-full overflow-hidden border bg-muted flex items-center justify-center shrink-0">
									{article.author_image ? (
										<Image
											src={article.author_image}
											alt={article.author_name}
											fill
											sizes="40px"
											className="object-cover"
										/>
									) : (
										<UserIcon className="size-5 text-muted-foreground" />
									)}
								</div>
								<span className="small font-bold text-foreground">
									{article.author_name}
								</span>
							</div>
						)}

						{article.published_at && (
							<div className="flex items-center gap-1.5 small text-muted-foreground">
								<CalendarIcon className="size-3.5 text-primary" />
								<span>{article.published_at}</span>
							</div>
						)}
					</div>
				)}

				{/* Article Cover Image - Only displayed if real image_url exists */}
				{article.image_url && (
					<div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-sm bg-muted">
						<Image
							src={article.image_url}
							alt={article.title}
							fill
							priority
							sizes="(max-width: 1024px) 100vw, 896px"
							className="object-cover"
						/>
					</div>
				)}

				{/* Article Body Content */}
				{article.content && (
					<div className="prose prose-lg dark:prose-invert max-w-none text-paragraph leading-relaxed whitespace-pre-line">
						{article.content}
					</div>
				)}

				{/* Back to Articles Button */}
				<div className="pt-8 border-t border-border flex justify-start">
					<Button asChild variant="outline">
						<Link href="/articles" className="gap-2">
							<ArrowRightIcon className="size-4 rtl:rotate-0 rotate-180" />
							<span className="small">{t("articles.backToAll")}</span>
						</Link>
					</Button>
				</div>
			</article>
		</main>
	);
}

export default function ArticleDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	return (
		<Suspense fallback={<ArticleDetailSkeleton />}>
			<ArticleContent params={params} />
		</Suspense>
	);
}
