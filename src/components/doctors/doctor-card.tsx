import { ConsultationDrawer } from "@/components/consultation/consultation-drawer";
import { SectionBadge } from "@/components/shared/section-badge";
import { FallbackImage } from "@/components/shared/fallback-image";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import type { DoctorItem } from "@/types/doctors";

export interface DoctorData {
	id: string | number;
	name: string;
	specialty?: string;
	title?: string;
	experience?: string;
	experience_years?: number;
	image?: string | null;
	description?: string;
	bio?: string;
	procedures?: string[];
	specialties?: string[];
}

export interface DoctorCardProps {
	doctor: DoctorItem | DoctorData;
	flip?: boolean;
	className?: string;
}

export function DoctorCard({
	doctor,
	flip = false,
	className,
}: DoctorCardProps) {
	const { t } = useTranslation();

	const displayTitle = doctor?.title;

	const displayBio = doctor?.bio;

	const displaySpecialties = doctor?.specialties ?? [];

	const displayExperience = doctor?.experience_years
		? `${doctor.experience_years}+ ${t("doctors.yearsExperience")}`
		: undefined;

	return (
		<section
			aria-label={`Profile of ${doctor?.name}`}
			className={cn(
				"w-full relative grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center",
				className,
			)}
		>
			{/* Info Column */}
			<div
				className={cn(
					"w-full bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 global-shadow flex flex-col gap-6",
					"order-2 md:col-span-7",
					flip
						? "md:order-2 items-start text-start"
						: "md:order-1 md:items-end md:text-end items-start text-start",
				)}
			>
				{/* Specialty / Title Pill Badge */}
				{displayTitle && (
					<SectionBadge
						withoutIcon
						className={cn(
							"text-primary font-semibold",
							flip ? "self-start" : "md:self-end self-start",
						)}
					>
						{displayTitle}
					</SectionBadge>
				)}

				{/* Doctor Name Heading */}
				<h2 className="font-heading italic h3 text-primary leading-tight">
					{doctor.name}
				</h2>

				{/* Doctor Philosophy & Approach Description */}
				{displayBio && (
					<p className="text-paragraph leading-relaxed max-w-xl">
						{displayBio}
					</p>
				)}

				{/* Specialized Procedures / Specialties List */}
				{displaySpecialties.length > 0 && (
					<div
						className={cn(
							"space-y-3 flex flex-col w-full",
							flip ? "items-start" : "md:items-end items-start",
						)}
					>
						<h4 className="small font-semibold uppercase tracking-wider">
							{t("doctors.specialtiesHeading")}
						</h4>
						<div
							className={cn(
								"flex flex-wrap gap-2 sm:gap-2.5",
								flip ? "justify-start" : "md:justify-end justify-start",
							)}
						>
							{displaySpecialties.map((spec) => (
								<span
									key={spec}
									className="rounded-full bg-purple-tint dark:bg-muted small text-primary px-4 py-2 border transition-colors"
								>
									{spec}
								</span>
							))}
						</div>
					</div>
				)}

				{/* Action Button Triggering Personalization */}
				<div
					className={cn(
						"pt-2 flex w-full",
						flip ? "justify-start" : "md:justify-end justify-start",
					)}
				>
					<ConsultationDrawer
						variant="default"
						withArrow
						title={`${t("doctors.consultationTitle")} ${doctor.name}`}
					>
						{t("doctors.getPersonalization")}
					</ConsultationDrawer>
				</div>
			</div>

			{/* Visual Column: Arched Doctor Portrait with Floating Badges */}
			<div
				className={cn(
					"flex justify-center items-end relative pt-8 sm:pt-12",
					"order-1 md:col-span-5",
					flip ? "md:order-1" : "md:order-2",
				)}
			>
				{/* Architectural Arch Background */}
				<div className="relative">
					{/* Floating Experience Badge */}
					{displayExperience && (
						<div
							className={cn(
								"absolute top-1/2 lg:top-1/3 z-10 rounded-full bg-purple-tint dark:bg-muted px-4 py-1.5 small font-bold tracking-wider border select-none whitespace-nowrap",
								flip ? "inset-s-0 lg:-inset-s-8" : "inset-e-0 lg:-inset-e-8",
							)}
						>
							{displayExperience}
						</div>
					)}

					{/* Doctor Cut-out Image with Fallback */}
					<FallbackImage
						src={doctor.image}
						fallbackSrc="/images/avatar.svg"
						alt={doctor.name}
						width={420}
						height={480}
						preload
						className="relative z-0 max-h-105 sm:max-h-115 w-auto object-contain object-bottom drop-shadow-sm select-none pointer-events-none"
					/>
				</div>
			</div>
		</section>
	);
}
