"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Minus, Plus, RotateCcw, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConsultationDrawer } from "@/components/consultation/consultation-drawer";
import { FallbackImage } from "@/components/shared/fallback-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppPagination from "@/components/shared/app-pagination";
import { TreatmentsSkeleton } from "./treatments-skeleton";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import type { ExploreOurTreatmentsSection } from "@/types/treatments";
import type { ServicesApiResponse } from "@/types/services";
import type {
	AnatomicalArea,
	AnatomicalAreasResponse,
} from "@/types/anatomical-areas";
import SectionHeader from "@/components/shared/section-header";

export interface TreatmentsContentProps {
	exploreSection?: ExploreOurTreatmentsSection;
	initialData?: ServicesApiResponse | null;
	initialAreas?: AnatomicalArea[] | null;
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
	initialAreas,
}: TreatmentsContentProps = {}) {
	const { t } = useTranslation();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;
	const currentSearchParam = searchParams.get("search") || "";
	const currentAreaId = searchParams.get("area_id") || "";
	const [searchInput, setSearchInput] = React.useState(currentSearchParam);
	const hasActiveFilters = Boolean(currentAreaId || currentSearchParam);

	// Synchronize when URL search param changes externally (e.g. back/forward)
	const [prevSearchParam, setPrevSearchParam] =
		React.useState(currentSearchParam);
	if (currentSearchParam !== prevSearchParam) {
		setPrevSearchParam(currentSearchParam);
		setSearchInput(currentSearchParam);
	}

	const { data: areasResponse, isLoading: isAreasLoading } =
		useFetchData<AnatomicalAreasResponse>({
			route: "/anatomical-areas",
			initialData: initialAreas
				? { key: "success", message: "success", data: initialAreas }
				: undefined,
		});

	const areas = areasResponse?.data ?? initialAreas ?? [];

	const {
		data: apiResponse,
		isLoading,
		isError,
	} = useFetchData<ServicesApiResponse>({
		route: "/services",
		params: {
			page: String(page),
			search: currentSearchParam || undefined,
			area_id: currentAreaId || undefined,
		},
		initialData:
			!currentSearchParam && !currentAreaId && page === 1
				? (initialData ?? undefined)
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

	const handleAreaSelect = (areaId?: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (areaId) {
			params.set("area_id", areaId);
		} else {
			params.delete("area_id");
		}
		params.delete("page"); // Reset to page 1 on filter change
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
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

	const clearAllFilters = () => {
		setSearchInput("");
		const params = new URLSearchParams(searchParams.toString());
		params.delete("search");
		params.delete("area_id");
		params.delete("page");
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="space-y-12 sm:space-y-16">
			{/* Top Section: Anatomical Focus Filter Bar */}
			{(areas.length > 0 || isAreasLoading) && (
				<section
					aria-label={t("treatments.anatomicalFocus")}
					className="rounded-3xl bg-primary/10 dark:bg-muted/30 p-4 border border-border/15 shadow-xs"
				>
					<p className="small font-semibold tracking-wider uppercase">
						{t("treatments.anatomicalFocus")}
					</p>
					<h3 className="h3 font-heading font-semibold text-primary mt-1 mb-5 sm:mb-6">
						{t("treatments.whereToStart")}
					</h3>

					<div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
						{isAreasLoading && areas.length === 0 && (
							<>
								{Array.from({ length: 7 }).map((_, i) => (
									<div
										key={i}
										className="h-9 w-20 rounded-full bg-white/70 dark:bg-card/70 animate-pulse"
									/>
								))}
							</>
						)}

						{areas.map((area) => {
							const isSelected = String(area.id) === currentAreaId;
							return (
								<button
									key={area.id}
									type="button"
									onClick={() =>
										handleAreaSelect(isSelected ? undefined : String(area.id))
									}
									className={cn(
										"rounded-full px-5 sm:px-6 py-2 small transition-all cursor-pointer select-none",
										isSelected
											? "bg-primary text-primary-foreground font-medium shadow-xs scale-[1.02]"
											: "bg-white dark:bg-card text-foreground/90 hover:text-primary hover:bg-white/90 font-medium shadow-2xs border border-transparent hover:border-primary/10",
									)}
								>
									{area.name}
								</button>
							);
						})}

						{hasActiveFilters && (
							<button
								type="button"
								onClick={clearAllFilters}
								className="rounded-full px-1 py-0.5 small font-medium transition-all cursor-pointer select-none inline-flex items-end gap-1.5 hover:text-destructive hover:underline"
							>
								<RotateCcw className="size-3.5" />
								<span>{t("treatments.resetButton")}</span>
							</button>
						)}
					</div>
				</section>
			)}

			{/* Main Section: Explore Our Treatments */}
			<section aria-label="Explore Our Treatments" className="w-full">
				{/* Section Header */}
				<SectionHeader
					subTitle={exploreSection?.tag_text }
					title={exploreSection?.headline || t("navbar.treatments")}
					desc={exploreSection?.description}
				/>

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
				{isLoading && services.length === 0 && <TreatmentsSkeleton count={4} />}

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
					<div className="rounded-2xl border border-border/60 bg-card p-12 text-center my-6 space-y-4">
						<p className="text-muted-foreground font-medium small">
							{t("treatments.empty")}
						</p>
						{hasActiveFilters && (
							<Button
								variant="outline"
								onClick={clearAllFilters}
								className="rounded-full small"
							>
								{t("treatments.resetButton")}
							</Button>
						)}
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
								DEFAULT_SERVICE_IMAGES[index % DEFAULT_SERVICE_IMAGES.length];

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
															{service.slug.replaceAll("-", " ")}
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
