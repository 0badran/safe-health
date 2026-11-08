import { Suspense } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { FaqsList } from "@/components/faqs/faqs-list";
import { FaqsSkeleton } from "@/components/faqs/faqs-skeleton";

export const instant = false;

export default function FaqsPage() {
	return (
		<main className="flex flex-col flex-1">
			<PageHeader
				badgeKey="faqs.badge"
				titleKey="faqs.title"
				descriptionKey="faqs.description"
			/>

			<div className="container mb-20">
				<Suspense fallback={<FaqsSkeleton count={6} />}>
					<FaqsList />
				</Suspense>
			</div>
		</main>
	);
}

