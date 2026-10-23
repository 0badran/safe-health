"use client";

import { DragonWatermark } from "@/components/icons/dragon-watermark";
import { Button } from "@/components/ui/button";
import { SectionCarousel } from "@/components/shared/section-carousel";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useFetchData from "@/hooks/use-fetch-data";
import type { HomeHealthcareOptionsSection, ServiceItem } from "@/types/home";

export interface HealthcareOptionsSectionProps {
	data?: HomeHealthcareOptionsSection;
	services?: ServiceItem[];
}

export function HealthcareOptionsSection({
	data,
	services: propServices,
}: HealthcareOptionsSectionProps = {}) {
	const { data: apiResponse, isLoading } = useFetchData<{ data: ServiceItem[] }>({
		route: "/services",
		enabled: !propServices,
	});

	const services = propServices ?? apiResponse?.data;
	const [activeId, setActiveId] = useState<number | string | null>(null);

	if (!data || !data.headline) {
		return null;
	}

	if (!isLoading && (!services || services.length === 0)) {
		return null;
	}

	if (isLoading && !services) {
		return null;
	}

	const activeServices = services ?? [];
	const currentActiveId = activeId ?? activeServices[0]?.id ?? null;
	const headline = data.headline;
	const description = data.description;

	return (
		<section className="relative isolate w-full p-4 lg:p-7" id="healthcare-options">
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
			<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8">
				{/* Left Column: Description & Action Button */}
				<div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-start items-start gap-4 sm:gap-5 max-w-xl">
					{description && (
						<p className="text-paragraph h5 leading-relaxed">
							{description}
						</p>
					)}

					<Link href="/treatments">
						<Button variant="default" withArrow>
							Find Your Care
						</Button>
					</Link>
				</div>

				{/* Right Column: Heading sitting in the cutout area */}
				<div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start lg:items-end justify-start">
					<h2 className="text-heading">
						{headline}
					</h2>
				</div>
			</div>

			{/* 3. Cards Carousel */}
			<div className="relative z-10 w-full mt-6 sm:mt-8">
				<SectionCarousel
					items={activeServices}
					keyExtractor={(card) => String(card.id)}
					contentClassName="-ms-4 py-2"
					renderItem={(card) => {
						const isActive = currentActiveId === card.id;

						return (
							<div className="flex justify-center h-full">
								<div
									onMouseEnter={() => setActiveId(card.id)}
									onClick={() => setActiveId(card.id)}
									className={cn(
										"group relative w-full h-full rounded-3xl shadow-md p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer",
										isActive
											? "bg-primary text-primary-foreground"
											: "bg-card text-card-foreground border border-border/50",
									)}
								>
									{/* Dragon Watermark (Visible on hover and on the active card) */}
									<div
										className={cn(
											"absolute -top-3 -inset-e-3 size-40 pointer-events-none transition-all duration-500",
											isActive
												? "opacity-100 text-primary-foreground"
												: "opacity-0 text-primary/40",
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
												isActive ? "text-wallpaper" : "text-paragraph",
											)}
										>
											{card.description}
										</p>
									</div>

									{/* Bottom Image with Circular Arrow Action */}
									<div className="relative z-10 w-full aspect-4/3 rounded-2xl overflow-hidden mt-6 bg-muted">
										<Image
											src={card.image_url || "/images/why-choose/aesthetic-care.jpg"}
											alt={card.title}
											fill
											sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
											className="object-cover size-full transition-transform duration-500 group-hover:scale-105"
										/>

										{/* Circular Action Arrow Overlay */}
										<Link
											href={`/treatments/${card.slug}`}
											className="absolute bottom-3 inset-e-3 size-9 sm:size-10 rounded-full flex items-center justify-center bg-white/38 backdrop-blur-sm transition-all duration-300 shadow-sm text-primary"
											aria-label={card.title}
										>
											<ArrowRight className="size-4.5 -rotate-45 group-hover:rotate-0 rtl:rotate-180 transition-transform" />
										</Link>
									</div>
								</div>
							</div>
						);
					}}
				/>
			</div>
		</section>
	);
}

export default HealthcareOptionsSection;
