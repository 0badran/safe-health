"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionBadge } from "@/components/shared/section-badge";
import { ConsultationDrawer } from "@/components/consultation/consultation-drawer";
import {
	ANATOMICAL_FILTERS,
	AnatomicalFilter,
	TREATMENT_CATEGORIES,
} from "./treatments-data";
import type { ExploreOurTreatmentsSection } from "@/types/treatments";

export interface TreatmentsContentProps {
	exploreSection?: ExploreOurTreatmentsSection;
}

export function TreatmentsContent({ exploreSection }: TreatmentsContentProps = {}) {
	const [selectedFilter, setSelectedFilter] = useState<AnatomicalFilter>("Nose");
	const [expandedId, setExpandedId] = useState<string | null>("plastic-surgery");

	const handleFilterSelect = (filter: AnatomicalFilter) => {
		setSelectedFilter(filter);
		// Auto-expand the first treatment matching the selected anatomical filter if current expanded doesn't match
		const currentCategory = TREATMENT_CATEGORIES.find(
			(cat) => cat.id === expandedId
		);
		if (!currentCategory || !currentCategory.anatomicalFocus.includes(filter)) {
			const matchingCategory = TREATMENT_CATEGORIES.find((cat) =>
				cat.anatomicalFocus.includes(filter)
			);
			if (matchingCategory) {
				setExpandedId(matchingCategory.id);
			}
		}
	};

	const toggleCategory = (id: string) => {
		setExpandedId((prev) => (prev === id ? null : id));
	};

	return (
		<div className="space-y-12 sm:space-y-16">
			{/* Top Section: Anatomical Focus Filter Bar */}
			<section
				aria-label="Anatomical Focus"
				className="rounded-3xl bg-primary/10 p-6 sm:p-8 lg:p-9 border border-primary/5 shadow-xs"
			>
				<p className="small font-semibold tracking-wider text-muted-foreground uppercase">
					ANATOMICAL FOCUS
				</p>
				<h3 className="h3 font-heading font-medium text-primary mt-1 mb-5 sm:mb-6">
					Where Would You Like to Start?
				</h3>

				<div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
					{ANATOMICAL_FILTERS.map((filter) => {
						const isSelected = selectedFilter === filter;
						return (
							<button
								key={filter}
								type="button"
								onClick={() => handleFilterSelect(filter)}
								className={cn(
									"rounded-full px-5 py-2 small transition-all cursor-pointer select-none",
									isSelected
										? "bg-primary text-primary-foreground font-semibold shadow-xs scale-[1.02]"
										: "bg-card text-muted-foreground border border-border/80 hover:border-primary/40 hover:text-foreground font-medium"
								)}
							>
								{filter}
							</button>
						);
					})}
				</div>
			</section>

			{/* Main Section: Explore Our Treatments */}
			<section aria-label="Explore Our Treatments" className="w-full">
				{/* Section Header */}
				<div className="flex flex-col items-start gap-3 sm:gap-4 mb-8 sm:mb-12">
					<SectionBadge>
						{exploreSection?.tag_text || "EXPLORE OUR TREATMENTS"}
					</SectionBadge>
					<h2 className="text-heading text-start">
						{exploreSection?.headline || "A World of Possibilities, Tailored to You."}
					</h2>
					<p className="text-paragraph h5 max-w-3xl leading-relaxed text-start">
						{exploreSection?.description ||
							"Explore our range of aesthetic treatment categories and discover the procedures available to support your individual goals."}
					</p>
				</div>

				{/* Accordion Categories List */}
				<div className="divide-y divide-border/60">
					{TREATMENT_CATEGORIES.map((item) => {
						const isExpanded = expandedId === item.id;
						const isHighlighted = item.anatomicalFocus.includes(selectedFilter);

						return (
							<div
								key={item.id}
								className={cn(
									"py-5 sm:py-7 transition-colors",
									isHighlighted && !isExpanded && "bg-primary/1.5"
								)}
							>
								{/* Category Header Row */}
								<button
									type="button"
									onClick={() => toggleCategory(item.id)}
									aria-expanded={isExpanded}
									className="w-full flex items-center justify-between text-start gap-4 sm:gap-6 group cursor-pointer select-none"
								>
									<div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
										<span className="font-heading font-medium text-2xl sm:text-3xl text-primary shrink-0 w-8 sm:w-10">
											{item.number}
										</span>
										<span className="font-heading font-bold text-2xl sm:text-3xl text-primary transition-colors group-hover:text-primary/80">
											{item.title}
										</span>
										<span className="hidden md:inline-block small font-semibold tracking-wider text-muted-foreground uppercase ps-3">
											{item.tagline}
										</span>
									</div>

									{/* Toggle Icon Button */}
									<div
										className={cn(
											"size-8 sm:size-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
											isExpanded
												? "bg-primary text-primary-foreground shadow-xs"
												: "bg-primary/10 text-primary hover:bg-primary/20 group-hover:bg-primary/15"
										)}
									>
										{isExpanded ? (
											<Minus className="size-4 sm:size-4.5" />
										) : (
											<Plus className="size-4 sm:size-4.5" />
										)}
									</div>
								</button>

								{/* Mobile Tagline */}
								<p className="md:hidden small font-semibold tracking-wider text-muted-foreground uppercase mt-1 ps-12">
									{item.tagline}
								</p>

								{/* Expanded Card Content */}
								{isExpanded && (
									<div className="mt-6 rounded-3xl border border-primary/10 bg-card p-6 sm:p-8 lg:p-10 shadow-xs animate-in fade-in-50 zoom-in-[0.99] duration-300">
										<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
											{/* Left Column: Details & Procedures */}
											<div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
												<span className="small font-semibold px-3.5 py-1 rounded-full bg-muted text-muted-foreground tracking-wider uppercase w-fit">
													{item.discipline}
												</span>

												<p className="text-paragraph small sm:text-base leading-relaxed">
													{item.description}
												</p>

												<div>
													<p className="small font-bold uppercase tracking-wider text-muted-foreground mb-3">
														SPECIALIZED PROCEDURES:
													</p>
													<div className="flex flex-wrap gap-2 sm:gap-2.5">
														{item.procedures.map((procedure) => (
															<span
																key={procedure}
																className="rounded-full px-4 py-2 small font-medium bg-muted/60 text-primary border border-primary/10 hover:border-primary/30 transition-colors"
															>
																{procedure}
															</span>
														))}
													</div>
												</div>

												{/* Action & Credential Footer */}
												<div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-3">
													<ConsultationDrawer
														variant="default"
														withArrow
														className="m-0 rounded-full px-6 py-2.5 shadow-xs"
													>
														Get A Consultation
													</ConsultationDrawer>

													<div className="flex items-center gap-2 small text-muted-foreground font-medium">
														<CheckCircle2 className="size-4 text-primary shrink-0" />
														<span>{item.credential}</span>
													</div>
												</div>
											</div>

											{/* Right Column: Hero Visual Card */}
											<div className="lg:col-span-5">
												<div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-xs border border-border/40 bg-muted">
													<Image
														src={item.image}
														alt={item.title}
														fill
														sizes="(max-width: 1024px) 100vw, 40vw"
														className="object-cover"
													/>

													{/* Floating Glassmorphic Badges */}
													<div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-center justify-between gap-2 pointer-events-none">
														<span className="bg-background/85 backdrop-blur-md text-foreground small font-medium px-3.5 py-1.5 rounded-full border border-border/40 shadow-xs">
															{item.badge1}
														</span>
														<span className="bg-primary/80 backdrop-blur-md text-primary-foreground small font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-xs uppercase tracking-wider">
															{item.badge2}
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}

export const ServicesContent = TreatmentsContent;
export default TreatmentsContent;
