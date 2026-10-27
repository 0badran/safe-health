"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Calendar, ListFilter, RotateCcw, Search } from "lucide-react";
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

export interface BlogsFilterProps {
	className?: string;
}

export function BlogsFilter({ className }: BlogsFilterProps) {
	const { t } = useTranslation();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const initialSearch = searchParams.get("search") || "";
	const initialPublishedAfter = searchParams.get("published_after") || "";
	const initialPublishedBefore = searchParams.get("published_before") || "";
	const initialSort = searchParams.get("sort") || "latest";

	const [search, setSearch] = React.useState(initialSearch);
	const [published_after, setPublishedAfter] = React.useState(
		initialPublishedAfter,
	);
	const [published_before, setPublishedBefore] = React.useState(
		initialPublishedBefore,
	);
	const [sort, setSort] = React.useState(initialSort);

	// Synchronize when URL search params change externally (e.g. back/forward navigation)
	const [prevSearchParams, setPrevSearchParams] = React.useState(
		searchParams.toString(),
	);
	const currentParamsString = searchParams.toString();
	if (currentParamsString !== prevSearchParams) {
		setPrevSearchParams(currentParamsString);
		setSearch(searchParams.get("search") || "");
		setPublishedAfter(searchParams.get("published_after") || "");
		setPublishedBefore(searchParams.get("published_before") || "");
		setSort(searchParams.get("sort") || "latest");
	}

	const hasActiveFilters = Boolean(
		search ||
		published_after ||
		published_before ||
		(sort && sort !== "latest"),
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams();

		if (search.trim()) {
			params.set("search", search.trim());
		}
		if (published_after) {
			params.set("published_after", published_after);
		}
		if (published_before) {
			params.set("published_before", published_before);
		}
		if (sort && sort !== "latest") {
			params.set("sort", sort);
		}

		params.set("page", "1");
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const handleReset = () => {
		setSearch("");
		setPublishedAfter("");
		setPublishedBefore("");
		setSort("latest");
		router.push(pathname, { scroll: false });
	};

	return (
		<div
			className={cn(
				"w-full bg-purple-tint/50 dark:bg-muted/30 rounded-3xl sm:rounded-4xl p-2.5 sm:p-4 lg:p-5 border border-white/15",
				className,
			)}
		>
			<form
				onSubmit={handleSubmit}
				className="w-full bg-background rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 items-center"
			>
				{/* Search Input (4 cols on lg) */}
				<div className="col-span-1 sm:col-span-2 lg:col-span-4 relative flex items-center min-w-0">
					<Search className="absolute inset-s-3.5 size-4 text-muted-foreground pointer-events-none shrink-0 z-10" />
					<Input
						variant="filter"
						placeholder={t("blogs.searchPlaceholder")}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="ps-10 rtl:ps-10 w-full"
					/>
				</div>

				{/* Published After / Start Date (2 cols on lg) */}
				<div className="col-span-1 sm:col-span-1 lg:col-span-2 relative flex items-center min-w-0">
					<Calendar className="absolute inset-s-3.5 size-4 text-muted-foreground pointer-events-none shrink-0 z-10" />
					<Input
						type="date"
						variant="filter"
						value={published_after}
						onChange={(e) => setPublishedAfter(e.target.value)}
						title={t("blogs.publishedAfter")}
						aria-label={t("blogs.publishedAfter")}
						className="ps-10 rtl:ps-10 w-full text-xs text-foreground cursor-pointer"
					/>
				</div>

				{/* Published Before / End Date (2 cols on lg) */}
				<div className="col-span-1 sm:col-span-1 lg:col-span-2 relative flex items-center min-w-0">
					<Calendar className="absolute inset-s-3.5 size-4 text-muted-foreground pointer-events-none shrink-0 z-10" />
					<Input
						type="date"
						variant="filter"
						value={published_before}
						onChange={(e) => setPublishedBefore(e.target.value)}
						title={t("blogs.publishedBefore")}
						aria-label={t("blogs.publishedBefore")}
						className="ps-10 rtl:ps-10 w-full text-xs text-foreground cursor-pointer"
					/>
				</div>

				{/* Sort Dropdown (2 cols on lg) */}
				<div className="col-span-1 sm:col-span-1 lg:col-span-2 min-w-0">
					<Select value={sort} onValueChange={setSort}>
						<SelectTrigger variant="filter">
							<SelectValue placeholder={t("blogs.sortLabel")} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="latest">{t("blogs.sortLatest")}</SelectItem>
							<SelectItem value="oldest">{t("blogs.sortOldest")}</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Filter & Reset Actions (2 cols on lg) */}
				<div className="col-span-1 sm:col-span-1 lg:col-span-2 flex items-center gap-2">
					<Button type="submit" className="flex-1 min-w-0">
						<ListFilter className="size-4" />
						<span>{t("blogs.filterButton")}</span>
					</Button>

					{hasActiveFilters && (
						<Button
							type="button"
							variant="outline"
							onClick={handleReset}
							className="size-8 md:size-9 xl:size-11 p-0 rounded-xl shrink-0"
							title={t("blogs.resetButton")}
							aria-label={t("blogs.resetButton")}
						>
							<RotateCcw className="size-4" />
						</Button>
					)}
				</div>
			</form>
		</div>
	);
}

export default BlogsFilter;
