import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { TreatmentsContent } from "@/components/treatments/treatments-content";
import StepsSection from "@/components/home/steps-section";
import { FooterCta } from "@/components/shared/footer-cta";
import { FadeIn } from "@/components/shared/fade-in";
import { fetchData, getSeoMetadata } from "@/lib/api";
import type { TreatmentsPageResponse } from "@/types/treatments";

export const instant = false;

interface PageProps {
	params: Promise<{ locale: string }>;
}

async function getTreatmentsPage(lang?: string) {
	try {
		const json = await fetchData<TreatmentsPageResponse>({
			route: "/pages/treatments",
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
	const page = await getTreatmentsPage(locale);
	return getSeoMetadata(
		page?.seo,
		page?.title || "العلاجات | Safe Health للرعاية الطبية والحلول الصحية"
	);
}

export default async function TreatmentsPage({ params }: PageProps) {
	const { locale } = await params;
	const page = await getTreatmentsPage(locale);
	const sections = page?.sections;
	const hero = sections?.["treatments-hero"];
	const exploreSection = sections?.["explore-our-treatments"];
	const journeySection = sections?.["treatment-journey"];
	const ctaData = sections?.["consultation-cta"];

	return (
		<main className="flex flex-col flex-1 overflow-x-clip">
			{hero && (
				<PageHeader
					badge={hero.tag_text || "OUR TREATMENTS"}
					title={hero.headline || "Specialized Treatments, Thoughtfully Delivered"}
					description={hero.description}
				/>
			)}

			<div className="container space-y-12 sm:space-y-16">
				<TreatmentsContent exploreSection={exploreSection} />

				{journeySection && (
					<FadeIn>
						<StepsSection data={journeySection} />
					</FadeIn>
				)}

				{ctaData && (
					<FadeIn>
						<FooterCta data={ctaData} />
					</FadeIn>
				)}
			</div>
		</main>
	);
}
