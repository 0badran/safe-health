"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Minus, Plus, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionBadge } from "@/components/shared/section-badge";
import { ConsultationDrawer } from "@/components/consultation/consultation-drawer";
import { FallbackImage } from "@/components/shared/fallback-image";
import { Input } from "@/components/ui/input";
import AppPagination from "@/components/shared/app-pagination";
import { TreatmentsSkeleton } from "./treatments-skeleton";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import type { ExploreOurTreatmentsSection } from "@/types/treatments";
import type { ServicesApiResponse } from "@/types/services";

export interface TreatmentsContentProps {
	exploreSection?: ExploreOurTreatmentsSection;
	initialData?: ServicesApiResponse | null;
}

const DEFAULT_SERVICE_IMAGES = [
	"/images/treatments-plastic-surgery.jpg",
	"/images/why-choose/aesthetic-care.jpg",
	"/images/rhinoplasty.png",
	"/images/why-choose/patient-focus.png",
];

export function TreatmentsContent({
	exploreSection,
	initialData,
}: TreatmentsContentProps = {}) {
	const { t } = useTranslation();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;
	const initialSearch = searchParams.get("search") || "";
	const [searchInput, setSearchInput] = React.useState(initialSearch);

	// Synchronize when URL search param changes externally (e.g. back/forward)
	const currentSearchParam = searchParams.get("search") || "";
	const [prevSearchParam, setPrevSearchParam] = React.useState(currentSearchParam);
	if (currentSearchParam !== prevSearchParam) {
		setPrevSearchParam(currentSearchParam);
		setSearchInput(currentSearchParam);
	}

	const {
		data: apiResponse,
		isLoading,
		isError,
	} = useFetchData<ServicesApiResponse>({
		route: "/services",
		params: {
			page: String(page),
			search: currentSearchParam || undefined,
		},
		initialData:
			!currentSearchParam && page === 1
				? initialData ?? undefined
				: undefined,
	});

	const services = (apiResponse?.data ?? []).filter(
		(service) => service.is_active !== false,
	);
	const last_page = apiResponse?.pagination?.meta?.last_page ?? 1;

	const [expandedId, setExpandedId] = React.useState<number | null>(null);

	// Auto-expand the first service once loaded if none is expanded
	if (expandedId === null && services.length > 0) {
		setExpandedId(services[0].id);
	}

	const toggleCategory = (id: number) => {
		setExpandedId((prev) => (prev === id ? null : id));
	};

	// Debounce or commit search to URL
	React.useEffect(() => {
		const timer = setTimeout(() => {
			const trimmed = searchInput.trim();
			if (trimmed !== currentSearchParam) {
				const params = new URLSearchParams(searchParams.toString());
				if (trimmed) {
					params.set("search", trimmed);
				} else {
					params.delete("search");
				}
				params.delete("page"); // Reset to page 1 on search
				router.push(`${pathname}?${params.toString()}`, { scroll: false });
			}
		}, 350);

		return () => clearTimeout(timer);
	}, [searchInput, currentSearchParam, searchParams, pathname, router]);

	const clearSearch = () => {
		setSearchInput("");
		const params = new URLSearchParams(searchParams.toString());
		params.delete("search");
		params.delete("page");
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="space-y-12 sm:space-y-16">
			{/* Main Section: Explore Our Treatments */}
			<section aria-label="Explore Our Treatments" className="w-full">
				{/* Section Header */}
				<div className="flex flex-col items-start gap-3 sm:gap-4 mb-8 sm:mb-10">
					<SectionBadge>
						{exploreSection?.tag_text || t("navbar.treatments")}
					</SectionBadge>
					<h2 className="text-heading text-start">
						{exploreSection?.headline || t("navbar.treatments")}
					</h2>
					{exploreSection?.description && (
						<p className="text-paragraph h5 max-w-3xl leading-relaxed text-start">
							{exploreSection.description}
						</p>
					)}
				</div>

				{/* Search Bar */}
				<div className="relative max-w-md w-full mb-8">
					<Search className="absolute inset-s-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
					<Input
						type="text"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder={t("treatments.searchPlaceholder")}
						className="ps-10 pe-9 rounded-xl bg-card border-border/80 small"
					/>
					{searchInput && (
						<button
							type="button"
							onClick={clearSearch}
							className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-sm"
							aria-label="Clear search"
						>
							<X className="size-4" />
						</button>
					)}
				</div>

				{/* Loading Skeleton */}
				{isLoading && services.length === 0 && (
					<TreatmentsSkeleton count={4} />
				)}

				{/* Error State */}
				{!isLoading && isError && (
					<div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-8 text-center my-6">
						<p className="text-destructive font-medium small">
							{t("treatments.errorLoading")}
						</p>
					</div>
				)}

				{/* Empty State */}
				{!isLoading && !isError && services.length === 0 && (
					<div className="rounded-2xl border border-border/60 bg-card p-12 text-center my-6">
						<p className="text-muted-foreground font-medium small">
							{t("treatments.empty")}
						</p>
					</div>
				)}

				{/* Accordion Categories List */}
				{services.length > 0 && (
					<div className="divide-y divide-border/60">
						{services.map((service, index) => {
							const isExpanded = expandedId === service.id;
							const formattedNumber = String(
								(page - 1) * 15 + index + 1,
							).padStart(2, "0");
							const fallbackImage =
								DEFAULT_SERVICE_IMAGES[
									index % DEFAULT_SERVICE_IMAGES.length
								];

							return (
								<div
									key={service.id}
									className="py-5 sm:py-7 transition-colors"
								>
									{/* Category Header Row */}
									<button
										type="button"
										onClick={() => toggleCategory(service.id)}
										aria-expanded={isExpanded}
										className="w-full flex items-center justify-between text-start gap-4 sm:gap-6 group cursor-pointer select-none"
									>
										<div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
											<span className="font-heading font-medium text-2xl sm:text-3xl text-primary shrink-0 w-8 sm:w-10">
												{formattedNumber}
											</span>
											<span className="font-heading font-bold text-2xl sm:text-3xl text-primary transition-colors group-hover:text-primary/80">
												{service.title}
											</span>
										</div>

										{/* Toggle Icon Button */}
										<div
											className={cn(
												"size-8 sm:size-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
												isExpanded
													? "bg-primary text-primary-foreground shadow-xs"
													: "bg-primary/10 text-primary hover:bg-primary/20 group-hover:bg-primary/15",
											)}
										>
											{isExpanded ? (
												<Minus className="size-4 sm:size-4.5" />
											) : (
												<Plus className="size-4 sm:size-4.5" />
											)}
										</div>
									</button>

									{/* Expanded Card Content */}
									{isExpanded && (
										<div className="mt-6 rounded-3xl border border-primary/10 bg-card p-6 sm:p-8 lg:p-10 shadow-xs animate-in fade-in-50 zoom-in-[0.99] duration-300">
											<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
												{/* Left Column: Details & Sub-services */}
												<div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
													{service.slug && (
														<span className="small font-semibold px-3.5 py-1 rounded-full bg-muted text-muted-foreground tracking-wider uppercase w-fit">
															{service.slug.replace(/-/g, " ")}
														</span>
													)}

													{service.description && (
														<p className="text-paragraph small sm:text-base leading-relaxed">
															{service.description}
														</p>
													)}

													{service.sub_services &&
														service.sub_services.length > 0 && (
															<div>
																<p className="small font-bold uppercase tracking-wider text-muted-foreground mb-3">
																	{t("treatments.subServices")}:
																</p>
																<div className="flex flex-wrap gap-2 sm:gap-2.5">
																	{service.sub_services.map((sub) => (
																		<span
																			key={sub}
																			className="rounded-full px-4 py-2 small font-medium bg-muted/60 text-primary border border-primary/10 hover:border-primary/30 transition-colors"
																		>
																			{sub}
																		</span>
																	))}
																</div>
															</div>
														)}

													{/* Action Consultation Drawer */}
													<div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-3">
														<ConsultationDrawer
															variant="default"
															withArrow
															serviceId={service.id}
															treatment={service.title}
															className="m-0 rounded-full px-6 py-2.5 shadow-xs"
														>
															{t("navbar.getConsultation")}
														</ConsultationDrawer>
													</div>
												</div>

												{/* Right Column: Hero Visual Card */}
												<div className="lg:col-span-5">
													<div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-xs border border-border/40 bg-muted">
														<FallbackImage
															src={service.image_url}
															fallbackSrc={fallbackImage}
															alt={service.title}
															fill
															sizes="(max-width: 1024px) 100vw, 40vw"
															className="object-cover"
														/>

														{/* Floating Glassmorphic Badges */}
														<div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-center justify-between gap-2 pointer-events-none z-10">
															<span className="bg-background/85 backdrop-blur-md text-foreground small font-medium px-3.5 py-1.5 rounded-full border border-border/40 shadow-xs truncate max-w-[60%]">
																{service.title}
															</span>
															{service.sub_services &&
																service.sub_services.length > 0 && (
																	<span className="bg-primary/80 backdrop-blur-md text-primary-foreground small font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-xs uppercase tracking-wider shrink-0">
																		{service.sub_services.length}{" "}
																		{t("treatments.subServices")}
																	</span>
																)}
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
				)}

				{/* Pagination Control */}
				{!isLoading && !isError && last_page > 1 && (
					<div className="pt-8">
						<AppPagination last_page={last_page} />
					</div>
				)}
			</section>
		</div>
	);
}

export const ServicesContent = TreatmentsContent;
export default TreatmentsContent;
