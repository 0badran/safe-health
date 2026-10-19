"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/shared/section-header";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";

export interface BlogPost {
	id: string;
	title: string;
	description: string;
	image: string;
	date: string;
	author: {
		name: string;
		avatar: string;
	};
	link?: string;
}

const DEFAULT_POSTS: BlogPost[] = [
	{
		id: "1",
		title: "Informed Choices Begin With Knowledge.",
		description:
			"Explore expert insights, treatment guides, and helpful advice to make more confident decisions about your aesthetic care ....",
		image: "/images/why-choose/aesthetic-care.jpg",
		date: "15 Dec2025",
		author: {
			name: "Dr / Mohamed",
			avatar: "/images/blog-author.jpg",
		},
		link: "/articles/1",
	},
	{
		id: "2",
		title: "Informed Choices Begin With Knowledge.",
		description:
			"Explore expert insights, treatment guides, and helpful advice to make more confident decisions about your aesthetic care ....",
		image: "/images/why-choose/aesthetic-care.jpg",
		date: "15 Dec2025",
		author: {
			name: "Dr / Mohamed",
			avatar: "/images/blog-author.jpg",
		},
		link: "/articles/2",
	},
	{
		id: "3",
		title: "Informed Choices Begin With Knowledge.",
		description:
			"Explore expert insights, treatment guides, and helpful advice to make more confident decisions about your aesthetic care ....",
		image: "/images/why-choose/aesthetic-care.jpg",
		date: "15 Dec2025",
		author: {
			name: "Dr / Mohamed",
			avatar: "/images/blog-author.jpg",
		},
		link: "/articles/3",
	},
	{
		id: "4",
		title: "Informed Choices Begin With Knowledge.",
		description:
			"Explore expert insights, treatment guides, and helpful advice to make more confident decisions about your aesthetic care ....",
		image: "/images/why-choose/aesthetic-care.jpg",
		date: "15 Dec2025",
		author: {
			name: "Dr / Mohamed",
			avatar: "/images/blog-author.jpg",
		},
		link: "/articles/4",
	},
	{
		id: "5",
		title: "Informed Choices Begin With Knowledge.",
		description:
			"Explore expert insights, treatment guides, and helpful advice to make more confident decisions about your aesthetic care ....",
		image: "/images/why-choose/aesthetic-care.jpg",
		date: "15 Dec2025",
		author: {
			name: "Dr / Mohamed",
			avatar: "/images/blog-author.jpg",
		},
		link: "/articles/5",
	},
];

export interface BlogsSectionProps {
	posts?: BlogPost[];
}

export function BlogsSection({ posts = DEFAULT_POSTS }: BlogsSectionProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) return;

		const updatePagination = () => {
			setCount(api.scrollSnapList().length);
			setCurrent(api.selectedScrollSnap());
		};

		api.on("select", updatePagination);
		api.on("reInit", updatePagination);

		queueMicrotask(updatePagination);

		return () => {
			api.off("select", updatePagination);
			api.off("reInit", updatePagination);
		};
	}, [api]);

	return (
		<section id="blogs">
			<SectionHeader
				subTitle="BLOGS"
				title="Informed Choices Begin with Knowledge."
			/>

			<Carousel
				setApi={setApi}
				opts={{
					align: "start",
					loop: false,
				}}
				className="w-full"
			>
				<CarouselContent className="-ms-1">
					{posts.map((post) => (
						<CarouselItem
							key={post.id}
							className=" basis-full md:basis-1/2 lg:basis-1/3"
						>
							<article className="group h-full flex flex-col justify-between rounded-3xl bg-card p-4 sm:p-5 transition-all duration-300 border">
								{/* Card Top: Author Avatar, Name & Date */}
								<div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
									<div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
										<div className="relative size-10 sm:size-11 rounded-full overflow-hidden shrink-0 border border-border/50 bg-secondary">
											<Image
												src={post.author.avatar}
												alt={post.author.name}
												fill
												sizes="44px"
												className="object-cover"
											/>
										</div>
										<span className="font-semibold text-primary text-sm sm:text-base truncate">
											{post.author.name}
										</span>
									</div>
									<span className="text-muted-foreground small shrink-0">
										{post.date}
									</span>
								</div>

								{/* Card Image */}
								<div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden mb-3.5 sm:mb-4 bg-muted">
									<Image
										src={post.image}
										alt={post.title}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</div>

								{/* Card Body */}
								<div className="flex flex-col flex-1 justify-between gap-3">
									<h3 className="font-heading font-medium italic text-lg sm:text-xl text-primary leading-snug group-hover:text-secondary transition-colors">
										{post.title}
									</h3>

									<div className="flex items-end justify-between gap-3 pt-1">
										<p className="text-paragraph small leading-relaxed line-clamp-3 flex-1">
											{post.description}
										</p>

										<Link
											href={post.link || "#"}
											aria-label={`Read article: ${post.title}`}
											className="size-9 sm:size-10 rounded-full bg-purple-tint/77 text-primary flex items-center justify-center shrink-0 transition-all duration-300 hover:bg-primary hover:text-white backdrop-blur-md border border-border/20"
										>
											<ArrowUpRight className="size-4 transition-transform duration-300  " />
										</Link>
									</div>
								</div>
							</article>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{/* Carousel Indicators / Dots */}
			{count > 1 && (
				<div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
					{Array.from({ length: count }).map((_, index) => (
						<button
							key={index}
							type="button"
							onClick={() => api?.scrollTo(index)}
							aria-label={`Go to slide ${index + 1}`}
							className={cn(
								"transition-all duration-300 cursor-pointer",
								current === index
									? "w-9 h-2 rounded-full bg-secondary"
									: "w-7 h-2 rounded-full bg-secondary/10 hover:bg-secondary/40",
							)}
						/>
					))}
				</div>
			)}
		</section>
	);
}

export default BlogsSection;
