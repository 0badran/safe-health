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

export default function Home() {
	return (
		<main className="flex flex-col flex-1 w-full space-y-12 sm:space-y-16">
			<HeroSection />
			<div className="container space-y-12 sm:space-y-16">
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
