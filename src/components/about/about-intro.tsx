"use client";

import { FallbackImage } from "@/components/shared/fallback-image";
import type { AboutOverviewSection } from "@/types/about";
import { motion } from "framer-motion";

export interface AboutIntroProps {
	data?: AboutOverviewSection;
}

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function AboutIntro({ data }: AboutIntroProps = {}) {
	if (!data) return null;

	const stats = data.stat_card ?? [];

	return (
		<section>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-14 lg:items-center">
				{/* Left: Treatment Photo with FallbackImage */}
				<div className="md:col-span-6 space-y-2">
					{data.headline && (
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.55, ease: EASE }}
							className="text-heading block lg:hidden leading-tight whitespace-pre-line"
						>
							{data.headline}
						</motion.h2>
					)}
					<motion.div
						initial={{ opacity: 0, y: 28, scale: 0.97 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.65, ease: EASE }}
						className="relative aspect-4/3 w-full overflow-hidden lg:rounded-3xl border border-border/40"
					>
						<FallbackImage
							src={data.feature_image}
							fallbackSrc="/images/why-choose/aesthetic-care.jpg"
							alt={
								data.headline ||
								"Advanced aesthetic treatment at SafeHealthMe"
							}
							fill
							priority
							sizes="(max-width: 1024px) 100vw, 50vw"
							className="object-cover object-center transition-transform duration-700"
						/>
					</motion.div>
				</div>

				{/* Right: Content & Stats */}
				<div className="md:col-span-6 flex flex-col gap-y-4">
					{/* Two-line Gradient Heading */}
					{data.headline && (
						<motion.h2
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
							className="text-heading hidden lg:block leading-tight whitespace-pre-line"
						>
							{data.headline}
						</motion.h2>
					)}

					{/* Description Paragraph */}
					{data.description && (
						<motion.p
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
							className="text-paragraph h5 font-normal leading-relaxed max-w-xl"
						>
							{data.description}
						</motion.p>
					)}

					{/* Stats Columns */}
					{stats.length > 0 && (
						<div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 border-t">
							{stats.map((stat, idx) => (
								<motion.div
									key={stat.title || idx}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-40px" }}
									transition={{
										duration: 0.5,
										delay: 0.25 + idx * 0.14,
										ease: EASE,
									}}
									className="space-y-1.5"
								>
									<span className="block text-primary small font-medium tracking-wide uppercase">
										{stat.title}
									</span>
									<span className="block h5 font-bold">{stat.number}</span>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
