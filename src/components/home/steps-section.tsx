import { cn } from "@/lib/utils";
import type { HomePatientJourneySection } from "@/types/home";
import Image from "next/image";
import React, { type ReactNode } from "react";
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
		offset: "lg:mt-12",
		defaultImg: "/images/steps/img1.png",
	},
	{
		Icon: DocIcon,
		offset: "lg:mt-24",
		defaultImg: "/images/steps/img2.png",
	},
	{
		Icon: CalendarIcon,
		offset: "lg:mt-0",
		defaultImg: "/images/steps/img3.png",
	},
	{
		Icon: HeartPlusIcon,
		offset: "lg:mt-14",
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
				<Image
					src={icon}
					alt=""
					fill
					sizes="28px"
					className="object-contain"
				/>
			</div>
		);
	}
	return <FallbackIcon />;
}

/* ---------- connecting lines between steps ---------- */
function StepConnector({ stepIndex }: { stepIndex: number }) {
	if (stepIndex === 1) {
		return (
			<div className="pointer-events-none absolute left-[165px] top-[163px] z-20 hidden w-[calc(100%-125px)] overflow-visible lg:block">
				{/* Small starting dot */}
				<span className="absolute -left-1 -top-1 size-2 rounded-full bg-primary ring-4 ring-primary/20" />
				{/* Connecting wave line ending with fade */}
				<svg
					viewBox="0 0 100 40"
					preserveAspectRatio="none"
					className="h-10 w-full overflow-visible"
					aria-hidden="true"
				>
					<defs>
						<linearGradient id="step-fade-1" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
							<stop
								offset="65%"
								stopColor="var(--primary)"
								stopOpacity="0.35"
							/>
							<stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
						</linearGradient>
					</defs>
					<path
						d="M 0 0 C 35 5, 55 25, 75 32 C 88 36, 95 34, 100 32"
						fill="none"
						stroke="url(#step-fade-1)"
						strokeWidth="2.2"
						vectorEffect="non-scaling-stroke"
						strokeLinecap="round"
					/>
				</svg>
			</div>
		);
	}

	if (stepIndex === 2) {
		return (
			<div className="pointer-events-none absolute left-[165px] top-[55px] z-20 hidden h-[120px] w-[calc(100%-125px)] overflow-visible lg:block">
				{/* Small starting dot */}
				<span className="absolute -left-1 bottom-1 size-2 rounded-full bg-primary ring-4 ring-primary/20" />
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
							<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
							<stop
								offset="65%"
								stopColor="var(--primary)"
								stopOpacity="0.35"
							/>
							<stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
						</linearGradient>
					</defs>
					<path
						d="M 0 70 C 25 72, 45 40, 70 18 C 82 7, 92 2, 100 0"
						fill="none"
						stroke="url(#step-fade-2)"
						strokeWidth="2.2"
						vectorEffect="non-scaling-stroke"
						strokeLinecap="round"
					/>
				</svg>
			</div>
		);
	}

	if (stepIndex === 3) {
		return (
			<div className="pointer-events-none absolute left-41.25 top-18.75 z-20 hidden w-[calc(100%-125px)] overflow-visible lg:block">
				{/* Small starting dot */}
				<span className="absolute -left-1 -top-1 size-2 rounded-full bg-primary ring-4 ring-primary/20" />
				{/* Connecting wave line diving gently to step 4 */}
				<svg
					viewBox="0 0 100 45"
					preserveAspectRatio="none"
					className="h-11 w-full overflow-visible"
					aria-hidden="true"
				>
					<defs>
						<linearGradient id="step-fade-3" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
							<stop
								offset="65%"
								stopColor="var(--primary)"
								stopOpacity="0.35"
							/>
							<stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
						</linearGradient>
					</defs>
					<path
						d="M 0 0 C 30 8, 55 30, 80 38 C 90 42, 96 40, 100 38"
						fill="none"
						stroke="url(#step-fade-3)"
						strokeWidth="2.2"
						vectorEffect="non-scaling-stroke"
						strokeLinecap="round"
					/>
				</svg>
			</div>
		);
	}

	if (stepIndex === 4) {
		return (
			<div className="pointer-events-none absolute -right-2 top-[163px] z-20 hidden overflow-visible lg:block">
				{/* Small landing airplane at the finish */}
				<svg
					width="22"
					height="23"
					viewBox="0 0 22 23"
					fill="none"
					className="rotate-45"
					aria-hidden="true"
				>
					<g opacity="0.85">
						<path
							d="M22 16V14L12.5 8V1.5C12.5 0.7 11.8 0 11 0C10.2 0 9.5 0.7 9.5 1.5V8L0 14V16L9.5 13V19.5L7 21.5V23L11 22L15 23V21.5L12.5 19.5V13L22 16Z"
							fill="var(--primary)"
						/>
					</g>
				</svg>
			</div>
		);
	}

	return null;
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
}: {
	stepNumber: string;
	title: string;
	text: string;
	icon?: string | null;
	Icon: React.ComponentType;
	offset: string;
	imgSrc: string;
	n: number;
}) {
	return (
		<li
			className={cn(
				"relative flex flex-col gap-2 max-sm:max-w-70 max-sm:mx-auto",
				offset,
			)}
		>
			<div className="relative h-50.75 w-52.25 shrink-0">
				<svg
					viewBox="0 0 676.72 656.35"
					preserveAspectRatio="none"
					aria-hidden="true"
					className="absolute inset-0 size-full text-secondary/15"
				>
					<path d={BLOB_A} fill="currentColor" />
				</svg>
				<svg
					viewBox="0 0 248 241"
					preserveAspectRatio="none"
					aria-hidden="true"
					className="absolute left-0.75 -top-1.25 h-48 w-47 text-secondary/15"
				>
					<path d={BLOB_B} fill="currentColor" />
				</svg>
				<Image
					src={imgSrc}
					alt={title}
					width={200}
					height={200}
					className="relative z-10"
				/>
				<span className="absolute -bottom-1 left-2 z-11 grid size-15.75 place-items-center rounded-full bg-[#EAF5F4] text-secondary shadow-xs">
					{renderStepIcon(icon, Icon)}
				</span>
			</div>

			{/* Connecting wave line starting with small circle dot and ending with fade */}
			<StepConnector stepIndex={n} />

			<div className="flex flex-col gap-1">
				<span className="font-heading text-3xl leading-9 tracking-tight text-primary">
					{stepNumber}
				</span>
				<h3 className="font-heading text-xl font-bold leading-7 text-foreground">
					{title}
				</h3>
				<p className="max-w-67.5 py-0.75 text-paragraph small leading-relaxed">
					{text}
				</p>
			</div>
		</li>
	);
}

/* ---------- section ---------- */
export interface StepsSectionProps {
	data?: HomePatientJourneySection;
}

export default function StepsSection({ data }: StepsSectionProps = {}) {
	const stepCards = data?.step_card;

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
		<section
			className="relative isolate w-full overflow-hidden p-4 sm:p-6 rounded-3xl scroll-mt-28"
			id="patient-journey"
		>
			<span id="steps" className="sr-only -top-28 relative block" aria-hidden="true" />

			{/* Desktop: Pixel-perfect SVG matching Figma curve cut-out */}
			<div
				className="hidden lg:block absolute inset-0 size-full pointer-events-none z-0"
				aria-hidden="true"
			>
				<ExpertiseBackground />
			</div>

			{/* Mobile & Tablet: Fluid rounded background card */}
			<div
				className="block lg:hidden absolute inset-0 size-full bg-wallpaper rounded-3xl z-0 pointer-events-none"
				aria-hidden="true"
			/>

			<div className="relative z-10 w-full">
				<header className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-end mb-8 sm:mb-10 lg:mb-12">
					<div className="lg:col-span-7 ">
						<h2 className="text-heading max-w-[70%]">{headline}</h2>
					</div>
					{description && (
						<div className="lg:col-span-5 flex lg:justify-end me-4">
							<p className="text-paragraph h5 leading-relaxed max-w-lg">
								{description}
							</p>
						</div>
					)}
				</header>

				<div className="relative mt-6 sm:mt-8 lg:mt-0 lg:p-8">
					<ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:items-start">
						{activeSteps.map((s) => (
							<Step key={`${s.title}-${s.stepNumber}`} {...s} />
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}
