import type { Metadata } from "next";
import { Suspense } from "react";
import { CaseDetailContent } from "@/components/before-after/case-detail-content";
import { CaseDetailSkeleton } from "@/components/before-after/case-detail-skeleton";
import { fetchData, getSeoMetadata } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type { CaseItem } from "@/types/before-after";

export const instant = false;

interface PageProps {
	params: Promise<{ locale: string; slug: string }>;
}

async function getCase(slug: string, lang?: string) {
	try {
		const json = await fetchData<ApiResponse<CaseItem>>({
			route: `/cases/${slug}`,
			lang,
		});
		return json?.data || null;
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug, locale } = await params;
	const caseItem = await getCase(slug, locale);

	return getSeoMetadata(null, {
		title: caseItem?.title,
		description: caseItem?.description_preview,
	});
}

export default async function CaseDetailPage({ params }: PageProps) {
	const { slug, locale } = await params;
	const caseItem = await getCase(slug, locale);

	return (
		<Suspense fallback={<CaseDetailSkeleton />}>
			<CaseDetailContent slug={slug} initialCase={caseItem} />
		</Suspense>
	);
}

