"use client";

import { SectionCarousel } from "@/components/shared/section-carousel";
import SectionHeader from "@/components/shared/section-header";
import useFetchData from "@/hooks/use-fetch-data";
import type { HomeBlogsSection } from "@/types/home";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface BlogItem {
	id: number | string;
	slug?: string;
	title: string;
	content?: string;
	image_url?: string | null;
	published_at?: string;
	author_name: string;
	author_image: string | null;
}

export interface BlogsSectionProps {
	data?: HomeBlogsSection;
}

export function BlogsSection({ data }: BlogsSectionProps = {}) {
	const { data: apiResponse, isLoading } = useFetchData<{ data: BlogItem[] }>({
		route: "/blogs",
	});

	const posts = apiResponse?.data;

	if (!isLoading && (!posts || posts.length === 0)) {
		return null;
	}

	if (isLoading && !posts) {
		return null;
	}

	if (!data || !data.headline) {
		return null;
	}

	const subTitle = data.tag_text;
	const title = data.headline;

	return (
		<section id="blogs">
			<SectionHeader subTitle={subTitle} title={title} />

			<SectionCarousel
				items={posts ?? []}
				keyExtractor={(post) => String(post.id)}
				itemClassName="ps-4 basis-[70%] sm:basis-[40%] md:basis-[40%] lg:basis-1/3"
				contentClassName="-ms-4 py-2"
				renderItem={(post) => {
					const postTitle = post.title;
					const postDescription = post.content || "";
					const postImage =
						post.image_url || "/images/why-choose/aesthetic-care.jpg";
					const postDate = post.published_at || "";

					return (
						<article className="group h-full flex flex-col justify-between rounded-3xl bg-card p-4 sm:p-5 transition-all duration-300 border">
							{/* Card Top: Author Avatar, Name & Date */}
							<div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
								{post.author_name && (
									<div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
										<div className="relative size-10 sm:size-11 rounded-full overflow-hidden shrink-0 border border-border/50 bg-secondary">
											<Image
												src={post.author_image || "/avatar.svg"}
												alt={post.author_name}
												fill
												sizes="44px"
												className="object-cover"
											/>
										</div>
										<span className="font-semibold text-primary text-sm sm:text-base truncate">
											{post.author_name}
										</span>
									</div>
								)}
								{postDate && (
									<span className="text-muted-foreground small shrink-0">
										{postDate}
									</span>
								)}
							</div>

							{/* Card Image */}
							<div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden mb-3.5 sm:mb-4 bg-muted">
								<Image
									src={postImage}
									alt={postTitle}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>

							{/* Card Body */}
							<div className="flex flex-col flex-1 justify-between gap-3">
								<h3 className="font-heading font-medium italic h5 text-primary leading-snug group-hover:text-secondary transition-colors">
									{postTitle}
								</h3>

								<div className="flex items-end justify-between gap-3 pt-1">
									<p className="text-paragraph small leading-relaxed line-clamp-3 flex-1">
										{postDescription}
									</p>

									<Link
										href={"/blogs/" + post.slug}
										aria-label={`Read article: ${postTitle}`}
										className="size-9 sm:size-10 rounded-full bg-purple-tint/77 text-primary flex items-center justify-center shrink-0 transition-all duration-300 hover:bg-primary hover:text-white backdrop-blur-md border border-border/20"
									>
										<ArrowUpRight className="size-4 transition-transform duration-300" />
									</Link>
								</div>
							</div>
						</article>
					);
				}}
			/>
		</section>
	);
}

export default BlogsSection;
