import StepsSection from "@/components/home/steps-section";
import { PageHeader } from "@/components/shared/page-header";
import { TreatmentsContent } from "@/components/treatments/treatments-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "العلاجات | Safe Health للرعاية الطبية والحلول الصحية",
	description:
		"تعرف على العلاجات التي تقدمها Safe Health ورؤيتنا في تقديم منظومة رعاية صحية ذكية ومتكاملة بإشراف نخبة من كبار الاستشاريين والأطباء المعتمدين.",
};

export default function TreatmentsPage() {
	return (
		<main className="flex flex-col flex-1">
			<PageHeader
				badge="OUR TREATMENTS"
				title="Discover the Right Treatment for You."
				description="Explore a range of aesthetic treatments designed to address different needs and goals, with personalized guidance to help you understand your options"
			/>
			<div className="container">
				<TreatmentsContent />

				{/* <StepsSection data={sections?.["patient-journey"]} /> */}

			</div>
		</main>
	);
}
