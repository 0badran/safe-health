import { FadeIn } from "@/components/shared/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import type { JourneyStatsSection } from "@/types/patient-journey";

export interface JourneyStatsProps {
	data?: JourneyStatsSection;
}

export function JourneyStats({ data }: JourneyStatsProps = {}) {
	const stats = data?.stat_card ?? [];

	if (stats.length === 0) return null;

	return (
		<section className="bg-wallpaper rounded-3xl p-6 sm:p-8 lg:p-10">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
				{stats.map((stat, index) => (
					<FadeIn key={stat.title || index} delay={index * 0.1}>
						<Card className="h-full">
							<CardContent className="flex flex-col justify-between space-y-3 h-full">
								<span className="text-heading h2 font-bold leading-none">
									{stat.number}
								</span>
								<div className="space-y-1">
									<h3 className="font-heading h5 text-foreground">
										{stat.title}
									</h3>
									{stat.description && (
										<p className="text-paragraph small leading-relaxed">
											{stat.description}
										</p>
									)}
								</div>
							</CardContent>
						</Card>
					</FadeIn>
				))}
			</div>
		</section>
	);
}

export default JourneyStats;

