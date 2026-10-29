import { PageHeader } from "@/components/shared/page-header";
import { ServicesContent } from "@/components/services/services-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "الخدمات | Safe Health للرعاية الطبية والحلول الصحية",
	description:
		"تعرف على الخدمات التي تقدمها Safe Health ورؤيتنا في تقديم منظومة رعاية صحية ذكية ومتكاملة بإشراف نخبة من كبار الاستشاريين والأطباء المعتمدين.",
};

export default function ServicesPage() {
	return (
		<main className="flex flex-col flex-1">
			<PageHeader
				badge="OUR SERVICES"
				title="Discover the Right Service for You."
				description="Explore a range of aesthetic medical services designed to address different needs and goals, with personalized guidance to help you understand your options"
			/>
			<div className="container">
				<ServicesContent />
			</div>
		</main>
	);
}
