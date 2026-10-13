import HeroSection from "@/components/home/hero-section";
import StepsSection from "@/components/home/steps-section";
import TeamSection from "@/components/home/team-section";

export default function Home() {
	return (
		<main className="flex flex-col flex-1 w-full space-y-12 sm:space-y-16">
			<HeroSection />
			<div className="container max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
				<StepsSection />
				<TeamSection />
			</div>
		</main>
	);
}
