"use client";

import { FallbackImage } from "@/components/shared/fallback-image";
import SectionBadge from "@/components/shared/section-badge";
import { Link } from "@/i18n/navigation";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import type { CaseItem } from "@/types/before-after";
import { ChevronsLeftRight } from "lucide-react";
import * as React from "react";

export interface BeforeAfterCardProps {
	caseItem: CaseItem;
	className?: string;
}

export function BeforeAfterCard({ caseItem, className }: BeforeAfterCardProps) {
	const { t } = useTranslation();
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
				"bg-card rounded-3xl sm:rounded-4xl p-3.5 sm:p-4 border border-border/60 flex flex-col gap-4 sm:gap-5 shadow-2xs hover:shadow-xs transition-shadow",
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
				<FallbackImage
					src={caseItem.image_after_url}
					alt={`${caseItem.title} - ${t("beforeAfter.after")}`}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover object-center pointer-events-none"
				/>

				{/* BEFORE Image (Clipped from left to sliderPosition) */}
				<div
					className="absolute inset-0 overflow-hidden pointer-events-none"
					style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
				>
					<FallbackImage
						src={caseItem.image_before_url}
						alt={`${caseItem.title} - ${t("beforeAfter.before")}`}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover object-center pointer-events-none"
					/>
				</div>

				{/* Badges on Top */}
				<div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
					<span className="rounded-full bg-primary/80 backdrop-blur-xs text-primary-foreground small font-bold tracking-wider px-3 py-1 uppercase shadow-xs select-none">
						{t("beforeAfter.before")}
					</span>
					<span className="rounded-full bg-card/90 backdrop-blur-xs text-primary small font-bold tracking-wider px-3 py-1 uppercase border border-border/50 shadow-xs select-none">
						{t("beforeAfter.after")}
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
					<div className="absolute size-8 sm:size-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md border-2 border-white pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-105 transition-transform">
						<ChevronsLeftRight className="size-4" />
					</div>
				</div>
			</div>

			{/* Middle Content Area */}
			<div className="flex flex-col gap-2.5 sm:gap-3 px-1">
				{/* Category Pill */}
				<div className="flex items-center justify-between gap-2">
					<SectionBadge withoutIcon className="small font-bold text-primary">
						{caseItem.treatment}
					</SectionBadge>
				</div>

				{/* Case Title */}
				<Link href={`/before-after/${caseItem.slug}`} className="group/title">
					<h3 className="font-heading font-medium h5 text-foreground leading-tight line-clamp-2 group-hover/title:text-primary transition-colors">
						{caseItem.title}
					</h3>
				</Link>

				{/* Description */}
				{caseItem.description_preview && (
					<p className="text-muted-foreground small leading-relaxed line-clamp-2">
						{caseItem.description_preview}
					</p>
				)}
			</div>
		</article>
	);
}

export default BeforeAfterCard;
