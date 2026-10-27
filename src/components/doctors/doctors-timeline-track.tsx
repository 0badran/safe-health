"use client";

import * as React from "react";
import { TimelineDot } from "@/components/icons/timeline-dot";
import { cn } from "@/lib/utils";

export interface DoctorsTimelineTrackProps {
	className?: string;
	count?: number;
}

const SEGMENT_HEIGHT = 440;
const RADIUS = 23;
const LEFT_X = 0.5;
const RIGHT_X = 266.5;

function generateSnakePath(count: number) {
	if (count <= 1) {
		return {
			d: `M ${LEFT_X} 0 L ${LEFT_X} ${SEGMENT_HEIGHT}`,
			totalHeight: SEGMENT_HEIGHT,
		};
	}

	const totalHeight = count * SEGMENT_HEIGHT;
	let d = `M ${LEFT_X} 0`;

	for (let i = 0; i < count - 1; i++) {
		const isEven = i % 2 === 0;
		const currentX = isEven ? LEFT_X : RIGHT_X;
		const nextX = isEven ? RIGHT_X : LEFT_X;
		const turnY = (i + 1) * SEGMENT_HEIGHT - 31.5;

		// Straight down to corner
		d += ` L ${currentX} ${turnY - RADIUS}`;

		// Horizontal crossover curves
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

	const lastX = (count - 1) % 2 === 0 ? LEFT_X : RIGHT_X;
	d += ` L ${lastX} ${totalHeight}`;

	return { d, totalHeight };
}

export function DoctorsTimelineTrack({
	className,
	count = 4,
}: DoctorsTimelineTrackProps) {
	const { d, totalHeight } = React.useMemo(
		() => generateSnakePath(count),
		[count],
	);

	const dots = React.useMemo(() => {
		return Array.from({ length: count }, (_, i) => {
			const isEven = i % 2 === 0;
			const topPercent =
				i === 0 ? 0 : ((i * SEGMENT_HEIGHT + 25) / totalHeight) * 100;

			return {
				id: i,
				sideClass: isEven ? "left-[0.5px]" : "left-[266.5px]",
				topPercent,
			};
		});
	}, [count, totalHeight]);

	if (!count || count <= 0) {
		return null;
	}

	return (
		<div
			aria-hidden="true"
			className={cn(
				"absolute left-1/2 -translate-x-1/2 top-6 bottom-12 w-67 pointer-events-none hidden md:block select-none z-0",
				className,
			)}
		>
			{/* Snake Dashed SVG Line */}
			<svg
				width="268"
				height={totalHeight}
				viewBox={`0 0 268 ${totalHeight}`}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="w-full h-full overflow-visible"
				preserveAspectRatio="none"
			>
				<path
					d={d}
					stroke="url(#paint0_linear_doctors_snake)"
					strokeWidth="1"
					strokeDasharray="5 5"
					vectorEffect="non-scaling-stroke"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_doctors_snake"
						x1="0"
						y1="0"
						x2="0"
						y2={totalHeight}
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#159BA8" />
						<stop offset="0.75" stopColor="#159BA8" />
						<stop offset="1" stopColor="#ECE6FF" />
					</linearGradient>
				</defs>
			</svg>

			{/* Dynamic Timeline Dots for each doctor position */}
			{dots.map((dot) => (
				<div
					key={dot.id}
					style={{ top: `${dot.topPercent}%` }}
					className={cn(
						"absolute -translate-x-1/2 -translate-y-1/2 z-10",
						dot.sideClass,
					)}
				>
					<TimelineDot />
				</div>
			))}
		</div>
	);
}

export default DoctorsTimelineTrack;
