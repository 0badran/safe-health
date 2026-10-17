import * as React from "react";
import { cn } from "@/lib/utils";

export function ApproachCoordinationIcon({
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
				d="M17 17C17 12 20 8 24 8C28 8 31 12 31 17"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M15 19C15 15.5 18.5 14 24 14C29.5 14 33 15.5 33 19"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M18 19V25C18 28.5 20.5 31 24 31C27.5 31 30 28.5 30 25V19"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M20 22C20.5 22.5 21.5 22.5 22 22"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M26 22C26.5 22.5 27.5 22.5 28 22"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M21 31V34C21 34.5 20.5 35 20 35H14C12 35 11 37 11 39"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M27 31V34C27 34.5 27.5 35 28 35H34C36 35 37 37 37 39"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<circle cx="12" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5" />
			<circle cx="10" cy="24" r="1" stroke="currentColor" strokeWidth="1.5" />
			<circle cx="11" cy="29" r="1.5" stroke="currentColor" strokeWidth="1.5" />
			<circle cx="36" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5" />
			<circle cx="38" cy="24" r="1" stroke="currentColor" strokeWidth="1.5" />
			<circle cx="37" cy="29" r="1.5" stroke="currentColor" strokeWidth="1.5" />
		</svg>
	);
}

export default ApproachCoordinationIcon;
