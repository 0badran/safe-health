"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import { InteractiveGridBackground } from "@/components/shared/interactive-grid-background";
import { ConsultationForm } from "./form";
import { HeroCtaButtons } from "./hero-cta-buttons";
import { HeroVideoCard } from "./hero-video-card";
import type { HeroSectionProps } from "./types";

export function HeroSection({ onSubmit, className }: HeroSectionProps) {
	return (
		<section
			className={cn(
				"relative w-full lg:h-screen text-white lg:mb-44",
				className,
			)}
		>
			{/* Background Image & Texture Overlay */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
			>
				{/* Underlying hero background asset */}
				<Image
					src="/images/hero-bg.png"
					alt=""
					fill
					priority
					className="object-cover object-top mix-blend-screen"
					sizes="100vw"
				/>
			</div>

			{/* Interactive Grid Layer - placed above hero-bg.png and below Main Content, masked to hero-bg.png */}
			<InteractiveGridBackground maskImage="/images/hero-bg.png" />

			{/* Main Content Container */}
			<div className="relative z-10 container pt-28 pb-0 pointer-events-none">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
					{/* Left Column: Tagline, Video Preview, CTA Buttons & Bottom Stats Banner */}
					<div className="lg:col-span-7 flex max-lg:items-center flex-col justify-between min-h-full">
						<div className="space-y-4">
							{/* Tagline */}
							<h1 className="text-white/60 h4 max-lg:text-center font-normal leading-relaxed max-w-xl font-sans tracking-wide">
								Where advanced aesthetic care meets a personalized approach to
								beauty, confidence, and well-being.
							</h1>

							{/* Video Card Preview */}
							<div className="pointer-events-axuto ">
								<HeroVideoCard />
							</div>

							{/* CTA Action Buttons */}
							<div className="pointer-events-auto">
								<HeroCtaButtons />
							</div>
						</div>

						{/* White Stats & Journey Banner aligned at bottom */}
					</div>

					{/* Right Column: Consultation Form Card */}
					<div className="lg:col-span-5 flex justify-center lg:justify-end pb-8 lg:pb-12 relative pointer-events-auto">
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
export * from "./form";
export { HeroCtaButtons } from "./hero-cta-buttons";
export { HeroStatsBanner } from "./hero-stats-banner";
export { HeroVideoCard } from "./hero-video-card";
export * from "./types";
