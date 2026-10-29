import * as React from "react";
import { cn } from "@/lib/utils";
import { BadgeOrnament } from "@/components/icons";

interface SectionBadgeProps extends React.ComponentProps<"div"> {
	children: React.ReactNode;
	withoutIcon?: boolean;
}

export function SectionBadge({
	children,
	className,
	withoutIcon = false,
	...props
}: SectionBadgeProps) {
	return (
		<div
			className={cn(
				"inline-flex items-center gap-2.5 sm:gap-3 rounded-2xl bg-wallpaper px-2 py-1.5 sm:px-4 sm:py-2 select-none w-fit uppercase font-medium",
				className,
			)}
			{...props}
		>
			{!withoutIcon && <BadgeOrnament />}

			{children}

			{!withoutIcon && <BadgeOrnament flip />}
		</div>
	);
}

export default SectionBadge;
