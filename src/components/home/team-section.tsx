"use client";

import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import type { HomeDoctorsSection } from "@/types/home";
import { SectionCarousel } from "../shared/section-carousel";
import SectionHeader from "../shared/section-header";
import TeamCard from "../shared/team-card";

export interface DoctorItem {
	id: number | string;
	name: string;
	title?: string;
	image?: string | null;
	bio?: string;
	specialties?: string[];
	experience_years?: number;
	is_active?: boolean;
}

export interface TeamSectionProps {
	data?: HomeDoctorsSection;
}

export function TeamSection({ data }: TeamSectionProps = {}) {
	const { t } = useTranslation();
	const { data: apiResponse, isLoading } = useFetchData<{ data: DoctorItem[] }>(
		{
			route: "/doctors",
			params: { per_page: "8" },
		},
	);

	const doctors = apiResponse?.data;

	if (!isLoading && (!doctors || doctors.length === 0)) {
		return null;
	}

	if (isLoading && !doctors) {
		return null;
	}

	const subTitle = data?.tag_text;
	const title = data?.headline;
	const desc = data?.description;

	return (
		<section className="flex flex-col w-full" id="team">
			<SectionHeader
				subTitle={subTitle}
				title={title!}
				desc={desc}
				buttonText={t("navbar.ourDoctors")}
				buttonLink="/doctors"
			/>

			<SectionCarousel
				items={doctors ?? []}
				keyExtractor={(doc, ind) => `${doc.id ?? doc.name}-${ind}`}
				itemClassName="ps-4 basis-[70%] sm:basis-[40%] md:basis-[40%] lg:basis-1/4"
				contentClassName="-ms-4 p-1"
				showArrows={false}
				renderItem={(doc) => (
					<div className="flex justify-center h-full">
						<TeamCard
							name={doc.name}
							expYears={doc.experience_years}
							specialties={doc.specialties}
							imgSrc={doc.image ?? null}
						/>
					</div>
				)}
			/>
		</section>
	);
}

export default TeamSection;
