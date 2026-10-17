"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";
import {
	TimelineDot,
	ApproachGuidanceIcon,
	ApproachPlanningIcon,
	ApproachCoordinationIcon,
	PersonalizedCareIcon,
} from "@/components/icons";

interface TimelineStep {
	stepNumber: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	isLeftFirst: boolean;
}

const STEPS: TimelineStep[] = [
	{
		stepNumber: "01",
		title: "Personalized Guidance",
		description:
			"Understanding your anatomical baseline, emotional goals, and procedural history through discreet virtual or in-person diagnostic dialogue.",
		icon: ApproachGuidanceIcon,
		isLeftFirst: true,
	},
	{
		stepNumber: "02",
		title: "Thoughtful Treatment Planning",
		description:
			"Developing an architectural blueprint bespoke to your structural nuances, ensuring subtle harmony rather than artificial exaggeration.",
		icon: ApproachPlanningIcon,
		isLeftFirst: false,
	},
	{
		stepNumber: "03",
		title: "Coordinated Patient Care",
		description:
			"Organizing your treatment journey with uncompromising attention to logistics: private transfers, recovery penthouse, and private nursing.",
		icon: ApproachCoordinationIcon,
		isLeftFirst: true,
	},
	{
		stepNumber: "04",
		title: "Informed Decisions",
		description:
			"Providing long-term regenerative guidance, micro-nutritional support, and continuous clinical observation long after your return home.",
		icon: PersonalizedCareIcon,
		isLeftFirst: false,
	},
];

function StepBadge({ number }: { number: string }) {
	return (
		<span className="inline-flex items-center gap-1.5 rounded-full bg-wallpaper px-3.5 py-2 font-heading text-primary small tracking-wider select-none uppercase">
			<span>STEP _ {number}</span>
			<ArrowDownIcon className="size-3 text-primary/70 shrink-0" />
		</span>
	);
}

export function AboutApproach() {
	const containerRef = useRef<HTMLDivElement>(null);
	const firstDotRef = useRef<HTMLDivElement>(null);
	const lastDotRef = useRef<HTMLDivElement>(null);
	const [lineGeometry, setLineGeometry] = useState<{
		top: number;
		height: number;
	} | null>(null);

	useEffect(() => {
		const updateLine = () => {
			if (!containerRef.current || !firstDotRef.current || !lastDotRef.current)
				return;

			const containerRect = containerRef.current.getBoundingClientRect();
			const firstDotRect = firstDotRef.current.getBoundingClientRect();
			const lastDotRect = lastDotRef.current.getBoundingClientRect();

			// Center of first dot relative to container
			const top =
				firstDotRect.top - containerRect.top + firstDotRect.height / 2;
			// Center of last dot relative to container
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

	return (
		<section className="py-20 sm:py-24 lg:py-32 bg-background">
			<div className="container max-w-7xl">
				{/* Top Section Header */}
				<div className="flex flex-col items-center justify-center text-center gap-4 mb-16 sm:mb-20">
					<SectionBadge>CARE DESIGNED AROUND YOU.</SectionBadge>

					<h2 className="text-heading uppercase">OUR APPROACH TO CARE</h2>
				</div>

				{/* Timeline Container */}
				<div ref={containerRef} className="relative max-w-5xl mx-auto">
					{/* Central Vertical Dashed Line (SVG) - Precisely connects first dot to last dot */}
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
								stroke="#159BA8"
								strokeOpacity="0.5"
								strokeWidth="1.5"
								strokeDasharray="4 4"
							/>
						</svg>
					)}

					{/* Desktop Alternating Steps (md+) */}
					<div className="hidden md:flex flex-col space-y-16 lg:space-y-24">
						{STEPS.map((step, index) => {
							const IconComponent = step.icon;
							const isFirst = index === 0;
							const isLast = index === STEPS.length - 1;

							return (
								<div
									key={step.stepNumber}
									className="grid grid-cols-[1fr_auto_1fr] items-start gap-6 lg:gap-12"
								>
									{/* Left Column */}
									{step.isLeftFirst ? (
										<div className="flex flex-col items-end text-end space-y-3 max-w-md ml-auto">
											<StepBadge number={step.stepNumber} />
											<p className="text-paragraph text-sm sm:text-base leading-relaxed">
												{step.description}
											</p>
										</div>
									) : (
										<div className="flex flex-col items-end text-end space-y-2 max-w-md ml-auto">
											<IconComponent className="size-12 text-secondary" />
											<h3 className="font-heading text-2xl sm:text-3xl text-primary font-normal">
												{step.title}
											</h3>
										</div>
									)}

									{/* Center Column: Glowing Pulsing Dot */}
									<div
										ref={
											isFirst ? firstDotRef : isLast ? lastDotRef : undefined
										}
										className="relative z-10 flex justify-center"
									>
										<TimelineDot />
									</div>

									{/* Right Column */}
									{step.isLeftFirst ? (
										<div className="flex flex-col items-start text-start space-y-2 max-w-md mr-auto">
											<IconComponent className="size-12 text-secondary" />
											<h3 className="font-heading text-2xl sm:text-3xl text-primary font-normal">
												{step.title}
											</h3>
										</div>
									) : (
										<div className="flex flex-col items-start text-start space-y-3 max-w-md mr-auto">
											<StepBadge number={step.stepNumber} />
											<p className="text-paragraph text-sm sm:text-base leading-relaxed">
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
						{STEPS.map((step, index) => {
							const IconComponent = step.icon;
							const isLast = index === STEPS.length - 1;

							return (
								<div key={step.stepNumber} className="flex gap-4">
									{/* Dot + Connecting Line Column */}
									<div className="flex flex-col items-center">
										<TimelineDot />
										{!isLast && (
											<div className="w-0.5 flex-1 border-r border-dashed border-secondary/40 my-2" />
										)}
									</div>

									{/* Content Column */}
									<div className="space-y-3 pb-4 flex-1">
										<StepBadge number={step.stepNumber} />

										<div className="flex items-center gap-3">
											<IconComponent className="size-10 text-secondary shrink-0" />
											<h3 className="font-heading text-xl text-primary font-normal">
												{step.title}
											</h3>
										</div>

										<p className="text-paragraph text-sm leading-relaxed">
											{step.description}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default AboutApproach;
