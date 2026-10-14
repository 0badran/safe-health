"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DragonWatermark } from "@/components/icons/dragon-watermark";
import { cn } from "@/lib/utils";

interface HealthcareOption {
	id: string;
	title: string;
	description: string;
	image: string;
	link: string;
}

const HEALTHCARE_OPTIONS: HealthcareOption[] = [
	{
		id: "plastic-surgery",
		title: "Plastic Surgery",
		description:
			"Enhance your natural beauty and confidence with advanced surgical and aesthetic procedures.",
		image: "/images/why-choose/aesthetic-care.jpg",
		link: "/treatments/plastic-surgery",
	},
	{
		id: "hair-transplant",
		title: "Hair Transplant",
		description:
			"Restore natural hair growth and confidence with advanced hair transplant techniques.",
		image: "/images/why-choose/aesthetic-care.jpg",
		link: "/treatments/hair-transplant",
	},
	{
		id: "dental",
		title: "Dental",
		description:
			"Achieve a healthy, beautiful smile with our comprehensive dental care solutions.",
		image: "/images/why-choose/aesthetic-care.jpg",
		link: "/treatments/dental",
	},
	{
		id: "rhinoplasty-surgery",
		title: "Rhinoplasty Surgery",
		description:
			"Enhance facial harmony with natural-looking results tailored to your features.",
		image: "/images/why-choose/aesthetic-care.jpg",
		link: "/treatments/rhinoplasty",
	},
	{
		id: "bariatric-surgery",
		title: "Bariatric Surgery",
		description:
			"Safe and effective weight loss procedures designed to transform your life.",
		image: "/images/why-choose/aesthetic-care.jpg",
		link: "/treatments/bariatric",
	},
];

export function HealthcareOptionsSection() {
	// Card with ID 'hair-transplant' is active by default to match the design screenshot
	const [activeId, setActiveId] = useState<string>("hair-transplant");

	return (
		<section className="relative isolate w-full pt-3 sm:pt-4 lg:pt-5 pb-8 sm:pb-12 lg:pb-14">
			{/* 1. Responsive background that stretches dynamically with any content height */}
			<div className="absolute inset-0 size-full pointer-events-none z-0">
				{/* Desktop: Pixel-perfect SVG matching Figma curve cut-out */}
				<svg
					viewBox="0 0 1237 579"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					className="hidden lg:block size-full text-wallpaper"
					aria-hidden="true"
				>
					<path
						d="M755.277 107.123C763.763 121.313 779.08 130 795.614 130H1226.79C1227.92 130 1229 129.549 1229.79 128.747C1232.44 126.065 1237 127.94 1237 131.709V532C1237 557.957 1215.96 579 1190 579H47C21.0426 579 0 557.957 0 532V47C0 21.0426 21.0426 0 47 0H664.559C681.092 0 696.41 8.68743 704.896 22.8773L755.277 107.123Z"
						fill="currentColor"
					/>
				</svg>

				{/* Mobile & Tablet: Fluid rounded background card */}
				<div className="block lg:hidden size-full bg-wallpaper rounded-3xl" />
			</div>

			{/* 2. Top Header Grid (Positioned in alignment with the SVG curve) */}
			<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 px-6 sm:px-10 lg:px-12 mb-6 sm:mb-8 pt-1 sm:pt-2">
				{/* Left Column: Description & Action Button */}
				<div className="lg:col-span-7 flex flex-col justify-start items-start gap-4 sm:gap-5 max-w-xl">
					<p className="text-paragraph h5 leading-relaxed">
						Discover specialized treatments and trusted medical destinations
						tailored to your needs, with care that puts your health first
					</p>

					<Link href="/treatments">
						<Button variant="default" withArrow size="lg">
							Find Your Care
						</Button>
					</Link>
				</div>

				{/* Right Column: Heading sitting in the cutout area */}
				<div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-start">
					<h2 className="text-heading">
						Explore Your
						<br />
						<span>Healthcare Options</span>
					</h2>
				</div>
			</div>

			{/* 3. Cards Carousel: Dynamically sized cards with hover activation & dragon watermark */}
			<div className="relative z-10 w-full px-4 sm:px-8 lg:px-10">
				<div className="flex gap-5 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory">
					{HEALTHCARE_OPTIONS.map((card) => {
						const isActive = activeId === card.id;

						return (
							<div
								key={card.id}
								onMouseEnter={() => setActiveId(card.id)}
								className={cn(
									"group relative shrink-0 w-66.25 sm:w-71.25 lg:w-73.75 rounded-3xl shadow-md p-5 sm:p-6 transition-all duration-300 snap-start flex flex-col justify-between overflow-hidden cursor-pointer",
									isActive
										? "bg-primary text-primary-foreground -translate-y-1"
										: "bg-card text-card-foreground hover:-translate-y-1 border border-border/50",
								)}
							>
								{/* Dragon Watermark (Visible on hover and on the active card) */}
								<div
									className={cn(
										"absolute -top-3 -inset-e-3 size-40 pointer-events-none transition-all duration-500",
										isActive
											? "opacity-100 scale-100 text-white"
											: "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 text-primary/40",
									)}
									aria-hidden="true"
								>
									<DragonWatermark className="size-full" opacity={0.16} />
								</div>

								{/* Top Content: Title & Description */}
								<div className="relative z-10 flex flex-col gap-2.5">
									<h3 className="font-heading h3 leading-snug tracking-tight">
										{card.title}
									</h3>
									<p
										className={cn(
											"small leading-relaxed transition-colors",
											isActive && "text-wallpaper",
										)}
									>
										{card.description}
									</p>
								</div>

								{/* Bottom Image with Circular Arrow Action */}
								<div className="relative z-10 w-full aspect-4/3 rounded-2xl overflow-hidden mt-6 bg-muted">
									<Image
										src={card.image}
										alt={card.title}
										fill
										className="object-cover size-full transition-transform duration-500 group-hover:scale-105"
									/>

									{/* Circular Action Arrow Overlay */}
									<Link
										href={card.link}
										className={cn(
											"absolute bottom-3 inset-e-3 size-9 sm:size-10 rounded-full flex items-center justify-center bg-white/38 backdrop-blur-sm transition-all duration-300 shadow-sm",
											isActive ? "text-background" : "text-secondary",
										)}
										aria-label={card.title}
									>
										<ArrowRight className="size-4.5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
