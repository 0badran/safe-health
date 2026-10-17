import * as React from "react";
import { cn } from "@/lib/utils";

export function ApproachGuidanceIcon({
	className,
	...props
}: React.ComponentProps<"svg">) {
	return (
		<svg
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("size-12 text-secondary shrink-0", className)}
			{...props}
		>
			<path
				d="M10 37L17 33C18.8 32 20.8 32.6 22 34L25 37.5C26.8 39.5 29.5 40 32 38.8L38 34.5"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M10 37C10 37 12.5 41 17.5 42C21 42.8 25.5 40.5 28.5 38"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M24 8V33"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M18 10L13 14L18 18H24V10H18Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M30 17L35 21L30 25H24V17H30Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default ApproachGuidanceIcon;
