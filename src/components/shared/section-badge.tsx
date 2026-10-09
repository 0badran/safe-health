import * as React from "react";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface SectionBadgeProps extends React.ComponentProps<"div"> {
	children: React.ReactNode;
	variant?: VariantProps<typeof badgeVariants>["variant"];
	dotClassName?: string;
	badgeClassName?: string;
}

export function SectionBadge({
	children,
	variant = "secondary",
	dotClassName,
	badgeClassName,
	className,
	...props
}: SectionBadgeProps) {
	return (
		<div
			className={cn("inline-flex items-center gap-2 select-none", className)}
			{...props}
		>
			<span
				className={cn("size-2 rounded-full bg-primary shrink-0", dotClassName)}
			/>
			<Badge
				variant={variant}
				className={cn(
					"px-3 py-1 text-xs font-bold tracking-widest uppercase",
					badgeClassName,
				)}
			>
				{children}
			</Badge>
			<span
				className={cn("size-2 rounded-full bg-primary shrink-0", dotClassName)}
			/>
		</div>
	);
}
