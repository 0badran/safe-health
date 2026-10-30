"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TimelineDot } from "@/components/icons/timeline-dot";
import { cn } from "@/lib/utils";

export interface DoctorsTimelineTrackProps {
	className?: string;
	count?: number;
}

const CARD_HEIGHT = 380;
const GAP_HEIGHT = 96;
const STRIDE = CARD_HEIGHT + GAP_HEIGHT;
const RADIUS = 23;
const LEFT_X = 0.5;
const RIGHT_X = 266.5;

function buildPathFromTurns(turns: number[], totalHeight: number) {
	if (turns.length === 0) {
		return `M ${LEFT_X} 0 L ${LEFT_X} ${totalHeight}`;
	}

	let d = `M ${LEFT_X} 0`;

	for (let i = 0; i < turns.length; i++) {
		const isEven = i % 2 === 0;
		const currentX = isEven ? LEFT_X : RIGHT_X;
		const nextX = isEven ? RIGHT_X : LEFT_X;
		const turnY = turns[i];

		d += ` L ${currentX} ${Math.max(0, turnY - RADIUS)}`;

		if (isEven) {
			d += ` A ${RADIUS} ${RADIUS} 0 0 0 ${currentX + RADIUS} ${turnY}`;
			d += ` L ${nextX - RADIUS} ${turnY}`;
			d += ` A ${RADIUS} ${RADIUS} 0 0 1 ${nextX} ${turnY + RADIUS}`;
		} else {
			d += ` A ${RADIUS} ${RADIUS} 0 0 1 ${currentX - RADIUS} ${turnY}`;
			d += ` L ${nextX + RADIUS} ${turnY}`;
			d += ` A ${RADIUS} ${RADIUS} 0 0 0 ${nextX} ${turnY + RADIUS}`;
		}
	}

	const lastX = turns.length % 2 === 0 ? LEFT_X : RIGHT_X;
	d += ` L ${lastX} ${totalHeight}`;

	return d;
}

function generateFallbackGeometry(count: number) {
	if (count <= 1) {
		return {
			d: `M ${LEFT_X} 0 L ${LEFT_X} ${CARD_HEIGHT}`,
			totalHeight: CARD_HEIGHT,
			dots: [{ id: 0, sideClass: "left-[0.5px]", topPx: 0 }],
		};
	}

	// Total height of N cards and (N - 1) gaps (no gap after the last card)
	const totalHeight = count * CARD_HEIGHT + (count - 1) * GAP_HEIGHT;
	const turns: number[] = [];

	for (let i = 0; i < count - 1; i++) {
		const turnY = (i + 1) * CARD_HEIGHT + i * GAP_HEIGHT + GAP_HEIGHT / 2;
		turns.push(turnY);
	}

	const dots = Array.from({ length: count }, (_, i) => {
		const isEven = i % 2 === 0;
		const topPx = i === 0 ? 0 : turns[i - 1] + RADIUS + 28;
		return {
			id: i,
			sideClass: isEven ? "left-[0.5px]" : "left-[266.5px]",
			topPx,
		};
	});

	return {
		d: buildPathFromTurns(turns, totalHeight),
		totalHeight,
		dots,
	};
}

export function DoctorsTimelineTrack({
	className,
	count = 4,
}: DoctorsTimelineTrackProps) {
	const trackRef = React.useRef<HTMLDivElement>(null);
	const [measured, setMeasured] = React.useState<{
		d: string;
		totalHeight: number;
		dots: { id: number; sideClass: string; topPx: number }[];
	} | null>(null);

	React.useEffect(() => {
		const trackEl = trackRef.current;
		const sectionEl = trackEl?.parentElement;
		if (!trackEl || !sectionEl || count <= 0) return;

		const updateGeometry = () => {
			const articles = Array.from(
				sectionEl.querySelectorAll<HTMLElement>("article"),
			);
			if (articles.length === 0) return;

			const trackRect = trackEl.getBoundingClientRect();
			const totalHeight = Math.max(trackRect.height, 1);

			if (trackRect.height === 0) return;

			const turns: number[] = [];

			for (let i = 0; i < articles.length - 1; i++) {
				const currentRect = articles[i].getBoundingClientRect();
				const nextRect = articles[i + 1].getBoundingClientRect();

				// Find the exact Info Card inside each article if present for tighter visual alignment
				const currentCard =
					articles[i].querySelector<HTMLElement>(".bg-card") ?? articles[i];
				const nextCard =
					articles[i + 1].querySelector<HTMLElement>(".bg-card") ??
					articles[i + 1];

				const currentBottom =
					currentCard.getBoundingClientRect().bottom - trackRect.top;
				const nextTop = nextCard.getBoundingClientRect().top - trackRect.top;

				// Midpoint in the gap between card i and card i + 1
				const rawMid = (currentBottom + nextTop) / 2;
				const fallbackMid =
					(currentRect.bottom - trackRect.top + (nextRect.top - trackRect.top)) /
					2;

				const turnY = nextTop > currentBottom ? rawMid : fallbackMid;
				turns.push(turnY);
			}

			const dots = articles.map((_, i) => {
				const isEven = i % 2 === 0;
				const topPx = i === 0 ? 0 : turns[i - 1] + RADIUS + 28;
				return {
					id: i,
					sideClass: isEven ? "left-[0.5px]" : "left-[266.5px]",
					topPx,
				};
			});

			setMeasured({
				d: buildPathFromTurns(turns, totalHeight),
				totalHeight,
				dots,
			});
		};

		updateGeometry();

		const resizeObserver = new ResizeObserver(() => {
			updateGeometry();
		});

		resizeObserver.observe(sectionEl);
		const articles = sectionEl.querySelectorAll("article");
		articles.forEach((article) => resizeObserver.observe(article));

		window.addEventListener("resize", updateGeometry);
		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", updateGeometry);
		};
	}, [count]);

	const fallback = React.useMemo(() => generateFallbackGeometry(count), [count]);
	const activeGeometry = measured ?? fallback;

	if (!count || count <= 0) {
		return null;
	}

	return (
		<div
			ref={trackRef}
			aria-hidden="true"
			className={cn(
				"absolute left-1/2 -translate-x-1/2 top-6 bottom-12 w-67 pointer-events-none hidden md:block select-none z-0",
				className,
			)}
		>
			{/* Snake Dashed SVG Line */}
			<svg
				width="268"
				height={activeGeometry.totalHeight}
				viewBox={`0 0 268 ${activeGeometry.totalHeight}`}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="size-full overflow-visible"
				preserveAspectRatio="none"
			>
				<motion.path
					d={activeGeometry.d}
					stroke="url(#paint0_linear_doctors_snake)"
					strokeWidth="1"
					strokeDasharray="5 5"
					vectorEffect="non-scaling-stroke"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				/>
				<defs>
					<linearGradient
						id="paint0_linear_doctors_snake"
						x1="-81.7744"
						y1="0"
						x2="256.619"
						y2={String(activeGeometry.totalHeight)}
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#159BA8" />
						<stop offset="1" stopColor="#ECE6FF" />
					</linearGradient>
				</defs>
			</svg>

			{/* Dynamic Timeline Dots for each doctor position with spring entrance */}
			{activeGeometry.dots.map((dot) => {
				const topPercent =
					(dot.topPx / Math.max(activeGeometry.totalHeight, 1)) * 100;
				return (
					<motion.div
						key={dot.id}
						style={{ top: `${topPercent}%` }}
						initial={{ scale: 0, opacity: 0 }}
						whileInView={{ scale: 1, opacity: 1 }}
						viewport={{ once: true, margin: "-30px" }}
						transition={{
							type: "spring",
							stiffness: 320,
							damping: 20,
							delay: 0.15 + dot.id * 0.1,
						}}
						className={cn(
							"absolute -translate-x-1/2 -translate-y-1/2 z-10",
							dot.sideClass,
						)}
					>
						<TimelineDot />
					</motion.div>
				);
			})}
		</div>
	);
}

export default DoctorsTimelineTrack;
