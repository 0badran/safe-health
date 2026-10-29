import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationPageContent } from "@/components/consultation/consultation-page-content";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchData, getSeoMetadata } from "@/lib/api";
import type { ConsultationPageResponse } from "@/types/consultation";

export const instant = false;

interface PageProps {
	params: Promise<{ locale: string }>;
}

async function getConsultationPage(lang?: string) {
	try {
		const json = await fetchData<ConsultationPageResponse>({
			route: "/pages/consultation",
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
	const page = await getConsultationPage(locale);
	return getSeoMetadata(page?.seo, page?.title);
}

function ConsultationPageSkeleton() {
	return (
		<main className="min-h-screen w-full flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-6 bg-wallpaper">
			<div className="w-full max-w-xl mx-auto space-y-4">
				<div className="flex items-center justify-between px-1">
					<Skeleton className="h-9 w-32 rounded-lg" />
					<Skeleton className="h-8 w-16 rounded-full" />
				</div>
				<Skeleton className="h-130 w-full rounded-3xl" />
			</div>
		</main>
	);
}

export default async function ConsultationPage({ params }: PageProps) {
	const { locale } = await params;
	const page = await getConsultationPage(locale);

	return (
		<Suspense fallback={<ConsultationPageSkeleton />}>
			<ConsultationPageContent title={page?.title} />
		</Suspense>
	);
}
