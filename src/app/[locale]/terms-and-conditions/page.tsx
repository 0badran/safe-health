import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LegalContent } from "@/components/legal/legal-content";
import { LegalSkeleton } from "@/components/legal/legal-skeleton";
import { fetchData, getSeoMetadata } from "@/lib/api";
import type { LegalPageResponse } from "@/types/legal";

export const instant = false;

interface PageProps {
	params: Promise<{ locale: string }>;
}

async function getTermsPage(lang?: string) {
	try {
		const json = await fetchData<LegalPageResponse>({
			route: "/pages/terms-and-conditions",
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
	const { locale } = await params;
	const page = await getTermsPage(locale);
	return getSeoMetadata(page?.seo, page?.title);
}

export default async function TermsAndConditionsPage({ params }: PageProps) {
	const { locale } = await params;
	const page = await getTermsPage(locale);

	if (!page) {
		notFound();
	}

	const content =
		page.sections?.["terms-and-conditions-content"]?.content || "";

	return (
		<Suspense fallback={<LegalSkeleton />}>
			<LegalContent title={page.title} content={content} />
		</Suspense>
	);
}

