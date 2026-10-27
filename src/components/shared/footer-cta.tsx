"use client";

import Image from "next/image";
import { ConsultationDrawer } from "@/components/consultation/consultation-drawer";
import { useTranslation } from "@/lib/language-context";
import type { HomeConsultationCtaSection } from "@/types/home";

export interface FooterCtaProps {
	data?: HomeConsultationCtaSection;
}

export function FooterCta({ data }: FooterCtaProps = {}) {
	const { t } = useTranslation();

	if (!data || !data.headline) {
		return null;
	}

	const headline = data.headline;
	const description = data.description;
	const bgImage = data.background_image || "/images/transformation-banner.png";

	return (
		<section className="relative w-full py-5 lg:py-10 rounded-3xl overflow-hidden flex items-center translate-y-[7%] z-1">
			{/* Background Poster Image */}
			<Image
				src={bgImage}
				alt={headline}
				fill
				priority
				sizes="100vw"
				className="object-cover object-[0_38%] pointer-events-none select-none"
			/>

			{/* Tailwind Gradient Layer */}
			<div
				className="absolute inset-0 bg-linear-[92.73deg] from-white/48 from-[9.33%] to-primary/24 to-[70.17%] pointer-events-none"
				aria-hidden="true"
			/>

			{/* Content */}
			<div className="relative z-10 flex flex-col justify-center items-start px-3 lg:px-6 flex-1">
				<h2 className="font-heading italic text-primary h3 leading-tight tracking-tight">
					{headline}
				</h2>

				{description && (
					<p className="text-paragraph h5 lg:mt-3 mt-1 leading-6 lg:leading-9 font-normal max-w-lg line-clamp-3 sm:line-clamp-none">
						{description}
					</p>
				)}

				<div className="mt-4 lg:mt-8">
					<ConsultationDrawer variant="default" withArrow>
						{t("navbar.getConsultation")}
					</ConsultationDrawer>
				</div>
			</div>
		</section>
	);
}

export default FooterCta;
