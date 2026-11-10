import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { FaqsList } from "@/components/faqs/faqs-list";
import { FaqsSkeleton } from "@/components/faqs/faqs-skeleton";
import { buildAlternates } from "@/lib/api";

export const instant = false;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	return {
		alternates: buildAlternates(locale, "/faqs"),
	};
}

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

