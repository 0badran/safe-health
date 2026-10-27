"use client";

import { BlogDetailSkeleton } from "@/components/blogs/skeletons";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import type { BlogItem, SingleBlogApiResponse } from "@/types/blogs";
import { ArrowRightIcon, CalendarIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface BlogDetailContentProps {
	slug: string;
	initialBlog?: BlogItem | null;
}

export function BlogDetailContent({
	slug,
	initialBlog,
}: BlogDetailContentProps) {
	const { t } = useTranslation();

	const {
		data: apiResponse,
		isLoading,
		isError,
	} = useFetchData<SingleBlogApiResponse>({
		route: `/blogs/${slug}`,
		initialData: initialBlog
			? {
					key: "success",
					message: "success",
					data: initialBlog,
				}
			: undefined,
	});

	const blog = apiResponse?.data ?? initialBlog;

	if (isLoading && !blog) {
		return <BlogDetailSkeleton />;
	}

	if (isError || !blog) {
		return (
			<main className="flex flex-col flex-1">
				<PageHero
					title={t("blogs.notFoundTitle")}
					breadcrumbs={[
						{ label: t("blogs.title"), href: "/blogs" },
						{ label: t("blogs.error") },
					]}
				/>
				<div className="container max-w-4xl px-4 py-20 text-center space-y-4">
					<p className="small text-muted-foreground">
						{t("blogs.notFoundDesc")}
					</p>
					<Button asChild variant="default">
						<Link href="/blogs" className="gap-2">
							<ArrowRightIcon className="size-4 rtl:rotate-180" />
							<span className="small">{t("blogs.backToBlogs")}</span>
						</Link>
					</Button>
				</div>
			</main>
		);
	}

	return (
		<main className="flex flex-col flex-1">
			{/* Hero Banner with Blog Title and Breadcrumbs */}
			<PageHero
				title={blog.title}
				imageSrc={blog.image_url || undefined}
				breadcrumbs={[
					{ label: t("blogs.title"), href: "/blogs" },
					{ label: blog.title },
				]}
			/>

			<article className="container max-w-4xl px-4 sm:px-6 py-12 md:py-16 space-y-8">
				{/* Metadata & Author Bar - Only real available data */}
				{(blog.author_name || blog.published_at) && (
					<div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
						{blog.author_name && (
							<div className="flex items-center gap-3">
								<div className="relative size-10 rounded-full overflow-hidden border bg-muted flex items-center justify-center shrink-0">
									{blog.author_image ? (
										<Image
											src={blog.author_image}
											alt={blog.author_name}
											fill
											sizes="40px"
											className="object-cover"
										/>
									) : (
										<UserIcon className="size-5 text-muted-foreground" />
									)}
								</div>
								<span className="small font-bold text-foreground">
									{blog.author_name}
								</span>
							</div>
						)}

						{blog.published_at && (
							<div className="flex items-center gap-1.5 small text-muted-foreground">
								<CalendarIcon className="size-3.5 text-primary" />
								<span>{blog.published_at}</span>
							</div>
						)}
					</div>
				)}

				{/* Blog Cover Image - Only displayed if real image_url exists */}
				{blog.image_url && (
					<div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-sm bg-muted">
						<Image
							src={blog.image_url}
							alt={blog.title}
							fill
							priority
							sizes="(max-width: 1024px) 100vw, 896px"
							className="object-cover"
						/>
					</div>
				)}

				{/* Blog Body Content */}
				{blog.content && (
					<div className="prose prose-lg dark:prose-invert max-w-none text-paragraph leading-relaxed whitespace-pre-line">
						{blog.content}
					</div>
				)}

				{/* Back to Blogs Button */}
				<div className="pt-8 border-t border-border flex justify-start">
					<Button asChild variant="outline">
						<Link href="/blogs" className="gap-2">
							<ArrowRightIcon className="size-4 rtl:rotate-0 rotate-180" />
							<span className="small">{t("blogs.backToAll")}</span>
						</Link>
					</Button>
				</div>
			</article>
		</main>
	);
}

export default BlogDetailContent;
