import Image from "next/image";
import {
	ApproachCoordinationIcon,
	ApproachGuidanceIcon,
	ApproachPlanningIcon,
	PersonalizedCareIcon,
} from "@/components/icons";
import { FadeIn } from "@/components/shared/fade-in";
import SectionHeader from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import type { JourneyDifferenceSection } from "@/types/patient-journey";

export interface JourneyDifferenceProps {
	data?: JourneyDifferenceSection;
}

const FALLBACK_ICONS = [
	ApproachCoordinationIcon,
	PersonalizedCareIcon,
	ApproachPlanningIcon,
	ApproachGuidanceIcon,
];

export function JourneyDifference({ data }: JourneyDifferenceProps = {}) {
	if (!data) return null;

	const features = data.feature_card ?? [];

	return (
		<section className="space-y-8">
			{(data.headline || data.tag_text || data.description) && (
				<SectionHeader
					align="center"
					subTitle={data.tag_text}
					title={data.headline || ""}
					desc={data.description}
				/>
			)}

			{features.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
					{features.map((item, index) => {
						const FallbackIcon =
							FALLBACK_ICONS[index % FALLBACK_ICONS.length];

						return (
							<FadeIn key={item.title || index} delay={index * 0.1}>
								<Card className="h-full">
									<CardContent className="flex items-start gap-4">
										<div className="bg-secondary/10 size-12 rounded-full flex items-center justify-center shrink-0 text-primary">
											{item.icon ? (
												<div className="relative size-6">
													<Image
														src={item.icon}
														alt={item.title}
														fill
														sizes="24px"
														className="object-contain"
													/>
												</div>
											) : (
												<FallbackIcon className="size-6" />
											)}
										</div>

										<div className="space-y-1.5">
											<h3 className="font-heading h5 text-foreground">
												{item.title}
											</h3>
											<p className="text-paragraph small leading-relaxed">
												{item.description}
											</p>
										</div>
									</CardContent>
								</Card>
							</FadeIn>
						);
					})}
				</div>
			)}
		</section>
	);
}

export default JourneyDifference;

