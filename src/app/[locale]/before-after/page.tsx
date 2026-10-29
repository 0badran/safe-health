import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { BeforeAfterList } from "@/components/before-after/before-after-list";
import { BeforeAfterSkeleton } from "@/components/before-after/before-after-skeleton";
import { FooterCta } from "@/components/shared/footer-cta";
import { fetchData, getSeoMetadata } from "@/lib/api";
import type { BeforeAfterPageResponse } from "@/types/before-after";

export const instant = false;

interface PageProps {
	params: Promise<{ locale: string }>;
}

async function getBeforeAfterPage(lang?: string) {
	try {
		const json = await fetchData<BeforeAfterPageResponse>({
			route: "/pages/before-after",
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
	const page = await getBeforeAfterPage(locale);
	return getSeoMetadata(page?.seo, page?.title);
}

export default async function BeforeAfterPage({ params }: PageProps) {
	const { locale } = await params;
	const page = await getBeforeAfterPage(locale);
	const sections = page?.sections;
	const hero = sections?.["before-after-hero"];
	const ctaData = sections?.["consultation-cta"];

	return (
		<main className="flex flex-col flex-1">
			{hero && (
				<PageHeader
					badge={hero.tag_text}
					title={hero.headline}
					description={hero.description}
				/>
			)}

			<div className="container mb-20">
				<Suspense fallback={<BeforeAfterSkeleton count={6} />}>
					<BeforeAfterList />
				</Suspense>
			</div>

			{ctaData && (
				<div className="container">
					<FooterCta data={ctaData} />
				</div>
			)}
		</main>
	);
}
