import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutIntro } from "@/components/about/about-intro";
import { AboutTeam } from "@/components/about/about-team";

export const metadata: Metadata = {
	title: "من نحن | Safe Health للرعاية الطبية والحلول الصحية",
	description:
		"تعرف على Safe Health ورؤيتنا في تقديم منظومة رعاية صحية ذكية ومتكاملة بإشراف نخبة من كبار الاستشاريين والأطباء المعتمدين.",
};

export default function AboutPage() {
	return (
		<main className="flex flex-col flex-1">
			<AboutHero />
			<AboutIntro />
			<AboutTeam />
		</main>
	);
}
