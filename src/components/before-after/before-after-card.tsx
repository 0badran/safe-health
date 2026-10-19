"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowUpRight, ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionBadge from "../shared/section-badge";

export interface BeforeAfterCase {
	id: string;
	title: string;
	category: string;
	timeframe: string;
	description: string;
	country: string;
	beforeImage: string;
	afterImage: string;
	href?: string;
}

export interface BeforeAfterCardProps {
	caseItem: BeforeAfterCase;
	className?: string;
}

export function BeforeAfterCard({ caseItem, className }: BeforeAfterCardProps) {
	// Slider position percentage (0 to 100, default 50%)
	const [sliderPosition, setSliderPosition] = React.useState(50);
	const [isDragging, setIsDragging] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement>(null);

	const handleMove = React.useCallback((clientX: number) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = clientX - rect.left;
		const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
		setSliderPosition(percentage);
	}, []);

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging) return;
		handleMove(e.touches[0].clientX);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) return;
		handleMove(e.clientX);
	};

	return (
		<article
			className={cn(
				"bg-card rounded-3xl sm:rounded-4xl p-3.5 sm:p-4 global-shadow border border-border/40 flex flex-col gap-4 sm:gap-5 transition-all hover:shadow-lg",
				className,
			)}
		>
			{/* Top Image Comparison Area */}
			<div
				ref={containerRef}
				onMouseDown={() => setIsDragging(true)}
				onMouseUp={() => setIsDragging(false)}
				onMouseLeave={() => setIsDragging(false)}
				onMouseMove={handleMouseMove}
				onTouchStart={() => setIsDragging(true)}
				onTouchEnd={() => setIsDragging(false)}
				onTouchMove={handleTouchMove}
				className="relative w-full aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden select-none cursor-ew-resize bg-muted"
			>
				{/* AFTER Image (Full background) */}
				<Image
					src={caseItem.afterImage}
					alt={`${caseItem.title} - After`}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover object-center pointer-events-none"
				/>

				{/* BEFORE Image (Clipped from left to sliderPosition) */}
				<div
					className="absolute inset-0 overflow-hidden pointer-events-none"
					style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
				>
					<Image
						src={caseItem.beforeImage}
						alt={`${caseItem.title} - Before`}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover object-center pointer-events-none"
					/>
				</div>

				{/* Badges on Top */}
				<div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
					<span className="rounded-full bg-primary/70 text-primary-foreground small font-bold tracking-wider px-3 py-1 uppercase shadow-sm select-none">
						BEFORE
					</span>
					<span className="rounded-full bg-purple-tint/90 text-primary small font-bold tracking-wider px-3 py-1 uppercase border border-border/50 shadow-sm select-none">
						AFTER
					</span>
				</div>

				{/* Dividing Vertical Line + Circular Handle */}
				<div
					className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center -translate-x-1/2"
					style={{ left: `${sliderPosition}%` }}
				>
					{/* Vertical Line */}
					<div className="w-0.5 h-full bg-white/90 shadow-sm" />

					{/* Center Round Handle Button */}
					<div className="absolute size-8 sm:size-9 rounded-full bg-primary text-white flex items-center justify-center shadow-md border-2 border-white pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-105 transition-transform">
						<ChevronsLeftRight className="size-4" />
					</div>
				</div>
			</div>

			{/* Middle Content Area */}
			<div className="flex flex-col gap-2.5 sm:gap-3 px-1">
				{/* Category Pill + Timeframe */}
				<div className="flex items-center justify-between gap-2">
					<SectionBadge withoutIcon className="small font-bold text-primary">
						{caseItem.category}
					</SectionBadge>

					<div className="flex items-center gap-1.5 text-paragraph small font-medium">
						<Clock className="size-3.5 shrink-0" />
						<span>{caseItem.timeframe}</span>
					</div>
				</div>

				{/* Case Title */}
				<h3 className="font-heading font-medium h4 text-primary leading-tight">
					{caseItem.title}
				</h3>

				{/* Description */}
				<p className="text-paragraph small leading-relaxed line-clamp-2">
					{caseItem.description}
				</p>
			</div>

			{/* Bottom Action Footer Bar */}
			<div className="mt-auto pt-1">
				<div className="rounded-full bg-wallpaper px-4 py-2 flex items-center justify-between">
					{/* Country with Location Pin */}
					<div className="flex items-center gap-1.5 text-primary small font-semibold">
						<MapPin className="size-6 stroke-2 text-secondary shrink-0" />
						<span>{caseItem.country}</span>
					</div>

					{/* Read More Link */}
					<Link
						href={caseItem.href ?? "#"}
						className="inline-flex items-center gap-1 text-primary font-bold hover:opacity-80 transition-opacity"
					>
						<span>Read more</span>
						<ArrowUpRight className="size-4 shrink-0" />
					</Link>
				</div>
			</div>
		</article>
	);
}

export default BeforeAfterCard;
