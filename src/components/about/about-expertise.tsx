"use client";

import { FallbackImage } from "@/components/shared/fallback-image";
import { ExpertiseBackground } from "@/components/about/expertise-background";
import type { OurExpertiseSection } from "@/types/about";
import { motion } from "framer-motion";

export interface AboutExpertiseProps {
	data?: OurExpertiseSection;
}

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function AboutExpertise({ data }: AboutExpertiseProps = {}) {
	if (!data) return null;

	const points = data.feature_card ?? [];

	return (
		<section className="relative w-full">
			<div className="hidden md:block">
				{/* Background: card shape + continent silhouettes */}
				<ExpertiseBackground />
			</div>

			{/* Section Content */}
			<div className="relative z-10 py-5 px-6 max-md:bg-wallpaper rounded-2xl">
				{/* Top Header Row: Title & Subtitle */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8 mb-5">
					<div className="lg:col-span-6">
						{data.headline && (
							<motion.h2
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-40px" }}
								transition={{ duration: 0.55, ease: EASE }}
								className="text-heading font-normal leading-tight whitespace-pre-line"
							>
								{data.headline}
							</motion.h2>
						)}
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
						className="absolute inset-e-4 top-0 hidden lg:block lg:col-span-6"
					>
						<p className="font-heading italic text-secondary/30 lg:translate-y-10 -rotate-7 font-semibold h4">
							Personalized Care, <br />
							Exceptional Results.
						</p>
					</motion.div>
				</div>

				{/* Main Grid: Doctor Team Photo + Feature Cards */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
					{/* Left: Specialists Team Image with FallbackImage */}
					<motion.div
						initial={{ opacity: 0, y: 28, scale: 0.97 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.65, ease: EASE }}
						className="lg:col-span-6 relative w-full min-h-80 sm:min-h-100 lg:min-h-120 rounded-3xl overflow-hidden"
					>
						<FallbackImage
							src={data.feature_image}
							fallbackSrc="/images/about/team-workspace.jpg"
							alt={data.headline || "Medical Specialists Care Team"}
							fill
							sizes="(max-width: 1024px) 100vw, 50vw"
							className="object-cover object-center size-full"
							priority
						/>
					</motion.div>

					{/* Right: Feature Cards Stack */}
					{points.length > 0 && (
						<div className="lg:col-span-6 flex flex-col justify-between gap-3 sm:gap-3.5">
							{points.map((point, index) => (
								<motion.div
									key={point.number || index}
									initial={{ opacity: 0, y: 24 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-40px" }}
									transition={{
										duration: 0.55,
										delay: index * 0.15,
										ease: EASE,
									}}
									className="bg-card rounded-2xl p-4 sm:p-5 border-border/40 flex items-start gap-4 sm:gap-5 transition-shadow duration-200 "
								>
									<span className="font-heading h3 text-primary shrink-0 leading-none">
										{point.number}
									</span>

									<div className="flex flex-col gap-2">
										<h3 className="font-heading tracking-tight">
											{point.title}
										</h3>
										<p className="text-paragraph small leading-relaxed">
											{point.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
