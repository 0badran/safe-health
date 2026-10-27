"use client";

import Image from "next/image";
import { Fragment } from "react";
import { SectionBadge } from "@/components/shared/section-badge";
import { ConsultationDrawer } from "@/components/consultation/consultation-drawer";
import { NaturalResultsIcon, PersonalizedCareIcon } from "@/components/icons";
import { useTranslation } from "@/lib/language-context";
import type { HomeCoreSpecialtySection } from "@/types/home";

export interface RhinoplastySectionProps {
	data?: HomeCoreSpecialtySection;
}

const DEFAULT_FEATURE_ICONS = [
	<NaturalResultsIcon key="natural" />,
	<PersonalizedCareIcon key="care" />,
];

function renderFeatureIcon(
	icon: string | null | undefined,
	index: number,
	title: string,
) {
	if (icon) {
		return (
			<div className="relative size-10 shrink-0">
				<Image
					src={icon}
					alt={title}
					fill
					sizes="40px"
					className="object-contain"
				/>
			</div>
		);
	}
	return DEFAULT_FEATURE_ICONS[index] ?? DEFAULT_FEATURE_ICONS[0];
}

export function RhinoplastySection({ data }: RhinoplastySectionProps = {}) {
	const { t } = useTranslation();

	if (!data || !data.headline) return null;

	const tagText = data.tag_text;
	const headline = data.headline;
	const description = data.description;
	const image = data.image || "/images/nosee.png";
	const features = data.feature_card;

	if (!features || features.length === 0) {
		return null;
	}

	return (
		<section className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 items-center">
			{/* Left Column: Heading, Badge & CTA */}
			<div className="flex flex-col justify-center">
				{tagText && <SectionBadge>{tagText}</SectionBadge>}

				<h1 className="text-heading mt-3 sm:mt-5 ">{headline}</h1>

				{description && (
					<p className="text-paragraph leading-relaxed lg:max-w-sm mt-3 md:mt-5 mb-6 md:mb-8">
						{description}
					</p>
				)}

				<div className="w-fit">
					<ConsultationDrawer variant="outline" withArrow>
						{t("navbar.getConsultation")}
					</ConsultationDrawer>
				</div>
			</div>

			{/* Center Column: Arched Profile Photo */}
			<div className="relative  flex justify-center items-center">
				<div className="relative w-full sm:max-w-100 aspect-374/419">
					<Image
						src={image}
						alt={headline}
						fill
						priority
						sizes="(max-width: 640px) 100vw, 400px"
						className="object-contain size-full"
					/>
				</div>
			</div>

			{/* Right Column: Features with Divider */}
			<div className="flex max-sm:flex-wrap max-sm:col-span-1 max-lg:col-span-2 lg:flex-col justify-center gap-6 sm:gap-7 lg:max-w-md lg:ps-4">
				{features.map((feature, index) => (
					<Fragment key={feature.title || index}>
						{index > 0 && (
							<div className="h-px w-full bg-border max-lg:hidden" />
						)}
						<div className="flex items-start gap-4">
							{renderFeatureIcon(feature.icon, index, feature.title)}
							<div className="flex flex-col gap-1">
								<h3 className="font-heading h3 text-primary">
									{feature.title}
								</h3>
								<p className="text-paragraph small leading-relaxed">
									{feature.description}
								</p>
							</div>
						</div>
					</Fragment>
				))}
			</div>
		</section>
	);
}

export default RhinoplastySection;
