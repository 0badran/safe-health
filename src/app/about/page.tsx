import type { Metadata } from "next";
import { AboutIntro } from "@/components/about/about-intro";
import { AboutPhilosophy } from "@/components/about/about-philosophy";
import { AboutApproach } from "@/components/about/about-approach";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
	title: "من نحن | Safe Health للرعاية الطبية والحلول الصحية",
	description:
		"تعرف على Safe Health ورؤيتنا في تقديم منظومة رعاية صحية ذكية ومتكاملة بإشراف نخبة من كبار الاستشاريين والأطباء المعتمدين.",
};

export default function AboutPage() {
	return (
		<main className="flex flex-col flex-1">
			<PageHeader
				badge="ABOUT US"
				title="Beauty, Health, Without Borders."
				description="We welcome patients from around the world, combining advanced aesthetic treatments, personalized care, and a seamless medical tourism experience."
			/>
			<AboutIntro />
			<AboutPhilosophy />
			<AboutApproach />
		</main>
	);
}
