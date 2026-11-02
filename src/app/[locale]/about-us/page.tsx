import type { Metadata } from "next";
import { AboutIntro } from "@/components/about/about-intro";
import { AboutPhilosophy } from "@/components/about/about-philosophy";
import { AboutApproach } from "@/components/about/about-approach";
import { AboutExpertise } from "@/components/about/about-expertise";
import { AboutPersonalized } from "@/components/about/about-personalized";
import { TrustCirclesSection } from "@/components/home/trust-circles-section";
import { PageHeader } from "@/components/shared/page-header";
import { FooterCta } from "@/components/shared/footer-cta";
import { FadeIn } from "@/components/shared/fade-in";
import { fetchData, getSeoMetadata } from "@/lib/api";
import type { AboutPageResponse } from "@/types/about";

export const instant = false;

interface PageProps {
	params: Promise<{ locale: string }>;
}

async function getAboutPage(lang?: string) {
	try {
		const json = await fetchData<AboutPageResponse>({
			route: "/pages/about-us",
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
	const page = await getAboutPage(locale);
	return getSeoMetadata(page?.seo, page?.title);
}

export default async function AboutPage({ params }: PageProps) {
	const { locale } = await params;
	const page = await getAboutPage(locale);
	const sections = page?.sections;
	const hero = sections?.["about-hero"];
	const bottomFeatures = sections?.["global-reach"]?.bottom_feature_card;
	const ctaData = sections?.["consultation-cta"];

	return (
		<main className="flex flex-col flex-1 overflow-x-clip">
			{hero && (
				<PageHeader
					badge={hero.tag_text}
					title={hero.headline}
					description={hero.description}
				/>
			)}

			<div className="container space-y-5 sm:space-y-10 lg:space-y-16">
				{sections?.["about-overview"] && (
					<FadeIn>
						<AboutIntro data={sections["about-overview"]} />
					</FadeIn>
				)}

				{sections?.["guiding-philosophy"] && (
					<AboutPhilosophy data={sections["guiding-philosophy"]} />
				)}

				{sections?.["approach-to-care"] && (
					<FadeIn>
						<AboutApproach data={sections["approach-to-care"]} />
					</FadeIn>
				)}

				{sections?.["our-expertise"] && (
					<FadeIn>
						<AboutExpertise data={sections["our-expertise"]} />
					</FadeIn>
				)}

				{sections?.["global-reach"] && (
					<FadeIn>
						<AboutPersonalized data={sections["global-reach"]} />
					</FadeIn>
				)}

				{bottomFeatures && bottomFeatures.length > 0 && (
					<FadeIn>
						<TrustCirclesSection features={bottomFeatures} />
					</FadeIn>
				)}
			</div>

			{ctaData && (
				<div className="container mt-14">
					<FooterCta data={ctaData} />
				</div>
			)}
		</main>
	);
}
