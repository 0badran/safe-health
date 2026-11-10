"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import type { HomePatientJourneySection } from "@/types/home";
import {
	motion,
	useScroll,
	useSpring,
	useTransform,
	type MotionValue,
} from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { ExpertiseBackground } from "../about/expertise-background";

const BLOB_A =
	"M361.9 3.07C430.64 13.59 480.98 67.09 533.02 113.21C579.79 154.66 624.19 197.95 647.27 256.02C671.55 317.11 689 385.97 665.87 447.51C643.12 508.02 580.29 539.39 527.01 576C475.29 611.52 424.63 655.3 361.9 656.33C298.72 657.38 246.99 613.98 192.79 581.51C132.47 545.37 61.3 519.37 29.02 456.9C-5.76 389.62 -7.38 308.37 14.09 235.73C35.92 161.85 83.95 97.16 147.99 54.32C210.46 12.53 287.6 -8.29 361.9 3.07Z";
const BLOB_B =
	"M124.46 0.17C156.86 -1.51 189.22 9.46 212.5 32.12C236.1 55.1 248.69 87.44 247.97 120.42C247.27 152.72 231.81 182.41 208.73 204.94C185.98 227.14 156.2 241.72 124.46 240.97C93.38 240.24 66.41 222.74 44.05 201.08C21.19 178.94 -0.2 152.29 0 120.42C0.2 88.69 22.27 62.79 45.05 40.77C67.3 19.28 93.62 1.76 124.46 0.17Z";

/* ---------- icons (24px grid, inherit colour from the parent) ---------- */
const icon = (children: ReactNode) =>
	function Icon() {
		return (
			<svg
				viewBox="0 0 24 24"
				className="size-7"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				{children}
			</svg>
		);
	};

const ChatIcon = icon(
	<>
		<path d="M20 11.5a7.5 7.5 0 0 1-11.4 6.4L4 19l1.1-3.6A7.5 7.5 0 1 1 20 11.5Z" />
		<path d="M9 10h6M9 13.5h3.5" />
	</>,
);
const DocIcon = icon(
	<>
		<path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
		<path d="M14 3v4h4M8.5 12h7M8.5 15.5h7M8.5 18.5h4" />
	</>,
);
const CalendarIcon = icon(
	<>
		<rect x="3" y="4.5" width="18" height="16.5" rx="3" />
		<path d="M8 2.5v4M16 2.5v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
	</>,
);
const HeartPlusIcon = icon(
	<>
		<path d="M12 20.5C7 16.8 3 13.4 3 9.2 3 6.5 5.1 4.5 7.6 4.5c1.7 0 3.2.9 4.4 2.5 1.2-1.6 2.7-2.5 4.4-2.5 2.5 0 4.6 2 4.6 4.7 0 .7-.1 1.3-.3 1.9" />
		<path d="M18 15v6M15 18h6" />
	</>,
);

/* ---------- step visual configuration ---------- */
const STEP_CONFIG = [
	{
		Icon: ChatIcon,
		offset: "lg:mt-10",
		defaultImg: "/images/steps/img1.png",
	},
	{
		Icon: DocIcon,
		offset: "lg:mt-20",
		defaultImg: "/images/steps/img2.png",
	},
	{
		Icon: CalendarIcon,
		offset: "lg:mt-0",
		defaultImg: "/images/steps/img3.png",
	},
	{
		Icon: HeartPlusIcon,
		offset: "lg:mt-12",
		defaultImg: "/images/steps/img4.png",
	},
];

function renderStepIcon(
	icon: string | null | undefined,
	FallbackIcon: React.ComponentType,
) {
	if (typeof icon === "string" && icon.trim().length > 0) {
		return (
			<div className="relative size-7 shrink-0">
				<Image src={icon} alt="" fill sizes="28px" className="object-contain" />
			</div>
		);
	}
	return <FallbackIcon />;
}

/* ---------- animated connecting lines between steps ---------- */
function StepConnector({
	stepIndex,
	totalSteps,
	progress,
}: {
	stepIndex: number;
	totalSteps: number;
	progress: MotionValue<number>;
}) {
	// Connectors finish drawing during the horizontal scroll phase (0 -> 0.74)
	const segmentCount = Math.max(totalSteps - 1, 1);
	const phaseEnd = 0.72;
	const segStart = Math.max(0, ((stepIndex - 1) / segmentCount) * phaseEnd - 0.04);
	const segEnd = Math.min(phaseEnd, (stepIndex / segmentCount) * phaseEnd);

	const pathLength = useTransform(progress, [segStart, segEnd], [0, 1]);
	const pathOpacity = useTransform(
		progress,
		[segStart, segStart + 0.05],
		[0, 1],
	);
	const dotScale = useTransform(
		progress,
		[segStart, segStart + 0.07],
		[0, 1.15],
	);

	if (stepIndex === 1) {
		return (
			<div className="pointer-events-none absolute left-[165px] top-[163px] z-20 hidden w-[calc(100%-60px)] overflow-visible sm:block rtl:scale-x-[-1] rtl:left-auto rtl:right-[165px]">
				{/* Small starting dot */}
				<motion.span
					style={{ scale: dotScale, opacity: pathOpacity }}
					className="absolute -left-1 -top-1 size-2.5 rounded-full bg-primary ring-4 ring-primary/20"
				/>
				{/* Connecting wave line ending with fade */}
				<svg
					viewBox="0 0 100 40"
					preserveAspectRatio="none"
					className="h-10 w-full overflow-visible"
					aria-hidden="true"
				>
					<defs>
						<linearGradient id="step-fade-1" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
							<stop
								offset="65%"
								stopColor="var(--secondary)"
								stopOpacity="0.65"
							/>
							<stop
								offset="100%"
								stopColor="var(--secondary)"
								stopOpacity="0.15"
							/>
						</linearGradient>
					</defs>
					{/* Faint background track */}
					<path
						d="M 0 0 C 35 5, 55 25, 75 32 C 88 36, 95 34, 100 32"
						fill="none"
						stroke="var(--primary)"
						strokeOpacity="0.14"
						strokeWidth="2"
						strokeDasharray="4 4"
						vectorEffect="non-scaling-stroke"
						strokeLinecap="round"
					/>
					{/* Animated drawing path */}
					<motion.path
						d="M 0 0 C 35 5, 55 25, 75 32 C 88 36, 95 34, 100 32"
						fill="none"
						stroke="url(#step-fade-1)"
						strokeWidth="3"
						vectorEffect="non-scaling-stroke"
						strokeLinecap="round"
						style={{ pathLength, opacity: pathOpacity }}
					/>
				</svg>
			</div>
		);
	}

	if (stepIndex === 2) {
		return (
			<div className="pointer-events-none absolute left-[165px] top-[55px] z-20 hidden h-[120px] w-[calc(100%-60px)] overflow-visible sm:block rtl:scale-x-[-1] rtl:left-auto rtl:right-[165px]">
				{/* Small starting dot */}
				<motion.span
					style={{ scale: dotScale, opacity: pathOpacity }}
					className="absolute -left-1 bottom-1 size-2.5 rounded-full bg-primary ring-4 ring-primary/20"
				/>
				{/* Connecting wave line surging up to step 3 ending with fade */}
				<svg
					viewBox="0 0 100 80"
					preserveAspectRatio="none"
					className="size-full overflow-visible"
					aria-hidden="true"
				>
					<defs>
						<linearGradient
							id="step-fade-2"
							x1="0%"
							y1="100%"
							x2="100%"
							y2="0%"
						>
							<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
							<stop
								offset="65%"
								stopColor="var(--secondary)"
								stopOpacity="0.65"
							/>
							<stop
								offset="100%"
								stopColor="var(--secondary)"
								stopOpacity="0.15"
							/>
						</linearGradient>
					</defs>
					<path
						d="M 0 70 C 25 72, 45 40, 70 18 C 82 7, 92 2, 100 0"
						fill="none"
						stroke="var(--primary)"
						strokeOpacity="0.14"
						strokeWidth="2"
						strokeDasharray="4 4"
						vectorEffect="non-scaling-stroke"
						strokeLinecap="round"
					/>
					<motion.path
						d="M 0 70 C 25 72, 45 40, 70 18 C 82 7, 92 2, 100 0"
						fill="none"
						stroke="url(#step-fade-2)"
						strokeWidth="3"
						vectorEffect="non-scaling-stroke"
						strokeLinecap="round"
						style={{ pathLength, opacity: pathOpacity }}
					/>
				</svg>
			</div>
		);
	}

	if (stepIndex === 3) {
		return (
			<div className="pointer-events-none absolute left-41.25 top-18.75 z-20 hidden w-[calc(100%-60px)] overflow-visible sm:block rtl:scale-x-[-1] rtl:left-auto rtl:right-41.25">
				{/* Small starting dot */}
				<motion.span
					style={{ scale: dotScale, opacity: pathOpacity }}
					className="absolute -left-1 -top-1 size-2.5 rounded-full bg-primary ring-4 ring-primary/20"
				/>
				{/* Connecting wave line diving gently to step 4 */}
				<svg
					viewBox="0 0 100 45"
					preserveAspectRatio="none"
					className="h-11 w-full overflow-visible"
					aria-hidden="true"
				>
					<defs>
						<linearGradient id="step-fade-3" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
							<stop
								offset="65%"
								stopColor="var(--secondary)"
								stopOpacity="0.65"
							/>
							<stop
								offset="100%"
								stopColor="var(--secondary)"
								stopOpacity="0.15"
							/>
						</linearGradient>
					</defs>
					<path
						d="M 0 0 C 30 8, 55 30, 80 38 C 90 42, 96 40, 100 38"
						fill="none"
						stroke="var(--primary)"
						strokeOpacity="0.14"
						strokeWidth="2"
						strokeDasharray="4 4"
						vectorEffect="non-scaling-stroke"
						strokeLinecap="round"
					/>
					<motion.path
						d="M 0 0 C 30 8, 55 30, 80 38 C 90 42, 96 40, 100 38"
						fill="none"
						stroke="url(#step-fade-3)"
						strokeWidth="3"
						vectorEffect="non-scaling-stroke"
						strokeLinecap="round"
						style={{ pathLength, opacity: pathOpacity }}
					/>
				</svg>
			</div>
		);
	}

	return null;
}

/* ---------- post-steps takeoff airplane animation ---------- */
function TravelTakeoffAnimation({
	progress,
	isRtl,
}: {
	progress: MotionValue<number>;
	isRtl: boolean;
}) {
	// Starts right after all cards have finished scrolling into view (0.72 -> 1.0)
	const trailLength = useTransform(progress, [0.72, 0.96], [0, 1]);
	const trailOpacity = useTransform(
		progress,
		[0.71, 0.77, 0.96, 1],
		[0, 1, 1, 0.85],
	);

	// Airplane emerges from underneath the cards, grows larger, and flies upward & across
	const planeOpacity = useTransform(
		progress,
		[0.72, 0.78, 0.96, 1],
		[0, 1, 1, 0.9],
	);
	const planeScale = useTransform(
		progress,
		[0.72, 0.82, 0.93, 1],
		[0.35, 1.15, 1.85, 2.35],
	);
	const planeY = useTransform(
		progress,
		[0.72, 0.82, 0.92, 1],
		[190, 45, -95, -230],
	);
	const planeX = useTransform(
		progress,
		[0.72, 0.82, 0.92, 1],
		isRtl ? [180, 40, -140, -340] : [-180, -40, 140, 340],
	);
	const planeRotate = useTransform(
		progress,
		[0.72, 0.85, 1],
		isRtl ? [-18, -32, -42] : [18, 32, 42],
	);
	const glowScale = useTransform(progress, [0.74, 0.96], [0.5, 1.6]);

	return (
		<div
			className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
			aria-hidden="true"
		>
		
			{/* Flying Airplane ascending from underneath the cards */}
			<div className="absolute inset-x-0 bottom-6 flex justify-center">
				<motion.div
					style={{
						x: planeX,
						y: planeY,
						scale: planeScale,
						opacity: planeOpacity,
						rotate: planeRotate,
					}}
					className="relative flex items-center justify-center will-change-transform"
				>
					{/* Soft ambient aura behind the plane */}
					<motion.div
						style={{ scale: glowScale }}
						className="absolute size-24 rounded-full bg-secondary/20 blur-xl"
					/>
					<div className="absolute size-14 rounded-full bg-primary/15 blur-md" />

					{/* Jet contrail lines behind the tail */}
					<div
						className={cn(
							"absolute top-[85%] flex gap-2 opacity-75",
							isRtl ? "rotate-12" : "-rotate-12",
						)}
					>
						<span className="h-10 w-0.5 rounded-full bg-gradient-to-b from-secondary to-transparent" />
						<span className="mt-2 h-14 w-1 rounded-full bg-gradient-to-b from-primary to-transparent" />
						<span className="h-10 w-0.5 rounded-full bg-gradient-to-b from-secondary to-transparent" />
					</div>

					{/* Detailed Travel Airplane SVG */}
					<svg
						width="56"
						height="56"
						viewBox="0 0 24 24"
						fill="none"
						className={cn(
							"relative z-10 drop-shadow-md",
							isRtl ? "-scale-x-100" : "",
						)}
					>
						<path
							d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
							fill="var(--primary)"
						/>
						<path
							d="M11.5 2C12.05 2 12.5 2.45 12.5 3.5V9L20.5 14V15.2L12.5 12.8V19L14.5 20.5V21.3L11.5 20.4V2Z"
							fill="var(--secondary)"
							fillOpacity="0.45"
						/>
					</svg>
				</motion.div>
			</div>
		</div>
	);
}

function Step({
	stepNumber,
	title,
	text,
	icon,
	Icon,
	offset,
	imgSrc,
	n,
	totalSteps,
	progress,
}: {
	stepNumber: string;
	title: string;
	text: string;
	icon?: string | null;
	Icon: React.ComponentType;
	offset: string;
	imgSrc: string;
	n: number;
	totalSteps: number;
	progress: MotionValue<number>;
}) {
	const phaseEnd = 0.72;
	const stepStart = Math.max(
		0,
		((n - 1.45) / Math.max(totalSteps, 1)) * phaseEnd,
	);
	const stepPeak = Math.min(
		phaseEnd,
		((n - 0.45) / Math.max(totalSteps, 1)) * phaseEnd,
	);

	const cardOpacity = useTransform(
		progress,
		[stepStart, stepPeak],
		n === 1 ? [1, 1] : [0.35, 1],
	);
	const cardY = useTransform(
		progress,
		[stepStart, stepPeak],
		n === 1 ? [0, 0] : [28, 0],
	);
	const cardScale = useTransform(
		progress,
		[stepStart, stepPeak, 0.75, 1],
		n === 1 ? [1, 1, 1, 0.96] : [0.92, 1, 1, 0.96],
	);
	const badgeScale = useTransform(
		progress,
		[stepStart, stepPeak],
		n === 1 ? [1, 1] : [0.55, 1],
	);
	const badgeRotate = useTransform(
		progress,
		[stepStart, stepPeak],
		n === 1 ? [0, 0] : [-18, 0],
	);
	const blobRotate = useTransform(
		progress,
		[0, 1],
		n % 2 === 0 ? [-6, 8] : [6, -8],
	);

	return (
		<motion.li
			style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
			className={cn(
				"relative flex flex-col gap-3 w-72 sm:w-82 lg:w-92 shrink-0 select-none will-change-transform",
				offset,
			)}
		>
			<div className="flex items-start gap-3">
				<div className="relative h-50.75 w-52.25 shrink-0">
					<motion.svg
						style={{ rotate: blobRotate }}
						viewBox="0 0 676.72 656.35"
						preserveAspectRatio="none"
						aria-hidden="true"
						className="absolute inset-0 size-full text-secondary/15"
					>
						<path d={BLOB_A} fill="currentColor" />
					</motion.svg>
					<motion.svg
						style={{ rotate: blobRotate }}
						viewBox="0 0 248 241"
						preserveAspectRatio="none"
						aria-hidden="true"
						className="absolute left-0.75 -top-1.25 h-48 w-47 text-secondary/15"
					>
						<path d={BLOB_B} fill="currentColor" />
					</motion.svg>
					<Image
						src={imgSrc}
						alt={title}
						width={200}
						height={200}
						className="relative z-10"
					/>
					<motion.span
						style={{ scale: badgeScale, rotate: badgeRotate }}
						className="absolute -bottom-1 left-2 z-11 grid size-15.75 place-items-center rounded-full bg-secondary/15 text-secondary shadow-xs backdrop-blur-xs"
					>
						{renderStepIcon(icon, Icon)}
					</motion.span>
				</div>
				<span className="font-heading block lg:hidden text-3xl leading-9 tracking-tight text-primary">
					{stepNumber}
				</span>
			</div>

			{/* Animated connecting wave line */}
			<StepConnector
				stepIndex={n}
				totalSteps={totalSteps}
				progress={progress}
			/>

			<div className="flex flex-col gap-1">
				<span className="font-heading hidden lg:block text-3xl leading-9 tracking-tight text-primary">
					{stepNumber}
				</span>
				<h3 className="font-heading text-xl font-bold leading-7 text-foreground">
					{title}
				</h3>
				<p className="max-w-72 py-0.75 text-paragraph small leading-relaxed">
					{text}
				</p>
			</div>
		</motion.li>
	);
}

/* ---------- section ---------- */
export interface StepsSectionProps {
	data?: HomePatientJourneySection;
}

export default function StepsSection({ data }: StepsSectionProps = {}) {
	const { isRtl } = useLanguage();
	const scrollTrackRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLOListElement>(null);
	const [maxScroll, setMaxScroll] = useState(0);

	const { scrollYProgress } = useScroll({
		target: scrollTrackRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 26,
		mass: 0.35,
	});

	const stepCards = data?.step_card;

	useEffect(() => {
		const updateScrollBounds = () => {
			if (!viewportRef.current || !listRef.current) return;
			const viewportWidth = viewportRef.current.clientWidth;
			const listWidth = listRef.current.scrollWidth;
			const overflow = Math.max(0, listWidth - viewportWidth + 32);
			setMaxScroll(overflow);
		};

		updateScrollBounds();

		const resizeObserver = new ResizeObserver(updateScrollBounds);
		if (viewportRef.current) resizeObserver.observe(viewportRef.current);
		if (listRef.current) resizeObserver.observe(listRef.current);

		window.addEventListener("resize", updateScrollBounds);
		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", updateScrollBounds);
		};
	}, [stepCards?.length, isRtl]);

	const x = useTransform(
		smoothProgress,
		[0, 0.72],
		[0, isRtl ? maxScroll : -maxScroll],
	);

	if (!data || !data.headline || !stepCards || stepCards.length === 0) {
		return null;
	}

	const headline = data.headline;
	const description = data.description;

	const activeSteps = stepCards.map((card, i) => {
		const config = STEP_CONFIG[i % STEP_CONFIG.length];
		return {
			stepNumber: card.step_number || String(i + 1).padStart(2, "0"),
			title: card.title,
			text: card.description,
			icon: card.icon,
			Icon: config.Icon,
			offset: config.offset,
			imgSrc: card.image || config.defaultImg,
			n: i + 1,
		};
	});

	return (
		<div
			ref={scrollTrackRef}
			className="relative h-[180vh] lg:h-[310vh] "
		>
			<span
				id="steps"
				className="sr-only -top-28 relative block"
				aria-hidden="true"
			/>

			<section className="sticky top-20 max-sm:p-4  isolate w-full overflow-hidden rounded-3xl">
				{/* Desktop: Pixel-perfect SVG matching Figma curve cut-out */}
				<div
					className="hidden rtl:rotate-y-180 lg:block absolute inset-0 size-full pointer-events-none z-0"
					aria-hidden="true"
				>
					<ExpertiseBackground />
				</div>

				{/* Mobile & Tablet: Fluid rounded background card */}
				<div
					className="block lg:hidden absolute inset-0 size-full bg-wallpaper rounded-3xl z-0 pointer-events-none"
					aria-hidden="true"
				/>

					{/* Takeoff Airplane Finale emerging from underneath the cards */}
				{/* <TravelTakeoffAnimation progress={smoothProgress} isRtl={isRtl} /> */}

				<div className="relative z-10 w-full">
					<header className="grid grid-cols-1 max-lg:text-center lg:grid-cols-12 gap-1 lg:gap-8 items-end mb-4 lg:mb-5">
						<div className="lg:col-span-6">
							<h2 className="text-heading lg:max-w-[70%]">{headline}</h2>
						</div>
						{description && (
							<div className="lg:col-span-5 flex lg:justify-end lg:me-4">
								<p className="text-paragraph h5 leading-relaxed w-full lg:max-w-lg">
									{description}
								</p>
							</div>
						)}
					</header>

					{/* Horizontal Scroll Viewport */}
					<div
						ref={viewportRef}
						className="relative mt-6 sm:mt-8 lg:mt-2 lg:p-6 overflow-hidden"
					>
						<motion.ol
							ref={listRef}
							style={{ x }}
							className="flex flex-nowrap items-start gap-12 sm:gap-16 lg:gap-24 w-max pe-8 will-change-transform"
						>
							{activeSteps.map((s) => (
								<Step
									key={`${s.title}-${s.stepNumber}`}
									{...s}
									totalSteps={activeSteps.length}
									progress={smoothProgress}
								/>
							))}
						</motion.ol>
					</div>
				</div>
			</section>
		</div>
	);
}
