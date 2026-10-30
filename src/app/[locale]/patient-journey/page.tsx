import type { Metadata } from "next";
import { JourneyDifference } from "@/components/patient-journey/journey-difference";
import { JourneyStats } from "@/components/patient-journey/journey-stats";
import { JourneySteps } from "@/components/patient-journey/journey-steps";
import { FadeIn } from "@/components/shared/fade-in";
import { FooterCta } from "@/components/shared/footer-cta";
import { PageHeader } from "@/components/shared/page-header";
import { fetchData, getSeoMetadata } from "@/lib/api";
import type { PatientJourneyPageResponse } from "@/types/patient-journey";

export const instant = false;

interface PageProps {
	params: Promise<{ locale: string }>;
}

async function getPatientJourneyPage(lang?: string) {
	try {
		const json = await fetchData<PatientJourneyPageResponse>({
			route: "/pages/patient-journey",
			lang,
		});
		return json?.data || null;
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale } = await params;
	const page = await getPatientJourneyPage(locale);
	return getSeoMetadata(page?.seo, page?.title);
}

export default async function PatientJourneyPage({ params }: PageProps) {
	const { locale } = await params;
	const page = await getPatientJourneyPage(locale);
	const sections = page?.sections;

	const hero = sections?.["journey-hero"];
	const steps = sections?.["journey-steps"];
	const difference = sections?.["journey-difference"];
	const stats = sections?.["journey-stats"];
	const ctaData = sections?.["consultation-cta"];

	return (
		<main className="flex flex-col flex-1 overflow-x-clip">
			{hero && (
				<PageHeader
					badge={hero.tag_text}
					title={hero.headline}
					description={hero.description}
				/>
			)}

			<div className="container space-y-10 sm:space-y-14 lg:space-y-20">
				{steps && <JourneySteps data={steps} />}

				{difference && (
					<FadeIn>
						<JourneyDifference data={difference} />
					</FadeIn>
				)}

				{stats && (
					<FadeIn>
						<JourneyStats data={stats} />
					</FadeIn>
				)}
			</div>

			{ctaData && (
				<div className="container mt-14">
					<FooterCta data={ctaData} />
				</div>
			)}
		</main>
	);
}

