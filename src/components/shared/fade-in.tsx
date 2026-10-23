"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FadeInProps extends Omit<HTMLMotionProps<"div">, "children"> {
	children: React.ReactNode;
	delay?: number;
	duration?: number;
	y?: number;
	x?: number;
	direction?: "up" | "down" | "left" | "right" | "none";
	once?: boolean;
	margin?: string;
	className?: string;
	as?: "div" | "section" | "article" | "aside" | "main";
}

export function FadeIn({
	children,
	delay = 0,
	duration = 0.6,
	y = 24,
	x = 0,
	direction = "up",
	once = true,
	margin = "-40px",
	className,
	as = "div",
	...props
}: FadeInProps) {
	const Component = motion[as] as typeof motion.div;

	let initialX = x;
	let initialY = y;

	if (direction === "up") {
		initialY = Math.abs(y || 24);
		initialX = 0;
	} else if (direction === "down") {
		initialY = -Math.abs(y || 24);
		initialX = 0;
	} else if (direction === "left") {
		initialX = Math.abs(x || 24);
		initialY = 0;
	} else if (direction === "right") {
		initialX = -Math.abs(x || 24);
		initialY = 0;
	} else if (direction === "none") {
		initialX = 0;
		initialY = 0;
	}

	return (
		<Component
			initial={{
				opacity: 0,
				x: initialX,
				y: initialY,
			}}
			whileInView={{
				opacity: 1,
				x: 0,
				y: 0,
			}}
			viewport={{ once, margin }}
			transition={{
				duration,
				delay,
				ease: [0.21, 0.47, 0.32, 0.98], // smooth spring-like curve
			}}
			className={cn("will-change-[transform,opacity]", className)}
			{...props}
		>
			{children}
		</Component>
	);
}

export default FadeIn;
