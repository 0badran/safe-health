"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FallbackImage } from "@/components/shared/fallback-image";
import { SectionBadge } from "@/components/shared/section-badge";
import { HeadingDivider } from "@/components/icons";
import type { GuidingPhilosophySection } from "@/types/about";
import useSettings from "@/hooks/use-settings";

export interface AboutPhilosophyProps {
	data?: GuidingPhilosophySection;
}

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function AboutPhilosophy({ data }: AboutPhilosophyProps = {}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { settings } = useSettings();

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 28,
		mass: 0.4,
	});

	const width = useTransform(smoothProgress, [0, 0.85], ["88vw", "100vw"]);
	const height = useTransform(smoothProgress, [0, 0.85], ["46vh", "100vh"]);
	const borderRadius = useTransform(smoothProgress, [0, 0.85], [32, 0]);
	const x = useTransform(smoothProgress, [0, 1], [-40, 220]);
	const scale = useTransform(smoothProgress, [0, 1], [0.85, 1.75]);

	if (!data) return null;

	return (
		<section>
			{/* Top Grid: Title, Badge, Decoration & Descriptions */}
			<div className=" grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-14 items-start mb-6 lg:mb-10">
				{/* Left: Badge, Heading, and Dashed Decoration */}
				<div className="lg:col-span-5 flex flex-col items-start gap-2 lg:gap-4">
					{data.tag_text && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.5, ease: EASE }}
						>
							<SectionBadge>{data.tag_text}</SectionBadge>
						</motion.div>
					)}

					{data.headline && (
						<motion.h2
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
							className="text-heading leading-tight whitespace-pre-line"
						>
							{data.headline}
						</motion.h2>
					)}

					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
					>
						<HeadingDivider />
					</motion.div>
				</div>

				{/* Right: Paragraphs */}
				<div className="lg:col-span-7 flex flex-col gap-4 pt-1 sm:pt-2">
					{data.description && (
						<motion.p
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
							className="text-paragraph h5 font-normal leading-relaxed"
						>
							{data.description}
						</motion.p>
					)}

					{data.secondary_description && (
						<motion.p
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
							className="text-paragraph small leading-relaxed"
						>
							{data.secondary_description}
						</motion.p>
					)}
				</div>
			</div>

			{/* Scroll Track for Pinning & Expanding Image to Full Screen */}
			<div
				ref={containerRef}
				className="relative h-[220vh] -mt-40 w-screen left-1/2 -translate-x-1/2 rtl:left-auto rtl:right-1/2 rtl:translate-x-1/2"
			>
				<div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
					<motion.div
						style={{ width, height, borderRadius }}
						className="relative overflow-hidden select-none group will-change-[width,height,border-radius]"
					>
						<FallbackImage
							src={data.section_image}
							fallbackSrc="/images/about/clinic-philosophy.png"
							alt={data.headline || "Safehealthme Clinic Interior"}
							fill
							preload
							sizes="100vw"
							className="object-cover object-center"
						/>

						{/* Gradient Layer */}
						<div
							className="absolute inset-0 bg-linear-to-t from-secondary from-[-10%] via-primary/10 via-60% to-transparent"
							aria-hidden="true"
						/>

						{/* Decorative Clinic Typography with On-Scroll Animation */}
						{settings?.brand_name && (
							<motion.div
								style={{ x, scale }}
								className="absolute w-full bottom-2 left-3 origin-bottom-left pointer-events-none will-change-transform"
							>
								<span className="font-heading text-[clamp(28px,5.5vw,93.5px)] tracking-tight text-background inline-block">
									{settings.brand_name}
								</span>
							</motion.div>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
