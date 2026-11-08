"use client";

import { useSearchParams } from "next/navigation";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqsSkeleton } from "@/components/faqs/faqs-skeleton";
import AppPagination from "@/components/shared/app-pagination";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import type { FaqsApiResponse } from "@/types/faqs";

export function FaqsList() {
	const { t } = useTranslation();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;

	const {
		data: apiResponse,
		isLoading,
		isError,
	} = useFetchData<FaqsApiResponse>({
		route: "/faqs",
		params: {
			page: String(page),
			per_page: "15",
		},
	});

	const faqs = apiResponse?.data ?? [];
	const last_page = apiResponse?.pagination?.meta?.last_page ?? 1;

	return (
		<div id="faqs-list" className="w-full max-w-4xl mx-auto">
			{/* Loading State */}
			{isLoading && <FaqsSkeleton count={6} />}

			{/* Error State */}
			{!isLoading && isError && (
				<div className="text-center py-16 space-y-3">
					<p className="text-destructive font-medium small">
						{t("faqs.errorLoading")}
					</p>
				</div>
			)}

			{/* Empty State */}
			{!isLoading && !isError && faqs.length === 0 && (
				<div className="text-center py-16 space-y-3">
					<p className="text-muted-foreground small">{t("faqs.emptyFaqs")}</p>
				</div>
			)}

			{/* Success State: Accordion Cards */}
			{!isLoading && !isError && faqs.length > 0 && (
				<Accordion
					type="single"
					collapsible
					defaultValue={String(faqs[0].id)}
					variant="cards"
				>
					{faqs.map((faq) => (
						<AccordionItem
							key={faq.id}
							value={String(faq.id)}
							variant="card"
						>
							<AccordionTrigger variant="card" iconVariant="plus">
								<span className="flex items-center gap-4 sm:gap-6">
									<span className="font-heading h3 text-primary shrink-0 w-8 sm:w-10">
										{faq.number}
									</span>
									<span className="text-primary h5 leading-snug">
										{faq.question}
									</span>
								</span>
							</AccordionTrigger>
							<AccordionContent variant="card">
								<div className="ps-12 sm:ps-16 h6">{faq.answer}</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			)}

			{/* Pagination Control */}
			{!isLoading && !isError && <AppPagination last_page={last_page} />}
		</div>
	);
}

export default FaqsList;

