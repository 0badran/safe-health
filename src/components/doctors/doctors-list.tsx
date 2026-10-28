"use client";

import { DoctorCard } from "@/components/doctors/doctor-card";
import { DoctorsFilter } from "@/components/doctors/doctors-filter";
import { DoctorsListSkeleton } from "@/components/doctors/doctors-skeleton";
import { DoctorsTimelineTrack } from "@/components/doctors/doctors-timeline-track";
import AppPagination from "@/components/shared/app-pagination";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import type { DoctorsApiResponse } from "@/types/doctors";
import { useSearchParams } from "next/navigation";

export function DoctorsList() {
	const { t } = useTranslation();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;
	const search = searchParams.get("search") || undefined;
	const specialty = searchParams.get("specialty") || undefined;
	const title = searchParams.get("title") || undefined;

	const {
		data: apiResponse,
		isLoading,
		isError,
	} = useFetchData<DoctorsApiResponse>({
		route: "/doctors",
		params: {
			page: String(page),
			search,
			specialty,
			title,
		},
	});

	const doctors = apiResponse?.data ?? [];
	const last_page = apiResponse?.pagination?.meta?.last_page ?? 1;

	return (
		<div id="doctors-list" className="w-full">
			<DoctorsFilter className="mb-10 lg:mb-14" />

			{/* Loading State: Skeletons */}
			{isLoading && <DoctorsListSkeleton count={3} />}

			{/* Error State */}
			{!isLoading && isError && (
				<div className="text-center py-16 space-y-3">
					<p className="text-destructive font-medium small">
						{t("doctors.errorLoading")}
					</p>
				</div>
			)}

			{/* Empty State */}
			{!isLoading && !isError && doctors.length === 0 && (
				<div className="text-center py-16 space-y-3">
					<p className="text-muted-foreground small">
						{t("doctors.emptyDoctors")}
					</p>
				</div>
			)}

			{/* Success State: Doctors List with Snake Track */}
			{!isLoading && !isError && doctors.length > 0 && (
				<section className="relative mb-20">
					<DoctorsTimelineTrack
						count={doctors.length}
						className="rtl:scale-x-[-1]"
					/>
					<div className="flex flex-col gap-16 lg:gap-20 relative z-10">
						{doctors.map((doctor, index) => (
							<DoctorCard
								key={doctor.id}
								doctor={doctor}
								flip={index % 2 === 0}
							/>
						))}
					</div>
				</section>
			)}

			{/* Pagination Control */}
			{!isLoading && !isError && <AppPagination last_page={last_page} />}
		</div>
	);
}

export default DoctorsList;
