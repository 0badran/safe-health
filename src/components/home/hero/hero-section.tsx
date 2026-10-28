"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import InteractiveGridBackground from "@/components/shared/interactive-grid-background";
import { HeroConsultationPreview } from "./form";
import { HeroCtaButtons } from "./hero-cta-buttons";
import { HeroVideoCard } from "./hero-video-card";
import type { HeroSectionProps } from "./types";

export function HeroSection({ data, onSubmit, className }: HeroSectionProps) {
	const description = data?.description;
	const bgImage = data?.background_image || "/images/hero.jpg";
	const videoUrl = data?.hero_video || undefined;

	return (
		<section
			className={cn("relative w-full lg:h-screen text-background", className)}
		>
			{/* Background Image & Texture Overlay */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute  bg-primary inset-0 z-0 select-none overflow-hidden"
				style={{
					maskImage: `url(${"/images/hero-bg.png"})`,
					WebkitMaskImage: `url(${"/images/hero-bg.png"})`,
					maskSize: "cover",
					background: "oklch(0.343 0.135 288)",
					WebkitMaskSize: "cover",
					maskPosition: "top center",
					WebkitMaskPosition: "top center",
					maskRepeat: "no-repeat",
					WebkitMaskRepeat: "no-repeat",
				}}
			>
				<div className="absolute inset-x-0  top-0 w-full h-30 bg-linear-to-b from-primary via-primary to-transparent"></div>
				<Image
					src={bgImage}
					alt=""
					fill
					priority
					className="object-cover object-top mix-blend-screen opacity-10"
					sizes="100vw"
				/>
			</div>

			{/* Interactive Grid Layer - placed above hero-bg.png and below Main Content, masked to hero-bg.png */}
			<InteractiveGridBackground maskImage="/images/hero-bg.png" />

			{/* Main Content Container */}
			<div className="relative z-10 container pt-20 md:pt-28 pb-0 pointer-events-none">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
					{/* Left Column: Tagline, Video Preview, CTA Buttons & Bottom Stats Banner */}
					<div className="lg:col-span-7 flex max-lg:items-center flex-col justify-between min-h-full">
						<div className="space-y-4">
							{/* Tagline */}
							<h1 className="text-white/60 h4 max-lg:text-center font-normal leading-relaxed max-w-xl font-sans tracking-wide">
								{description}
							</h1>

							{/* Video Card Preview */}
							<div className="pointer-events-auto ">
								<HeroVideoCard videoSrc={videoUrl} />
							</div>

							{/* CTA Action Buttons */}
							<div className="pointer-events-auto">
								<HeroCtaButtons />
							</div>
						</div>

						{/* White Stats & Journey Banner aligned at bottom */}
					</div>

					{/* Right Column: Consultation Form Preview Card */}
					<div className="lg:col-span-5 flex justify-center lg:justify-end pb-8 lg:pb-12 relative pointer-events-auto">
						<div
							id="consultation"
							className="w-full lg:absolute max-w-137.5 mx-auto bg-white rounded-2xl overflow-hidden lg:shadow-[0_8px_30px_rgba(57,37,121,0.16)] border border-primary/10 inset-s-0"
						>
							<HeroConsultationPreview />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;

// Re-export subcomponents and form module
export * from "./form";
export { HeroCtaButtons } from "./hero-cta-buttons";
export { HeroStatsBanner } from "./hero-stats-banner";
export { HeroVideoCard } from "./hero-video-card";
export * from "./types";
