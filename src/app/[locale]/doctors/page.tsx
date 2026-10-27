import { Suspense } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DoctorsList } from "@/components/doctors/doctors-list";
import { DoctorsListSkeleton } from "@/components/doctors/doctors-skeleton";
import { FooterCta } from "@/components/shared/footer-cta";
import { fetchData, getSeoMetadata } from "@/lib/api";
import type { DoctorsPageResponse } from "@/types/doctors";
import type { Metadata } from "next";

export const instant = false;

async function getDoctorsPage() {
	try {
		const json = await fetchData<DoctorsPageResponse>({
			route: "/pages/our-doctors",
		});
		return json?.data || null;
	} catch {
		return null;
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getDoctorsPage();
	return getSeoMetadata(page?.seo, page?.title);
}

export default async function DoctorsPage() {
	const page = await getDoctorsPage();
	const sections = page?.sections;
	const hero = sections?.["doctors-hero"];
	const ctaData = sections?.["consultation-cta"];

	return (
		<main className="flex flex-col flex-1">
			{hero && (
				<PageHeader
					badge={hero.tag_text}
					title={hero.headline}
					description={hero.description}
				/>
			)}

			<div className="container">
				<Suspense fallback={<DoctorsListSkeleton count={3} />}>
					<DoctorsList />
				</Suspense>
			</div>

			{ctaData && (
				<div className="container">
					<FooterCta data={ctaData} />
				</div>
			)}
		</main>
	);
}
