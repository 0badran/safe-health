import { PageHeader } from "@/components/shared/page-header";
import { DoctorsFilter } from "@/components/doctors/doctors-filter";
import { DoctorCard, type DoctorData } from "@/components/doctors/doctor-card";
import { DoctorsTimelineTrack } from "@/components/doctors/doctors-timeline-track";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "الأطباء | Safe Health للرعاية الطبية والحلول الصحية",
	description:
		"تعرف على نخبة الأطباء والاستشاريين المعتمدين لدى Safe Health المتخصصين في تقديم رعاية طبية متقدمة ونتائج استثنائية.",
};

const DOCTORS: DoctorData[] = [
	{
		id: "dr-sarah",
		name: "Dr/ Sarah Jenkins",
		specialty: "AESTHETIC DERMATOLOGY",
		experience: "14+ YEARS EXPERIENCE",
		image: "/images/doctors/dr-sarah.png",
		description:
			"Specialized clinical and aesthetic dermatology focused on skin rejuvenation, advanced non-surgical enhancements, and bespoke cellular therapy.",
		procedures: [
			"Laser Skin Resurfacing",
			"Botox & Dermal Fillers",
			"Platelet-Rich Plasma (PRP)",
			"Microneedling & RF",
			"Chemical Peeling",
		],
	},
	{
		id: "dr-ahmed",
		name: "Dr/ Ahmed",
		specialty: "PLASTIC SURGERY",
		experience: "18+ YEARS EXPERIENCE",
		image: "/images/doctors/dr-ahmed-male.png",
		description:
			"Precision surgical interventions sculpted to achieve facial and anatomical harmony while preserving natural identity and delicate proportions.",
		procedures: [
			"Rhinoplasty",
			"Deep Plane Facelift",
			"Blepharoplasty (Eyelid Surgery)",
			"Breast Augmentation",
			"Structural Facial Contouring",
		],
	},
	{
		id: "dr-omar",
		name: "Dr/ Omar",
		specialty: "PLASTIC SURGERY",
		experience: "18+ YEARS EXPERIENCE",
		image: "/images/doctors/dr-omar.png",
		description:
			"Precision surgical interventions sculpted to achieve facial and anatomical harmony while preserving natural identity and delicate proportions.",
		procedures: [
			"Rhinoplasty",
			"Deep Plane Facelift",
			"Blepharoplasty (Eyelid Surgery)",
			"Breast Augmentation",
			"Structural Facial Contouring",
		],
	},
	{
		id: "dr-sarah-2",
		name: "Dr/ Sarah Jenkins",
		specialty: "AESTHETIC DERMATOLOGY",
		experience: "14+ YEARS EXPERIENCE",
		image: "/images/doctors/dr-sarah.png",
		description:
			"Specialized clinical and aesthetic dermatology focused on skin rejuvenation, advanced non-surgical enhancements, and bespoke cellular therapy.",
		procedures: [
			"Laser Skin Resurfacing",
			"Botox & Dermal Fillers",
			"Platelet-Rich Plasma (PRP)",
			"Microneedling & RF",
			"Chemical Peeling",
		],
	},
];

export default function DoctorsPage() {
	return (
		<main className="flex flex-col flex-1">
			<PageHeader
				badge="OUR DOCTORS"
				title="Meet Our Medical Experts"
				description="Discover experienced medical professionals dedicated to personalized care, advanced treatments, and exceptional results throughout your healthcare journey."
			/>
			<div className="my-10 container">
				<DoctorsFilter />
			</div>
			<section className="container relative mb-20">
				<DoctorsTimelineTrack />
				<div className="flex flex-col gap-16 lg:gap-20 relative z-10">
					{DOCTORS.map((doctor, index) => (
						<DoctorCard
							key={doctor.id}
							doctor={doctor}
							flip={index % 2 === 0}
						/>
					))}
				</div>
			</section>
		</main>
	);
}
