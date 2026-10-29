"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ListFilter, Loader2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import useFetchData from "@/hooks/use-fetch-data";
import type { CaseDropdownResponse } from "@/types/before-after";

export interface BeforeAfterFilterProps {
	className?: string;
}

export function BeforeAfterFilter({ className }: BeforeAfterFilterProps) {
	const { t } = useTranslation();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const { data: treatmentsRes, isLoading: isTreatmentsLoading } =
		useFetchData<CaseDropdownResponse>({
			route: "/cases/dropdowns/treatments",
		});
	const { data: locationsRes, isLoading: isLocationsLoading } =
		useFetchData<CaseDropdownResponse>({
			route: "/cases/dropdowns/locations",
		});

	const treatments = treatmentsRes?.data ?? [];
	const locations = locationsRes?.data ?? [];

	const initialSearch = searchParams.get("search") || "";
	const initialTreatment = searchParams.get("treatment") || "all";
	const initialLocation = searchParams.get("location") || "all";
	const initialSort = searchParams.get("sort") || "latest";

	const [search, setSearch] = React.useState(initialSearch);
	const [treatment, setTreatment] = React.useState(initialTreatment);
	const [location, setLocation] = React.useState(initialLocation);
	const [sort, setSort] = React.useState(initialSort);

	// Synchronize when URL search params change externally
	const [prevSearchParams, setPrevSearchParams] = React.useState(
		searchParams.toString(),
	);
	const currentParamsString = searchParams.toString();
	if (currentParamsString !== prevSearchParams) {
		setPrevSearchParams(currentParamsString);
		setSearch(searchParams.get("search") || "");
		setTreatment(searchParams.get("treatment") || "all");
		setLocation(searchParams.get("location") || "all");
		setSort(searchParams.get("sort") || "latest");
	}

	const hasActiveFilters = Boolean(
		search.trim() ||
		(treatment && treatment !== "all") ||
		(location && location !== "all") ||
		(sort && sort !== "latest"),
	);

	const updateFilters = (overrides?: {
		search?: string;
		treatment?: string;
		location?: string;
		sort?: string;
	}) => {
		const nextSearch =
			overrides?.search !== undefined ? overrides.search : search;
		const nextTreatment =
			overrides?.treatment !== undefined ? overrides.treatment : treatment;
		const nextLocation =
			overrides?.location !== undefined ? overrides.location : location;
		const nextSort = overrides?.sort !== undefined ? overrides.sort : sort;

		const params = new URLSearchParams();

		if (nextSearch.trim()) {
			params.set("search", nextSearch.trim());
		}
		if (nextTreatment && nextTreatment !== "all") {
			params.set("treatment", nextTreatment);
		}
		if (nextLocation && nextLocation !== "all") {
			params.set("location", nextLocation);
		}
		if (nextSort && nextSort !== "latest") {
			params.set("sort", nextSort);
		}

		params.set("page", "1");
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateFilters();
	};

	const handleReset = () => {
		setSearch("");
		setTreatment("all");
		setLocation("all");
		setSort("latest");
		router.push(pathname, { scroll: false });
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: "easeOut" }}
			className={cn(
				"w-full overflow-hidden bg-purple-tint/50 dark:bg-muted/30 rounded-3xl sm:rounded-4xl p-2.5 sm:p-4 lg:p-5 border border-white/15",
				className,
			)}
		>
			<form
				onSubmit={handleSubmit}
				className="w-full overflow-hidden bg-background rounded-2xl sm:rounded-3xl p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 items-center"
			>
				{/* Search Input (3 cols on lg) */}
				<div className="col-span-1 sm:col-span-2 lg:col-span-3 min-w-0">
					<Input
						variant="filter"
						placeholder={t("beforeAfter.searchPlaceholder")}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				{/* Treatment Dropdown (3 cols on lg) */}
				<div className="col-span-1 sm:col-span-1 lg:col-span-3 min-w-0">
					<Select
						value={treatment}
						onValueChange={(val) => {
							setTreatment(val);
							updateFilters({ treatment: val });
						}}
					>
						<SelectTrigger variant="filter">
							<SelectValue placeholder={t("beforeAfter.allTreatments")} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">{t("beforeAfter.allTreatments")}</SelectItem>
							{isTreatmentsLoading && treatments.length === 0 && (
								<div className="flex items-center justify-center gap-2 py-2.5 px-3 text-center small text-muted-foreground">
									<Loader2 className="size-3.5 animate-spin text-primary" />
									<span>{t("beforeAfter.loading")}</span>
								</div>
							)}
							{!isTreatmentsLoading && treatments.length === 0 && (
								<div className="py-2.5 px-3 text-center small text-muted-foreground">
									{t("beforeAfter.noTreatmentsFound")}
								</div>
							)}
							{treatments.map((item) => (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Location Clinic Dropdown (2 cols on lg) */}
				<div className="col-span-1 sm:col-span-1 lg:col-span-2 min-w-0">
					<Select
						value={location}
						onValueChange={(val) => {
							setLocation(val);
							updateFilters({ location: val });
						}}
					>
						<SelectTrigger variant="filter">
							<SelectValue placeholder={t("beforeAfter.allLocations")} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">{t("beforeAfter.allLocations")}</SelectItem>
							{isLocationsLoading && locations.length === 0 && (
								<div className="flex items-center justify-center gap-2 py-2.5 px-3 text-center small text-muted-foreground">
									<Loader2 className="size-3.5 animate-spin text-primary" />
									<span>{t("beforeAfter.loading")}</span>
								</div>
							)}
							{!isLocationsLoading && locations.length === 0 && (
								<div className="py-2.5 px-3 text-center small text-muted-foreground">
									{t("beforeAfter.noLocationsFound")}
								</div>
							)}
							{locations.map((item) => (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Sort Order Dropdown (2 cols on lg) */}
				<div className="col-span-1 sm:col-span-1 lg:col-span-2 min-w-0">
					<Select
						value={sort}
						onValueChange={(val) => {
							setSort(val);
							updateFilters({ sort: val });
						}}
					>
						<SelectTrigger variant="filter">
							<SelectValue placeholder={t("beforeAfter.sortLatest")} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="latest">{t("beforeAfter.sortLatest")}</SelectItem>
							<SelectItem value="oldest">{t("beforeAfter.sortOldest")}</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Filter & Reset Actions (2 cols on lg) */}
				<div className="col-span-1 sm:col-span-1 lg:col-span-2 flex items-center gap-2 min-w-0">
					<Button type="submit" className="flex-1 min-w-0">
						<ListFilter className="size-4 shrink-0" />
						<span className="truncate">{t("beforeAfter.filterButton")}</span>
					</Button>

					<AnimatePresence>
						{hasActiveFilters && (
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.15 }}
								className="shrink-0"
							>
								<Button
									type="button"
									variant="outline"
									onClick={handleReset}
									className="size-9 xl:size-10 p-0 rounded-xl shrink-0 cursor-pointer"
									title={t("beforeAfter.resetButton")}
									aria-label={t("beforeAfter.resetButton")}
								>
									<RotateCcw className="size-4" />
								</Button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</form>
		</motion.div>
	);
}

export default BeforeAfterFilter;
