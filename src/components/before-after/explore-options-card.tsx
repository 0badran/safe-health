"use client";

import { ConsultationDrawer } from "@/components/consultation/consultation-drawer";
import { cn } from "@/lib/utils";
import { Flower } from "lucide-react";
import { Button } from "../ui/button";

interface ExploreOptionsCardProps {
	className?: string;
}

export function ExploreOptionsCard({ className }: ExploreOptionsCardProps) {
	return (
		<section
			aria-label="Ready to Explore Your Options"
			className={cn(
				"relative w-full rounded-3xl overflow-hidden py-12 sm:py-16 px-6 sm:px-12 flex flex-col items-center justify-center text-center gap-4 sm:gap-5 translate-y-[7%] z-1",
				className,
			)}
			style={{
				background:
					"linear-gradient(135deg, #392579 0%, #251754 50%, #2D1266 100%)",
				boxShadow:
					"0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
			}}
		>
			{/* Aesthetic Pill Badge */}
			<div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 small font-bold tracking-wider text-purple-tint uppercase select-none backdrop-blur-md">
				<Flower className="size-3.5" />
				<span>CONCIERGE AESTHETIC ADVISORY</span>
			</div>

			{/* Heading */}
			<h2 className="font-heading text-white h1 leading-tight tracking-tight">
				Ready to Explore Your Options?
			</h2>

			{/* Description Paragraph */}
			<p className="text-border max-w-xl h5 leading-relaxed">
				Speak with our dedicated medical concierge to evaluate your suitability,
				review personalized surgical plans, and map your sanctuary stay.
			</p>

			{/* CTA Button Triggering Consultation Drawer */}
			<ConsultationDrawer
				title="Book A Consultation"
				trigger={
					<Button variant="secondary" withArrow>
						Book A Consultation
					</Button>
				}
			/>
		</section>
	);
}

export default ExploreOptionsCard;
