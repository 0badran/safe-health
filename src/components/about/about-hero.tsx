import InteractiveGridBackground from "@/components/shared/interactive-grid-background";
import { SectionBadge } from "@/components/shared/section-badge";

export function AboutHero() {
	return (
		<section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36">
			{/* Interactive Grid Hover Effect matching template */}
			<InteractiveGridBackground
				borderColor="var(--border)"
				hoverColor="color-mix(in srgb, var(--primary) 8%, transparent)"
				borderOpacity={0.5}
			/>

			<div className="container relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 pointer-events-none">
				<div className="flex flex-col items-center justify-center text-center gap-6 sm:gap-8">
					{/* Gradient Display Title */}
					<h1 className="text-heading">Beauty, Health, Without Borders.</h1>

					{/* Badge + Description Row */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-3xl">
						<SectionBadge className="shrink-0">ABOUT US</SectionBadge>

						<p className="text-paragraph h5 font-normal leading-relaxed text-center sm:text-start max-w-xl">
							We welcome patients from around the world, combining advanced
							aesthetic treatments, personalized care, and a seamless medical
							tourism experience.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
