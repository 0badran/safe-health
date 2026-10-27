"use client";

import React, { useEffect, useRef, useState } from "react";
import { FallbackImage } from "@/components/shared/fallback-image";
import { SectionBadge } from "@/components/shared/section-badge";
import { HeadingDivider } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { GuidingPhilosophySection } from "@/types/about";
import useSettings from "@/hooks/use-settings";

export interface AboutPhilosophyProps {
	data?: GuidingPhilosophySection;
}

export function AboutPhilosophy({ data }: AboutPhilosophyProps = {}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isInView, setIsInView] = useState(false);
	const { settings } = useSettings();

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.25 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	if (!data) return null;

	return (
		<section className="max-w-7xl">
			{/* Top Grid: Title, Badge, Decoration & Descriptions */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-10 lg:mb-14">
				{/* Left: Badge, Heading, and Dashed Decoration */}
				<div className="lg:col-span-5 flex flex-col items-start gap-4">
					{data.tag_text && <SectionBadge>{data.tag_text}</SectionBadge>}

					{data.headline && (
						<h2 className="text-heading leading-tight whitespace-pre-line">
							{data.headline}
						</h2>
					)}

					<HeadingDivider className="mt-1" />
				</div>

				{/* Right: Paragraphs */}
				<div className="lg:col-span-7 flex flex-col gap-4 pt-1 sm:pt-2">
					{data.description && (
						<p className="text-paragraph h5 font-normal leading-relaxed">
							{data.description}
						</p>
					)}

					{data.secondary_description && (
						<p className="text-paragraph small leading-relaxed">
							{data.secondary_description}
						</p>
					)}
				</div>
			</div>

			{/* Bottom: Wide Clinic Interior Photo with FallbackImage */}
			<div
				ref={containerRef}
				className="relative rounded-4xl w-full aspect-3/1 overflow-hidden select-none group"
			>
				<FallbackImage
					src={data.section_image}
					fallbackSrc="/images/about/clinic-philosophy.png"
					alt={data.headline || "Safehealthme Clinic Interior"}
					fill
					preload
					sizes="(max-width: 1024px) 100vw, 1280px"
					className="object-cover object-center"
				/>

				{/* Gradient Layer */}
				<div
					className="absolute inset-0 bg-linear-to-t from-background from-[-10%] via-primary/10 via-60% to-transparent"
					aria-hidden="true"
				/>

				{/* Decorative Clinic Typography with In-View Animation */}
				<div
					className={cn(
						"absolute w-full bottom-0 pointer-events-none transition-all duration-2000 ease-out",
						isInView
							? "translate-x-3 rtl:-translate-x-3 blur-none"
							: "-translate-x-1/2 rtl:translate-x-1/2 blur-xs",
					)}
				>
					{settings?.brand_name && (
						<span className="font-heading text-[clamp(28px,5.5vw,93.5px)] tracking-tight text-background">
							{settings.brand_name}
						</span>
					)}
				</div>
			</div>
		</section>
	);
}
