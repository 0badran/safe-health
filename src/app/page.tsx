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

export default function Home() {
	return (
		<main className="flex flex-col flex-1 w-full space-y-6 sm:space-y-5">
			<HeroSection />

			<div className="container relative z-10 lg:-translate-y-16">
				<FadeIn delay={0.15} className="w-fit max-lg:mx-auto lg:w-1/2">
					<HeroStatsBanner />
				</FadeIn>
			</div>

			<div className="container space-y-14 sm:space-y-18 lg:space-y-25">
				<FadeIn>
					<WhyChooseSection />
				</FadeIn>

				<FadeIn>
					<RhinoplastySection />
				</FadeIn>

				<FadeIn>
					<HealthcareOptionsSection />
				</FadeIn>

				<FadeIn>
					<TeamSection />
				</FadeIn>

				<FadeIn>
					<TrustCirclesSection />
				</FadeIn>

				<FadeIn>
					<StepsSection />
				</FadeIn>

				<FadeIn>
					<FaqSection />
				</FadeIn>

				<FadeIn>
					<BlogsSection />
				</FadeIn>
			</div>
		</main>
	);
}
