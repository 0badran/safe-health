import Image from "next/image";
import { ArrowDownIcon } from "lucide-react";
import { TimelineDot } from "@/components/icons";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionBadge } from "@/components/shared/section-badge";
import { Card, CardContent } from "@/components/ui/card";
import type { JourneyStepsSection } from "@/types/patient-journey";

export interface JourneyStepsProps {
	data?: JourneyStepsSection;
}

export function JourneySteps({ data }: JourneyStepsProps = {}) {
	const steps = data?.journey_step_card ?? [];

	if (steps.length === 0) return null;

	return (
		<section className="relative">
			<div className="relative flex flex-col max-lg:space-y-8">
				{steps.map((step, index) => {
					const isLast = index === steps.length - 1;

					return (
						<div
							key={step.step_number || index}
							style={{ zIndex: index + 1 }}
							className="relative lg:sticky lg:top-28 bg-background lg:py-8 lg:min-h-[62vh] flex items-start"
						>
							<FadeIn
								delay={0.05}
								className="w-full grid grid-cols-1 lg:grid-cols-[5fr_auto_7fr] gap-4 lg:gap-10 items-start"
							>
								{/* Left Column: Step Badge, Sidebar Title & Sidebar Description */}
								<div className="flex flex-col items-start lg:items-end lg:text-end space-y-2.5 lg:pt-2">
									<SectionBadge
										withoutIcon
										className="font-normal text-primary"
									>
										<span>STEP _ {step.step_number}</span>
										<ArrowDownIcon className="size-3 text-primary/70 shrink-0" />
									</SectionBadge>

									{step.sidebar_title && (
										<h3 className="font-heading h4 text-primary font-normal">
											{step.sidebar_title}
										</h3>
									)}

									{step.sidebar_description && (
										<p className="text-paragraph small leading-relaxed max-w-md">
											{step.sidebar_description}
										</p>
									)}
								</div>

								{/* Center Column: Timeline Dot & Dashed Vertical Connector */}
								<div className="hidden lg:flex flex-col items-center self-stretch">
									<div className="relative z-10 pt-2">
										<TimelineDot />
									</div>
									{!isLast && (
										<div
											className="w-0.5 flex-1 border-e border-dashed border-secondary/50 my-2 min-h-32"
											aria-hidden="true"
										/>
									)}
								</div>

								{/* Right Column: Main Detail Card */}
								<Card className="w-full">
									<CardContent className="space-y-4">
										<div className="flex items-center justify-between gap-3">
											{step.main_title && (
												<h4 className="font-heading h4 text-foreground font-normal">
													{step.main_title}
												</h4>
											)}
											<span className="font-heading h3 text-primary/25 shrink-0 leading-none select-none">
												{step.step_number}
											</span>
										</div>

										{step.main_description && (
											<p className="text-paragraph small sm:text-base leading-relaxed">
												{step.main_description}
											</p>
										)}

										{step.image && (
											<div className="relative aspect-16/9 w-full overflow-hidden rounded-xl bg-muted">
												<Image
													src={step.image}
													alt={step.main_title || step.sidebar_title}
													fill
													sizes="(max-width: 1024px) 100vw, 50vw"
													className="object-cover"
												/>
											</div>
										)}
									</CardContent>
								</Card>
							</FadeIn>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default JourneySteps;
