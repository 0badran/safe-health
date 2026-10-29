"use client";

import AppPagination from "@/components/shared/app-pagination";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import type { CasesApiResponse } from "@/types/before-after";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { BeforeAfterCard } from "./before-after-card";
import { BeforeAfterFilter } from "./before-after-filter";
import { BeforeAfterSkeleton } from "./before-after-skeleton";

export function BeforeAfterList() {
	const { t } = useTranslation();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;
	const search = searchParams.get("search") || undefined;
	const treatment = searchParams.get("treatment") || undefined;
	const location = searchParams.get("location") || undefined;
	const sort = searchParams.get("sort") || undefined;

	const {
		data: apiResponse,
		isLoading,
		isError,
	} = useFetchData<CasesApiResponse>({
		route: "/cases",
		params: {
			page: String(page),
			search,
			treatment,
			location,
			sort,
		},
	});

	const cases = apiResponse?.data ?? [];
	const last_page = apiResponse?.pagination?.meta?.last_page ?? 1;

	return (
		<div id="before-after-list" className="w-full">
			{/* Filter Section */}
			<div className="mb-10">
				<BeforeAfterFilter />
			</div>

			<AnimatePresence mode="wait">
				{/* Loading State */}
				{isLoading && (
					<motion.div
						key="loading"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<BeforeAfterSkeleton count={6} />
					</motion.div>
				)}

				{/* Error State */}
				{!isLoading && isError && (
					<motion.div
						key="error"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.25 }}
						className="text-center py-16 space-y-3"
					>
						<p className="text-destructive font-medium small">
							{t("beforeAfter.errorLoading")}
						</p>
					</motion.div>
				)}

				{/* Empty State */}
				{!isLoading && !isError && cases.length === 0 && (
					<motion.div
						key="empty"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.25 }}
						className="text-center py-16 space-y-3"
					>
						<p className="text-muted-foreground small">
							{t("beforeAfter.emptyCases")}
						</p>
					</motion.div>
				)}

				{/* Cases Grid */}
				{!isLoading && !isError && cases.length > 0 && (
					<motion.div
						key="grid"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="space-y-12"
					>
						<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
							{cases.map((item) => (
								<BeforeAfterCard key={item.id} caseItem={item} />
							))}
						</section>

						{/* Pagination Controls */}
						{last_page > 1 && <AppPagination last_page={last_page} />}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default BeforeAfterList;

