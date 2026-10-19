import * as React from "react";
import { cn } from "@/lib/utils";

export type TimelineDotProps = React.ComponentProps<"div">;

export function TimelineDot({ className, ...props }: TimelineDotProps) {
	return (
		<div
			className={cn(
				"relative flex items-center justify-center size-9 shrink-0 select-none",
				className,
			)}
			{...props}
		>
			{/* Subtle outer breathing aura */}
			<span className="absolute size-9 rounded-full bg-secondary/20 animate-ping pointer-events-none animation-duration-[3s]" />
			<span className="absolute size-10 rounded-full bg-secondary/15 animate-pulse pointer-events-none animation-duration-[2.5s]" />

			{/* Base SVG with white circular shadow container */}
			<svg
				width="36"
				height="36"
				viewBox="0 0 36 36"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="relative z-10 size-9"
				aria-hidden="true"
			>
				<g filter="url(#filter0_d_490_1137)">
					<rect
						x="2"
						y="1"
						width="32"
						height="32"
						rx="16"
						fill="white"
						shapeRendering="crispEdges"
					/>
					<g filter="url(#filter1_d_490_1137)">
						<rect x="14" y="13" width="8" height="8" rx="4" fill="#159BA8" />
					</g>
				</g>
				<defs>
					<filter
						id="filter0_d_490_1137"
						x="0"
						y="0"
						width="36"
						height="36"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="1" />
						<feGaussianBlur stdDeviation="1" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_490_1137"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_490_1137"
							result="shape"
						/>
					</filter>
					<filter
						id="filter1_d_490_1137"
						x="3"
						y="3"
						width="30"
						height="30"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="1" />
						<feGaussianBlur stdDeviation="5.5" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.0120192 0 0 0 0 0.687341 0 0 0 0 0.75 0 0 0 0.85 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_490_1137"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_490_1137"
							result="shape"
						/>
					</filter>
				</defs>
			</svg>

			{/* Subtle internal rotating dashed ring around the center */}
			<span
				className="absolute z-20 size-5 rounded-full border border-dashed border-secondary/45 animate-[spin_10s_linear_infinite] pointer-events-none"
				aria-hidden="true"
			/>

			{/* Center pulsing cyan core with subtle radiant glow */}
			<span
				className="absolute z-20 size-2 rounded-full bg-secondary shadow-[0_0_8px_var(--color-secondary)] animate-pulse pointer-events-none animation-duration-[2s]"
				aria-hidden="true"
			/>
		</div>
	);
}

export default TimelineDot;
