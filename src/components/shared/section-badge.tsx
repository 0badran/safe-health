import * as React from "react";
import { cn } from "@/lib/utils";
import { BadgeOrnament } from "@/components/icons";

interface SectionBadgeProps extends React.ComponentProps<"div"> {
	children: React.ReactNode;
}

export function SectionBadge({
	children,
	className,
	...props
}: SectionBadgeProps) {
	return (
		<div
			className={cn(
				"inline-flex items-center gap-2.5 sm:gap-3 rounded-2xl bg-wallpaper px-3.5 py-1.5 sm:px-4 sm:py-2 select-none w-fit ",
				className,
			)}
			{...props}
		>
			<BadgeOrnament />

			<span className={cn("font-medium uppercase")}>{children}</span>

			<BadgeOrnament flip />
		</div>
	);
}

export default SectionBadge;
