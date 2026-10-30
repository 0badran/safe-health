"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import InteractiveGridBackground from "@/components/shared/interactive-grid-background";
import { HeroConsultationPreview } from "./form";
import { HeroCtaButtons } from "./hero-cta-buttons";
import { HeroVideoCard } from "./hero-video-card";
import type { HeroSectionProps } from "./types";
import HeroStatsBanner from "./hero-stats-banner";

// Instant inline SVG mask anchored to the bottom-left cutout (1024x507) so the cutout pocket always stays at the bottom-left regardless of viewport height
const HERO_MASK_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 507" preserveAspectRatio="none"><path d="M0 0H1024V507H592C580 507 570 502 560 493L492 434C482 426 472 423 458 423H0V0Z" fill="black"/></svg>',
)}`;

export function HeroSection({ data, className }: HeroSectionProps) {
	const description = data?.description;
	const bgImage = data?.background_image || "/images/hero.jpg";
	const videoUrl = data?.hero_video || undefined;
	const title = data?.headline;

	return (
		<section
			className={cn(
				"relative w-full lg:min-h-175 text-background",
				className,
			)}
		>
			{/* Instant Primary Masked Background & Texture Overlay */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute bg-primary inset-0 z-0 select-none overflow-hidden"
				style={{
					maskImage: `url("${HERO_MASK_SVG}")`,
					WebkitMaskImage: `url("${HERO_MASK_SVG}")`,
					maskSize: "100% 100%",
					WebkitMaskSize: "100% 100%",
					maskPosition: "bottom center",
					WebkitMaskPosition: "bottom center",
					maskRepeat: "no-repeat",
					WebkitMaskRepeat: "no-repeat",
				}}
			>
				<div className="absolute inset-x-0 top-0 w-full h-30 bg-linear-to-b from-primary via-primary to-transparent z-10" />
				<Image
					src={bgImage}
					alt=""
					fill
					preload
					className="object-cover object-top mix-blend-screen opacity-10"
					sizes="100vw"
				/>
			</div>

			{/* Interactive Grid Layer - masked with the same instant SVG mask */}
			<InteractiveGridBackground
				maskImage={HERO_MASK_SVG}
				style={{
					maskSize: "100% 100%",
					WebkitMaskSize: "100% 100%",
					maskPosition: "bottom center",
					WebkitMaskPosition: "bottom center",
				}}
			/>

			{/* Main Content Container */}
			<div className="relative z-10 container pt-20 md:pt-28 pb-8 lg:pb-36 pointer-events-none">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
					{/* Left Column: Tagline, Video Preview, CTA Buttons */}
					<div className="lg:col-span-7 flex  max-lg:items-center flex-col justify-between min-h-full">
						<div className="space-y-4">
							{/* Heading on Mobile/Tablet */}
							<div className="relative inline-block lg:hidden text-center w-full lg:w-auto">
								<h2 className="relative w-fit mx-auto leading-[1.12] tracking-tight">
									{title ? (
										title.includes(",") ? (
											<>
												<span className="block h1 font-heading text-secondary!">
													{title.split(",")[0]},
												</span>
												<span className="block h1 font-heading text-secondary!">
													{title.split(",").slice(1).join(",").trim()}
												</span>
											</>
										) : (
											<span className="block h1 font-heading text-secondary!">
												{title}
											</span>
										)
									) : null}
								</h2>
							</div>

							{/* Tagline */}
							<h1 className="text-white/60 h4 max-lg:text-center font-normal leading-relaxed max-w-xl font-sans tracking-wide">
								{description}
							</h1>

							{/* Video Card Preview */}
							<div className="pointer-events-auto">
								<HeroVideoCard videoSrc={videoUrl} />
							</div>

							{/* CTA Action Buttons */}
							<div className="pointer-events-auto">
								<HeroCtaButtons />
							</div>
						</div>
					</div>

					{/* Right Column: Consultation Form Card */}
					<div className="lg:col-span-5 flex justify-center lg:justify-end pb-4 lg:pb-0 relative pointer-events-auto">
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
