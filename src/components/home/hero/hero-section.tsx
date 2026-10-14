"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { HeroVideoCard } from "./hero-video-card";
import { HeroCtaButtons } from "./hero-cta-buttons";
import { HeroStatsBanner } from "./hero-stats-banner";
import { ConsultationForm } from "./form";
import type { HeroSectionProps } from "./types";

export function HeroSection({ onSubmit, className }: HeroSectionProps) {
	return (
		<section
			className={cn(
				"relative w-full lg:h-screen  text-white lg:mb-44",
				className,
			)}
		>
			{/* Background Image & Texture Overlay */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 inset-y-[70v] z-0 select-none overflow-hidden"
			>
				{/* Underlying hero background asset */}
				<Image
					src="/images/hero-bg.png"
					alt=""
					fill
					priority
					className="object-cover object-top  mix-blend-screen"
					sizes="100vw"
				/>

			</div>

			{/* Main Content Container */}
			<div className="relative z-10 container  pt-28  pb-0">
				<div className="grid grid-cols-1 lg:grid-cols-12  gap-4 items-start">
					{/* Left Column: Tagline, Video Preview, CTA Buttons & Bottom Stats Banner */}
					<div className="lg:col-span-7 flex max-lg:items-center flex-col justify-between min-h-full">
						<div className="space-y-4">
							{/* Tagline */}
							<h1 className="text-white/60 h4 max-lg:text-center font-normal leading-relaxed max-w-xl font-sans tracking-wide">
								Where advanced aesthetic care meets a personalized approach to beauty, confidence, and well-being.
							</h1>

							{/* Video Card Preview */}
							<HeroVideoCard />

							{/* CTA Action Buttons */}
							<HeroCtaButtons />
						</div>

						{/* White Stats & Journey Banner aligned at bottom */}
					
					</div>

					{/* Right Column: Consultation Form Card */}
					<div className="lg:col-span-5  flex justify-center lg:justify-end pb-8 lg:pb-12 relative">
						<div id="consultation" className="w-full lg:absolute inset-s-0">
							<ConsultationForm onSubmit={onSubmit} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;

// Re-export subcomponents and form module
export * from "./types";
export { HeroVideoCard } from "./hero-video-card";
export { HeroCtaButtons } from "./hero-cta-buttons";
export { HeroStatsBanner } from "./hero-stats-banner";
export * from "./form";
