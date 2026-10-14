import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeOrnamentProps extends React.ComponentProps<"svg"> {
	flip?: boolean;
}

export function BadgeOrnament({
	flip = false,
	className,
	...props
}: BadgeOrnamentProps) {
	return (
		<svg
			width="25"
			height="9"
			viewBox="0 0 25 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(
				"shrink-0 text-[#7b61ff]",
				flip && "rotate-180",
				className,
			)}
			aria-hidden="true"
			{...props}
		>
			<line
				x1="0"
				y1="4.5"
				x2="17"
				y2="4.5"
				stroke="currentColor"
				strokeWidth="1.2"
			/>
			<circle cx="19.5" cy="4.5" r="4" fill="currentColor" />
		</svg>
	);
}

export default BadgeOrnament;
