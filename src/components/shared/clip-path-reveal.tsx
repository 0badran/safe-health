"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ClipPathRevealProps {
	children: React.ReactNode;
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
	className?: string;
	delay?: number;
	duration?: number;
	direction?: "up" | "down" | "left" | "right";
	once?: boolean;
	margin?: string;
}

const clipPathVariants = {
	up: {
		initial: {
			clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
			y: 28,
			opacity: 0,
		},
		animate: {
			clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
			y: 0,
			opacity: 1,
		},
	},
	down: {
		initial: {
			clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
			y: -28,
			opacity: 0,
		},
		animate: {
			clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
			y: 0,
			opacity: 1,
		},
	},
	right: {
		initial: {
			clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
			x: -28,
			opacity: 0,
		},
		animate: {
			clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
			x: 0,
			opacity: 1,
		},
	},
	left: {
		initial: {
			clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
			x: 28,
			opacity: 0,
		},
		animate: {
			clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
			x: 0,
			opacity: 1,
		},
	},
};

export function ClipPathReveal({
	children,
	as = "div",
	className,
	delay = 0,
	duration = 0.85,
	direction = "up",
	once = true,
	margin = "-40px",
}: ClipPathRevealProps) {
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 767px)");
		setIsMobile(mediaQuery.matches);

		const handleChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	if (isMobile) {
		const Tag = as;
		return <Tag className={className}>{children}</Tag>;
	}

	const Component = motion[as] as typeof motion.div;
	const variant = clipPathVariants[direction] || clipPathVariants.up;

	return (
		<Component
			initial={variant.initial}
			whileInView={variant.animate}
			viewport={{ once, margin }}
			transition={{
				duration,
				delay,
				ease: [0.16, 1, 0.3, 1], // Smooth exponential out
			}}
			className={cn(
				"md:will-change-[clip-path,transform,opacity] max-md:opacity-100! max-md:[clip-path:none]! max-md:transform-none!",
				className,
			)}
		>
			{children}
		</Component>
	);
}

export default ClipPathReveal;
