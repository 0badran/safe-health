import { PageHeader } from "@/components/shared/page-header";
import { BeforeAfterFilter } from "@/components/before-after/before-after-filter";
import {
	BeforeAfterCard,
	type BeforeAfterCase,
} from "@/components/before-after/before-after-card";
import { ExploreOptionsCard } from "@/components/before-after/explore-options-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "قبل وبعد | نتائج واقعية للمرضى | Safe Health",
	description:
		"استكشف نتائج التحول الموثقة لمرضانا مع أعلى معايير الدقة الجراحية والتوازن المعماري الطبيعي.",
};

const CASES: BeforeAfterCase[] = [
	{
		id: "case-1",
		title: "Preservation Rhinoplasty",
		category: "RHINOPLASTY",
		timeframe: "6 Months Post-Op",
		description:
			"Cartilaginous vault preservation delivering micro-millimeter precision, intact ligamentous integrity, and rapid lymphatic",
		country: "Italy",
		beforeImage: "/images/hero-doctor.jpg",
		afterImage: "/images/blog-author.jpg",
		href: "#",
	},
	{
		id: "case-2",
		title: "Deep Plane Facelift",
		category: "FACIAL SURGERY",
		timeframe: "1 Year Post-Op",
		description:
			"Sub-SMAS structural repositioning restoring midface volume and jawline definition without cutaneous tension.",
		country: "Turkey",
		beforeImage: "/images/rhinoplasty.png",
		afterImage: "/images/hero.jpg",
		href: "#",
	},
	{
		id: "case-3",
		title: "Structural Blepharoplasty",
		category: "EYELID AESTHETICS",
		timeframe: "4 Months Post-Op",
		description:
			"Orbital fat repositioning combined with discreet canthopexy to eliminate pseudo-herniated bags and periorbital fatigue.",
		country: "Spain",
		beforeImage: "/images/rhinoplasty.png",
		afterImage: "/images/hero.jpg",
		href: "#",
	},
	{
		id: "case-4",
		title: "Ultrasonic Rhinoplasty",
		category: "RHINOPLASTY",
		timeframe: "9 Months Post-Op",
		description:
			"Piezoelectric bone remodeling sculpted to achieve dorsal symmetry with minimal ecchymosis and accelerated recovery.",
		country: "Germany",
		beforeImage: "/images/rhinoplasty.png",
		afterImage: "/images/hero.jpg",
		href: "#",
	},
	{
		id: "case-5",
		title: "Composite Breast Augmentation",
		category: "BODY CONTOURING",
		timeframe: "8 Months Post-Op",
		description:
			"Dual-plane cohesive silicone implant paired with micro-autologous fat grafting for seamless cleavage transition.",
		country: "France",
		beforeImage: "/images/rhinoplasty.png",
		afterImage: "/images/hero.jpg",
		href: "#",
	},
	{
		id: "case-6",
		title: "Full Facial Volumization",
		category: "REGENERATIVE",
		timeframe: "3 Months Post-Op",
		description:
			"Autologous nanofat and stromal vascular fraction rejuvenation enhancing skin texture and subcutaneous architectural balance.",
		country: "United Kingdom",
		beforeImage: "/images/rhinoplasty.png",
		afterImage: "/images/hero.jpg",
		href: "#",
	},
];

export default function BeforeAfterPage() {
	return (
		<main className="flex flex-col flex-1">
			<PageHeader
				badge="REAL PATIENT RESULTS"
				title="Before & After Transformations"
				description="Explore documented transformations curated with surgical rigor, biological respect, and bespoke architectural balance."
			/>

			<div className="mb-10 container">
				<BeforeAfterFilter />
			</div>

			<section className="container mb-20">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
					{CASES.map((item) => (
						<BeforeAfterCard key={item.id} caseItem={item} />
					))}
				</div>
			</section>

			<div className="container">
				<ExploreOptionsCard />
			</div>
		</main>
	);
}
