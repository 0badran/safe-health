"use client";
import HeroSection from "@/components/home/hero";
import StepsSection from "@/components/home/steps-section";
import TeamSection from "@/components/home/team-section";

import { BlogsSection } from "@/components/home/blogs-section";
import { FaqSection } from "@/components/home/faq-section";
import { HealthcareOptionsSection } from "@/components/home/healthcare-options-section";
import { RhinoplastySection } from "@/components/home/rhinoplasty-section";
import { TrustCirclesSection } from "@/components/home/trust-circles-section";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { HeroStatsBanner } from "@/components/home/hero/hero-stats-banner";
import { FadeIn } from "@/components/shared/fade-in";
import useFetchPages from "@/hooks/use-fetch-pages";
import type { HomePageResponse } from "@/types/home";

export default function Home() {
	const { data } = useFetchPages<HomePageResponse>("home");
	const sections = data?.data?.sections;

	return (
		<main className="flex flex-col flex-1 w-full space-y-6 sm:space-y-5">
			<HeroSection data={sections?.["home-hero"]} />

			<div className="container relative z-10 lg:-translate-y-16">
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
		</main>
	);
}
