import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ContactCards } from "@/components/contact/contact-cards";
import { ContactForm } from "@/components/contact/contact-form";
import {
	ContactCardsSkeleton,
	ContactFormSkeleton,
} from "@/components/contact/contact-skeleton";
import { fetchData, getSeoMetadata } from "@/lib/api";
import type { ContactPageResponse } from "@/types/contact";
import type { SettingsApiResponse } from "@/types/settings";
import { Suspense } from "react";

interface PageProps {
	params: Promise<{ locale: string }>;
}

async function getContactPage(lang?: string) {
	try {
		const json = await fetchData<ContactPageResponse>({
			route: "/pages/contact-us",
			lang,
		});
		return json?.data || null;
	} catch {
		return null;
	}
}

async function getSettings(lang?: string) {
	try {
		const json = await fetchData<SettingsApiResponse>({
			route: "/settings",
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
	const page = await getContactPage(locale);
	return getSeoMetadata(page?.seo, page?.title);
}

export default async function ContactPage({ params }: PageProps) {
	const { locale } = await params;
	const [page, settings] = await Promise.all([
		getContactPage(locale),
		getSettings(locale),
	]);

	const sections = page?.sections;
	const hero = sections?.["contact-hero"];
	const formSection = sections?.["contact-form-section"];

	return (
		<main className="flex flex-col flex-1">
			{/* PageHeader with dynamic content from /pages/contact-us */}
			{hero && (
				<PageHeader
					badge={hero.tag_text}
					title={hero.headline}
					description={hero.description}
				/>
			)}

			{/* Main Content: 2-column Grid matching the project layout & theme */}
			<section className="container">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
					{/* Column 1: Contact Cards & Location Map from /settings API */}
					<div className="lg:col-span-6">
						<Suspense fallback={<ContactCardsSkeleton />}>
							<ContactCards settings={settings} />
						</Suspense>
					</div>

					{/* Column 2: Contact Form with dynamic section data */}
					<div className="lg:col-span-6 mb-14">
						<Suspense fallback={<ContactFormSkeleton />}>
							<ContactForm sectionData={formSection} />
						</Suspense>
					</div>
				</div>
			</section>
		</main>
	);
}
