// Requires Tailwind CSS. Move the font import below into your global CSS

import Image from "next/image";
import { ReactNode } from "react";
import { ExpertiseBackground } from "../about/expertise-background";
import { cn } from "@/lib/utils";

const FONTS = `
  @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap");
`;

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

/* ---------- data ---------- */
const STEPS = [
	{
		title: "Initial Consultation",
		text: "We listen to your concerns, understand your needs, and discuss the best options for you.",
		Icon: ChatIcon,
		offset: "lg:mt-12",
		imgSrc: "/images/steps/img1.png",
	},
	{
		title: "Treatment Planning",
		text: "We create a personalized treatment plan based on your goals and medical needs.",
		Icon: DocIcon,
		offset: "lg:mt-24",
		imgSrc: "/images/steps/img2.png",
	},
	{
		title: "Care Coordination",
		text: "We handle the details — appointments, logistics, and communication with your care team.",
		Icon: CalendarIcon,
		offset: "lg:mt-0",
		imgSrc: "/images/steps/img3.png",
	},
	{
		title: "Follow-Up Support",
		text: "We stay connected to ensure your progress, answer your questions, and support your ongoing care.",
		Icon: HeartPlusIcon,
		offset: "lg:mt-14",
		imgSrc: "/images/steps/img4.png",
	},
];

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
							<stop offset="65%" stopColor="var(--primary)" stopOpacity="0.35" />
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
						<linearGradient id="step-fade-2" x1="0%" y1="100%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
							<stop offset="65%" stopColor="var(--primary)" stopOpacity="0.35" />
							<stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
						</linearGradient>
					</defs>
					<path
						d="M 0 76 C 25 80, 45 60, 65 30 C 80 12, 92 6, 100 6"
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
			<div className="pointer-events-none absolute left-[165px] top-[163px] z-20 hidden w-[calc(100%-125px)] overflow-visible lg:block">
				{/* Small starting dot */}
				<span className="absolute -left-1 -top-1 size-2 rounded-full bg-primary ring-4 ring-primary/20" />
				{/* Connecting wave line ending with fade */}
				<svg
					viewBox="0 0 100 45"
					preserveAspectRatio="none"
					className="h-11 w-full overflow-visible"
					aria-hidden="true"
				>
					<defs>
						<linearGradient id="step-fade-3" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
							<stop offset="65%" stopColor="var(--primary)" stopOpacity="0.35" />
							<stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
						</linearGradient>
					</defs>
					<path
						d="M 0 0 C 35 5, 55 25, 75 35 C 88 40, 95 38, 100 35"
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
			<div className="pointer-events-none absolute left-0 top-0 z-20 hidden size-full overflow-visible lg:block">
				{/* "Health Care Beyond Borders" text annotation */}
				<div className="absolute left-10 xl:left-[130px] -top-12 xl:-top-14 select-none">
					<p className="rotate-[-6deg] font-['Caveat'] text-2xl xl:text-3xl font-bold leading-tight text-secondary">
						Health Care
						<br />
						<span className="ml-3">Beyond Borders</span>
					</p>
				</div>
				{/* Dashed flight trail with downward dip curving up to the airplane */}
				<svg
					width="340"
					height="180"
					viewBox="0 0 340 180"
					className="absolute left-0 top-0 w-64 xl:w-[340px] h-auto overflow-visible"
					aria-hidden="true"
				>
					<path
						d="M 200 112 C 220 155, 265 95, 293 22"
						fill="none"
						stroke="var(--primary)"
						strokeWidth="2.2"
						strokeDasharray="5 4"
						strokeLinecap="round"
						className="opacity-85"
					/>
					<g transform="translate(280, 2) rotate(10 11 11) scale(1.15)">
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
	n,
	title,
	text,
	Icon,
	offset,
	imgSrc,
}: {
	n: number;
	title: string;
	text: string;
	Icon: React.ComponentType;
	offset: string;
	imgSrc: string;
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
				<span className="absolute -bottom-1 left-2 z-11 grid size-15.75 place-items-center rounded-full bg-secondary/15 text-secondary shadow-xs">
					<Icon />
				</span>
			</div>

			{/* Connecting wave line starting with small circle dot and ending with fade */}
			<StepConnector stepIndex={n} />

			<div className="flex flex-col gap-1">
				<span className="font-heading text-3xl leading-9 tracking-tight text-primary">
					{String(n).padStart(2, "0")}
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
export default function StepsSection() {
	return (
		<section
			className="relative isolate w-full overflow-hidden p-4 sm:p-6 rounded-3xl"
			id="steps"
		>
			<style>{FONTS}</style>

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
						<h2 className="text-heading">
							Your Journey,
							<br className="hidden sm:block" />{" "}
							<span>Every Step of the Way.</span>
						</h2>
					</div>
					<div className="lg:col-span-5 flex lg:justify-end me-4">
						<p className="text-paragraph h5 leading-relaxed max-w-lg">
							From understanding your needs to supporting your recovery, we&apos;re
							here to help make every step clearer.
						</p>
					</div>
				</header>

				<div className="relative mt-6 sm:mt-8 lg:mt-0   lg:p-8">
					<ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:items-start">
						{STEPS.map((s, i) => (
							<Step key={s.title} n={i + 1} {...s} />
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}

