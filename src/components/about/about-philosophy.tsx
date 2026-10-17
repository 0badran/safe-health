"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/shared/section-badge";
import { HeadingDivider } from "@/components/icons";
import { cn } from "@/lib/utils";

export function AboutPhilosophy() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect(); // Trigger once smoothly
				}
			},
			{ threshold: 0.25 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<section className="py-16 sm:py-20 lg:py-28">
			<div className="container max-w-7xl">
				{/* Top Grid: Title, Badge, Decoration & Descriptions */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-10 lg:mb-14">
					{/* Left: Badge, Heading, and Dashed Decoration */}
					<div className="lg:col-span-5 flex flex-col items-start gap-4">
						<SectionBadge>OUR GUIDING PHILOSOPHY</SectionBadge>

						<h2 className="text-heading leading-tight">
							Beauty Is Personal.
							<br />
							So Is Our Approach.
						</h2>

						<HeadingDivider className="mt-1" />
					</div>

					{/* Right: Paragraphs */}
					<div className="lg:col-span-7 flex flex-col gap-4 pt-1 sm:pt-2">
						<p className="text-paragraph h5 font-normal leading-relaxed">
							We believe every patient deserves an approach shaped around their
							individual needs, aesthetic goals, and personal preferences. Our
							philosophy brings together medical expertise, thoughtful planning,
							and a commitment to natural-looking results.
						</p>

						<p className="text-paragraph small leading-relaxed">
							Rather than standardizing aesthetics through rigid templates,
							SafeHealthMe operates as an intimate sanctuary where surgical
							mastery, diagnostic precision, and biological longevity converge
							into lasting harmony.
						</p>
					</div>
				</div>

				{/* Bottom: Wide Clinic Interior Photo with Gradient Overlay */}
				<div
					ref={containerRef}
					className="relative rounded-4xl w-full aspect-3/1 overflow-hidden select-none group"
				>
					{/* Clinic Photo */}
					<Image
						src="/images/about/clinic-philosophy.png"
						alt="Safehealthme Clinic Interior"
						fill
						priority
						sizes="(max-width: 1024px) 100vw, 1280px"
						className="object-cover object-center"
					/>

					{/* Gradient Layer: linear-gradient(0deg, #FFFFFF -0.3%, rgba(48, 32, 92, 0.1) 59.64%) */}
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
						<span className="font-heading text-[clamp(28px,5.5vw,93.5px)] tracking-tight text-background">
							Safehealthme Clinic
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
