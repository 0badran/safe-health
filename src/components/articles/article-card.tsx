"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogItem } from "@/types/blogs";

export interface ArticleCardProps {
	article: BlogItem;
	className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
	const postTitle = article.title;
	const postDescription = article.content || "";
	const postImage = article.image_url;
	const postDate = article.published_at || "";

	return (
		<Link
			href={`/articles/${article.slug}`}
			aria-label={postTitle}
			className={cn(
				"group h-full flex flex-col justify-between rounded-3xl bg-card p-4 sm:p-5 transition-all duration-300 border hover:shadow-xl hover:-translate-y-1 cursor-pointer select-none",
				className,
			)}
		>
			<div>
				{/* Card Top: Author Avatar, Name & Date */}
				<div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
					{article.author_name ? (
						<div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
							<div className="relative size-10 sm:size-11 rounded-full overflow-hidden shrink-0 border border-border/50 bg-secondary/10 flex items-center justify-center">
								{article.author_image ? (
									<Image
										src={article.author_image}
										alt={article.author_name}
										fill
										sizes="44px"
										className="object-cover"
									/>
								) : (
									<UserIcon className="size-5 text-muted-foreground" />
								)}
							</div>
							<span className="font-semibold text-primary h6 truncate">
								{article.author_name}
							</span>
						</div>
					) : (
						<div />
					)}
					{postDate && (
						<span className="text-muted-foreground small shrink-0">
							{postDate}
						</span>
					)}
				</div>

				{/* Card Image (only if real image exists) */}
				{postImage && (
					<div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden mb-3.5 sm:mb-4 bg-muted">
						<Image
							src={postImage}
							alt={postTitle}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					</div>
				)}

				{/* Card Title */}
				<h3 className="font-heading font-medium italic h5 text-primary leading-snug group-hover:text-secondary transition-colors mb-3">
					{postTitle}
				</h3>
			</div>

			{/* Card Bottom: Description & Arrow Action */}
			<div className="flex items-end justify-between gap-3 pt-2 mt-auto">
				<p className="text-paragraph small leading-relaxed line-clamp-3 flex-1">
					{postDescription}
				</p>

				<div
					aria-hidden="true"
					className="size-9 sm:size-10 rounded-full bg-purple-tint/77 text-primary flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-white backdrop-blur-md border border-border/20"
				>
					<ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</div>
			</div>
		</Link>
	);
}

export default ArticleCard;
