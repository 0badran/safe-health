import HeroSection from "@/components/home/hero";
import StepsSection from "@/components/home/steps-section";
import TeamSection from "@/components/home/team-section";

import { WhyChooseSection } from "@/components/home/why-choose-section";
import { TrustCirclesSection } from "@/components/home/trust-circles-section";
import { RhinoplastySection } from "@/components/home/rhinoplasty-section";
import { HealthcareOptionsSection } from "@/components/home/healthcare-options-section";
import { FaqSection } from "@/components/home/faq-section";
import { BlogsSection } from "@/components/home/blogs-section";
import { TransformationSection } from "@/components/home/transformation-section";

import { HeroStatsBanner } from "@/components/home/hero/hero-stats-banner";

export default function Home() {
	return (
		<main className="flex flex-col flex-1 w-full space-y-6 sm:space-y-5">
			<HeroSection />
			<div className="container relative z-10 pt-6 sm:pt-0 sm:-translate-y-8 lg:-translate-y-16">
				<div className="w-full lg:w-7/12">
					<HeroStatsBanner />
				</div>
			</div>
			<div className="container space-y-6 sm:space-y-5">
				<WhyChooseSection />
				<RhinoplastySection />
				<HealthcareOptionsSection />
				<TeamSection />
				<TrustCirclesSection />
				<StepsSection />
				<FaqSection />
				<BlogsSection />
				<TransformationSection />
			</div>
		</main>
	);
}
