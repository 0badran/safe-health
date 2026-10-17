import * as React from "react";
import { cn } from "@/lib/utils";

export function ApproachPlanningIcon({
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
				d="M18 9C18 7.34315 19.3431 6 21 6H27C28.6569 6 30 7.34315 30 9H34C35.6569 9 37 10.3431 37 12V18"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M11 12C11 10.3431 12.3431 9 14 9H18V11C18 11.5523 18.4477 12 19 12H29C29.5523 12 30 11.5523 30 11V9H34"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M11 12V39C11 40.6569 12.3431 42 14 42H34C35.6569 42 37 40.6569 37 39V34"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="15"
				y="18"
				width="4"
				height="4"
				rx="1"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M22 20H28"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<rect
				x="15"
				y="24"
				width="4"
				height="4"
				rx="1"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M22 26H28"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<rect
				x="15"
				y="30"
				width="4"
				height="4"
				rx="1"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M22 32H28"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<rect
				x="15"
				y="36"
				width="4"
				height="4"
				rx="1"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M22 38H30"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<circle
				cx="36"
				cy="24"
				r="6"
				stroke="currentColor"
				strokeWidth="2"
				className="fill-background"
			/>
			<path
				d="M36 21V27M33 24H39"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default ApproachPlanningIcon;
