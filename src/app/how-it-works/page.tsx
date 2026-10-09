import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { HowItWorksSteps } from "@/components/how-it-works/how-it-works-steps";
import { HowItWorksStandards } from "@/components/how-it-works/how-it-works-standards";
import { HowItWorksFaq } from "@/components/how-it-works/how-it-works-faq";
import { HowItWorksCta } from "@/components/how-it-works/how-it-works-cta";

export const metadata: Metadata = {
	title: "كيف نعمل | Safe Health للرعاية الطبية والحلول الصحية",
	description:
		"تعرف على خطوات رحلتك العلاجية مع Safe Health، من تقييم الحالة مجاناً ومطابقة أفضل الجراحين المعتمدين حتى إتمام الإجراء والمتابعة الدورية للتعافي.",
};

export default function HowItWorksPage() {
	return (
		<main className="flex flex-col flex-1">
			{/* Reusable PageHero component */}
			<PageHero
				title="كيف نعمل"
				imageSrc="/images/how-it-works/hero-banner.jpg"
				imageAlt="استشارة وخطة علاجية في منظومة Safe Health"
				breadcrumbs={[{ label: "كيف نعمل" }]}
				description="منظومة متكاملة تضمن لك رحلة علاجية واضحة وآمنة، تبدأ من أول استشارة مجانية وحتى التعافي التام بإشراف نخبة من كبار الجراحين المعتمدين."
			/>

			{/* 4-Step Patient Journey */}
			<HowItWorksSteps />

			{/* SafeScore™ Quality and Safety Protocols */}
			<HowItWorksStandards />

			{/* Frequently Asked Questions */}
			<HowItWorksFaq />

			{/* CTA Banner */}
			<HowItWorksCta />
		</main>
	);
}
