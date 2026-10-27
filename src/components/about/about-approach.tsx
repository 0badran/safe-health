"use client";

import { TimelineDot } from "@/components/icons";
import { SectionBadge } from "@/components/shared/section-badge";
import type { ApproachToCareSection } from "@/types/about";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function StepBadge({ number }: { number: string }) {
	return (
		<SectionBadge withoutIcon className="font-normal text-primary">
			<span>STEP _ {number}</span>
			<ArrowDownIcon className="size-3 text-primary/70 shrink-0" />
		</SectionBadge>
	);
}

function renderStepIcon(
	icon: string | null | undefined,
	className = "size-12",
) {
	if (icon && typeof icon === "string" && icon.trim().length > 0) {
		return (
			<div className={`relative ${className} shrink-0`}>
				<Image
					src={icon}
					alt=""
					fill
					sizes="48px"
					className="object-contain"
				/>
			</div>
		);
	}
	return null;
}

export interface AboutApproachProps {
	data?: ApproachToCareSection;
}

export function AboutApproach({ data }: AboutApproachProps = {}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const firstDotRef = useRef<HTMLDivElement>(null);
	const lastDotRef = useRef<HTMLDivElement>(null);
	const [lineGeometry, setLineGeometry] = useState<{
		top: number;
		height: number;
	} | null>(null);

	const steps = data?.step_card ?? [];

	useEffect(() => {
		const updateLine = () => {
			if (!containerRef.current || !firstDotRef.current || !lastDotRef.current)
				return;

			const containerRect = containerRef.current.getBoundingClientRect();
			const firstDotRect = firstDotRef.current.getBoundingClientRect();
			const lastDotRect = lastDotRef.current.getBoundingClientRect();

			const top =
				firstDotRect.top - containerRect.top + firstDotRect.height / 2;
			const bottom =
				lastDotRect.top - containerRect.top + lastDotRect.height / 2;

			setLineGeometry({
				top,
				height: Math.max(0, bottom - top + 130),
			});
		};

		updateLine();

		const resizeObserver = new ResizeObserver(() => {
			updateLine();
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		window.addEventListener("resize", updateLine);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", updateLine);
		};
	}, []);

	if (!data || steps.length === 0) return null;

	return (
		<section className="container">
			{/* Top Section Header */}
			<div className="flex flex-col items-center justify-center text-center gap-4 mb-16">
				{data.tag_text && <SectionBadge>{data.tag_text}</SectionBadge>}

				{data.headline && (
					<h2 className="text-heading uppercase">{data.headline}</h2>
				)}
			</div>

			{/* Timeline Container */}
			<div ref={containerRef} className="relative max-w-5xl mx-auto">
				{/* Central Vertical Dashed Line (SVG) */}
				{lineGeometry && (
					<svg
						className="absolute left-1/2 -translate-x-1/2 w-0.5 pointer-events-none hidden md:block"
						style={{
							top: `${lineGeometry.top}px`,
							height: `${lineGeometry.height}px`,
						}}
						aria-hidden="true"
					>
						<line
							x1="1"
							y1="0"
							x2="1"
							y2="100%"
							stroke="var(--secondary)"
							strokeOpacity="0.5"
							strokeWidth="1.5"
							strokeDasharray="4 4"
						/>
					</svg>
				)}

				{/* Desktop Alternating Steps (md+) */}
				<div className="hidden md:flex flex-col space-y-16 lg:space-y-24">
					{steps.map((step, index) => {
						const isFirst = index === 0;
						const isLast = index === steps.length - 1;
						const isLeftFirst = index % 2 === 0;

						return (
							<div
								key={step.step_number || index}
								className="grid grid-cols-[1fr_auto_1fr] items-start gap-6 lg:gap-12"
							>
								{/* Left Column */}
								{isLeftFirst ? (
									<div className="flex flex-col items-end text-end space-y-3 max-w-md ml-auto">
										<StepBadge number={step.step_number} />
										<p className="text-paragraph small sm:text-base leading-relaxed">
											{step.description}
										</p>
									</div>
								) : (
									<div className="flex flex-col items-end text-end space-y-2 max-w-md ml-auto">
										{renderStepIcon(step.icon, "size-12")}
										<h3 className="font-heading h4 sm:h3 text-primary font-normal">
											{step.title}
										</h3>
									</div>
								)}

								{/* Center Column: Glowing Pulsing Dot */}
								<div
									ref={isFirst ? firstDotRef : isLast ? lastDotRef : undefined}
									className="relative z-10 flex justify-center"
								>
									<TimelineDot />
								</div>

								{/* Right Column */}
								{isLeftFirst ? (
									<div className="flex flex-col items-start text-start space-y-2 max-w-md mr-auto">
										{renderStepIcon(step.icon, "size-12")}
										<h3 className="font-heading h4 sm:h3 text-primary font-normal">
											{step.title}
										</h3>
									</div>
								) : (
									<div className="flex flex-col items-start text-start space-y-3 max-w-md mr-auto">
										<StepBadge number={step.step_number} />
										<p className="text-paragraph small sm:text-base leading-relaxed">
											{step.description}
										</p>
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Mobile Sequential Timeline (< md) */}
				<div className="flex flex-col md:hidden space-y-8">
					{steps.map((step, index) => {
						return (
							<div key={step.step_number || index} className="flex gap-4">
								{/* Dot + Connecting Line Column */}
								<div className="flex flex-col items-center">
									<TimelineDot />
									<div className="w-0.5 flex-1 border-r border-dashed border-secondary/40 my-2" />
								</div>

								{/* Content Column */}
								<div className="space-y-3 pb-4 flex-1">
									<StepBadge number={step.step_number} />

									<div className="flex items-center gap-3">
										{renderStepIcon(step.icon, "size-10")}
										<h3 className="font-heading h5 text-primary font-normal">
											{step.title}
										</h3>
									</div>

									<p className="text-paragraph small leading-relaxed">
										{step.description}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default AboutApproach;
