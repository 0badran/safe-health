import { FallbackImage } from "@/components/shared/fallback-image";
import { Link } from "@/i18n/navigation";
import { ArrowDownIcon } from "lucide-react";
import type { AboutOverviewSection } from "@/types/about";

export interface AboutIntroProps {
	data?: AboutOverviewSection;
}

export function AboutIntro({ data }: AboutIntroProps = {}) {
	if (!data) return null;

	const stats = data.stat_card ?? [];

	return (
		<section>
			<div className="container">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
					{/* Left: Treatment Photo with FallbackImage */}
					<div className="lg:col-span-6">
						<div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-xl border border-border/40">
							<FallbackImage
								src={data.feature_image}
								fallbackSrc="/images/why-choose/aesthetic-care.jpg"
								alt={
									data.headline ||
									"Advanced aesthetic treatment at SafeHealthMe"
								}
								fill
								priority
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover object-center transition-transform duration-700"
							/>
						</div>
					</div>

					{/* Right: Content & Stats */}
					<div className="lg:col-span-6 flex flex-col gap-y-4">
						{/* Two-line Gradient Heading */}
						{data.headline && (
							<h2 className="text-heading leading-tight whitespace-pre-line">
								{data.headline}
							</h2>
						)}

						{/* Description Paragraph */}
						{data.description && (
							<p className="text-paragraph h5 font-normal leading-relaxed max-w-xl">
								{data.description}
							</p>
						)}

						{/* Stats Columns */}
						{stats.length > 0 && (
							<div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 border-y">
								{stats.map((stat, idx) => (
									<div key={stat.title || idx} className="space-y-1.5">
										<span className="block text-primary small font-medium tracking-wide uppercase">
											{stat.title}
										</span>
										<span className="block h5 font-bold">{stat.number}</span>
									</div>
								))}
							</div>
						)}

						{/* Action Link */}
						<div className="pt-2">
							<Link
								href="#team"
								className="inline-flex items-center gap-1.5 font-bold hover:text-primary transition-colors group w-fit cursor-pointer"
							>
								<span>Learn more</span>
								<ArrowDownIcon className="size-4 transition-transform group-hover:translate-y-0.5" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
