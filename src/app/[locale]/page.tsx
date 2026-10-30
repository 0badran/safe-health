import type { Metadata } from "next";
import HeroSection from "@/components/home/hero";
import { HeroStatsBanner } from "@/components/home/hero/hero-stats-banner";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { RhinoplastySection } from "@/components/home/rhinoplasty-section";
import { HealthcareOptionsSection } from "@/components/home/healthcare-options-section";
import TeamSection from "@/components/home/team-section";
import { TrustCirclesSection } from "@/components/home/trust-circles-section";
import StepsSection from "@/components/home/steps-section";
import { FaqSection } from "@/components/home/faq-section";
import { BlogsSection } from "@/components/home/blogs-section";
import { FooterCta } from "@/components/shared/footer-cta";
import { FadeIn } from "@/components/shared/fade-in";
import { fetchData, getSeoMetadata } from "@/lib/api";
import type { HomePageResponse } from "@/types/home";

export const instant = false;

async function getHomePage() {
	try {
		const json = await fetchData<HomePageResponse>({
			route: "/pages/home",
		});
		return json?.data || null;
	} catch {
		return null;
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getHomePage();
	return getSeoMetadata(page?.seo);
}

export default async function HomePage() {
	const page = await getHomePage();
	const sections = page?.sections;

	return (
		<main className="flex flex-col flex-1 w-full space-y-6 sm:space-y-5">
			<HeroSection data={sections?.["home-hero"]} />

			<div className="container relative z-10 lg:-mt-28">
				<FadeIn delay={0.15} className="w-fit max-lg:mx-auto lg:w-1/2">
					<HeroStatsBanner
						title={sections?.["home-hero"]?.headline}
						stats={sections?.["stats-section"]?.stat_card}
					/>
				</FadeIn>
			</div>

			<div className="container space-y-14 sm:space-y-18 lg:space-y-25">
				<FadeIn>
					<WhyChooseSection data={sections?.["why-choose-us"]} />
				</FadeIn>

				<FadeIn>
					<RhinoplastySection data={sections?.["core-specialty"]} />
				</FadeIn>

				<FadeIn>
					<HealthcareOptionsSection data={sections?.["healthcare-options"]} />
				</FadeIn>

				<FadeIn>
					<TeamSection data={sections?.["home-doctors"]} />
				</FadeIn>

				<FadeIn>
					<TrustCirclesSection
						features={sections?.["home-doctors"]?.feature_card}
					/>
				</FadeIn>

				<FadeIn>
					<StepsSection data={sections?.["patient-journey"]} />
				</FadeIn>

				<FadeIn>
					<FaqSection data={sections?.["faq-section"]} />
				</FadeIn>

				<FadeIn>
					<BlogsSection data={sections?.["home-blogs"]} />
				</FadeIn>
			</div>

			{sections?.["consultation-cta"] && (
				<div className="container">
					<FooterCta data={sections["consultation-cta"]} />
				</div>
			)}
		</main>
	);
}
