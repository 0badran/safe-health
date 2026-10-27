import { FallbackImage } from "@/components/shared/fallback-image";
import SectionHeader from "../shared/section-header";
import Image from "next/image";
import { Card } from "../ui/card";
import type { GlobalReachSection } from "@/types/about";

export interface AboutPersonalizedProps {
	data?: GlobalReachSection;
}

export function AboutPersonalized({ data }: AboutPersonalizedProps = {}) {
	if (!data) return null;

	const features = data.feature_card ?? [];

	return (
		<section>
			{data.headline && (
				<SectionHeader
					title={data.headline}
					subTitle={data.tag_text}
					desc={data.description}
				/>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
				{features.length > 0 && (
					<div className="flex flex-col gap-4">
						{features.map((item, index) => (
							<Card
								key={item.title || index}
								className="flex-row px-4 shadow-md"
							>
								{item.icon && (
									<div className="bg-secondary/10 size-12 rounded-full flex items-center justify-center shrink-0">
										{typeof item.icon === "string" ? (
											<div className="relative size-6">
												<Image
													src={item.icon}
													alt={item.title}
													fill
													className="object-contain"
												/>
											</div>
										) : (
											item.icon
										)}
									</div>
								)}
								<div>
									<h3 className="font-heading h5 mb-1">{item.title}</h3>
									<p className="text-paragraph small leading-relaxed">
										{item.description}
									</p>
								</div>
							</Card>
						))}
					</div>
				)}

				{/* Map Image with FallbackImage */}
				<div className="relative aspect-4/3 w-full overflow-hidden">
					<FallbackImage
						src={data.map_image}
						fallbackSrc="/images/global-flight.png"
						alt={data.headline || "Global patient reach at SafeHealthMe"}
						fill
						priority
						sizes="(max-width: 1024px) 100vw, 50vw"
						className="object-contain"
					/>
				</div>
			</div>
		</section>
	);
}

export default AboutPersonalized;
