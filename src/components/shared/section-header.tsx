"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { SectionBadge } from "./section-badge";
import { ClipPathReveal } from "./clip-path-reveal";

export default function SectionHeader({
	subTitle,
	title,
	desc,
	buttonText,
	buttonLink,
	align = "start",
}: {
	subTitle?: string;
	title: string;
	desc?: string;
	buttonText?: string;
	buttonLink?: string;
	align?: "start" | "center" | "end";
}) {
	const aligmentClassMap: Record<"start" | "center" | "end", string> = {
		start: "items-start text-start",
		center: "items-center text-center",
		end: "items-end text-end",
	};

	return (
		<div className="flex items-end max-md:flex-wrap mb-5 lg:mb-7">
			<div
				data-figma="Heading"
				className={`relative flex flex-col justify-center w-full lg:min-h-30 gap-4 ${aligmentClassMap[align]}`}
			>
				{subTitle && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.5, ease: "easeOut" }}
					>
						<SectionBadge>{subTitle}</SectionBadge>
					</motion.div>
				)}

				{/* Title with Framer Motion ClipPath Reveal */}
				<ClipPathReveal as="h1" className="text-heading" delay={0.05}>
					{title}
				</ClipPathReveal>

				{/* Description with Staggered ClipPath Reveal */}
				{desc && (
					<ClipPathReveal
						as="p"
						className="text-paragraph h5 max-w-2xl"
						delay={0.15}
					>
						{desc}
					</ClipPathReveal>
				)}
			</div>
			{buttonText && buttonLink ? (
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
				>
					<Link href={buttonLink}>
						<Button variant="outline" withArrow>
							{buttonText}
						</Button>
					</Link>
				</motion.div>
			) : null}
		</div>
	);
}
