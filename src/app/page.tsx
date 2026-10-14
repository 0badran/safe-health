import HeroSection from "@/components/home/hero-section";
import StepsSection from "@/components/home/steps-section";
import TeamSection from "@/components/home/team-section";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="flex flex-col flex-1 w-full space-y-12 sm:space-y-16">
			<HeroSection />
			<div className="container space-y-12 sm:space-y-16">
				<div className="bg-primary w-full h-10"></div>
				<Button variant="default" withArrow>
					Hello sir
				</Button>
				<h1 className="text-heading">Your Health Journey, Handled with Care</h1>
				<StepsSection />
				<TeamSection />
			</div>
		</main>
	);
}
