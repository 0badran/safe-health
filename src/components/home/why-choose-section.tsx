"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import SectionHeader from "../shared/section-header";
import type { HomeWhyChooseSection } from "@/types/home";
import { useTranslation } from "@/lib/language-context";

export interface CardOverlayProps {
	title: string;
	description: string;
}

export function CardOverlay({
	title,
	description,
}: CardOverlayProps) {
	return (
		<div
			className={cn(
				"absolute inset-x-2.5 sm:inset-x-3 bottom-2.5 sm:bottom-3 rounded-xl bg-primary/54 backdrop-blur-lg px-3.5 sm:px-4 py-2 sm:py-2.5 text-primary-foreground shadow-md border border-primary-foreground/15block md:translate-y-[calc(100%+12px)] md:opacity-0 md:scale-85 transition-all duration-300 ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto"
			)}
		>
			<p className="font-semibold uppercase">{title}</p>
			<p className="small text-primary-foreground mt-0.5">{description}</p>
		</div>
	);
}

export interface WhyChooseSectionProps {
	data?: HomeWhyChooseSection;
}

export function WhyChooseSection({ data }: WhyChooseSectionProps = {}) {
	const { t } = useTranslation();

	if (!data || !data.headline) return null;

	const title = data.headline;
	const subTitle = data.tag_text;
	const description = data.description;
	const cards = data.feature_card;

	if (!cards || cards.length < 4) {
		return null;
	}

	const [card1, card2, card3, card4] = cards;

	return (
		<section className="w-full">
			<SectionHeader
				title={title}
				subTitle={subTitle}
				align="center"
			/>

			<div className="grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-5">
				{/* 1. Description & Action Button: On mobile appears first below title, on desktop in Column 3 Row 1 */}
				<div className="col-span-2 order-1 flex flex-col justify-center gap-4 pb-1 sm:pb-2 md:order-0 md:col-span-1 md:col-start-3 md:row-start-1 md:pb-0">
					<p className="text-paragraph h5 leading-relaxed">
						{description}
					</p>

					<Link href="/about" className="w-fit">
						<Button variant="outline" size="default" withArrow>
							{t("navbar.aboutUs")}
						</Button>
					</Link>
				</div>

				{/* 2. Aesthetic Care Card: On mobile appears 2nd (full width), on desktop Column 1 Row 1 */}
				<div className="group relative col-span-2 order-2 h-52 sm:h-64 w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs bg-muted md:order-0 md:col-span-1 md:col-start-1 md:row-start-1 md:h-52.5">
					<Image
						src={card1.image || "/images/why-choose/aesthetic-care.jpg"}
						alt={card1.title}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
						className="object-cover size-full transition-transform duration-500 group-hover:scale-105"
					/>
					<CardOverlay
						title={card1.title}
						description={card1.description}
					/>
				</div>

				{/* 3. Patient Focus Card: On mobile appears 3rd (full width), on desktop Column 1 Row 2 */}
				<div className="group relative col-span-2 order-3 h-52 sm:h-64 w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs bg-muted md:order-0 md:col-span-1 md:col-start-1 md:row-start-2 md:h-52.5">
					<Image
						src={card2.image || "/images/why-choose/patient-focus.png"}
						alt={card2.title}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
						className="object-cover size-full transition-transform duration-500 group-hover:scale-105"
					/>
					<CardOverlay
						title={card2.title}
						description={card2.description}
					/>
				</div>

				{/* 4. Global Travel Card: On mobile appears 4th (left side of bottom 2-column row), on desktop Column 3 Row 2 */}
				<div className="group relative col-span-1 order-4 aspect-3/4 sm:aspect-4/5 w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs bg-muted md:order-0 md:col-span-1 md:col-start-3 md:row-start-2 md:aspect-auto md:h-52.5">
					<Image
						src={card3.image || "/images/why-choose/global-travel.png"}
						alt={card3.title}
						fill
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
						className="object-cover size-full transition-transform duration-500 group-hover:scale-105"
					/>
					<CardOverlay
						title={card3.title}
						description={card3.description}
					/>
				</div>

				{/* 5. Doctor Handshake Tall Card: On mobile appears 5th (right side of bottom 2-column row), on desktop Column 2 spanning Rows 1 & 2 */}
				<div className="group relative col-span-1 order-5 aspect-3/4 sm:aspect-4/5 w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs bg-muted md:order-0 md:col-span-1 md:col-start-2 md:row-start-1 md:row-span-2 md:aspect-auto md:h-full md:min-h-110">
					<Image
						src={card4.image || "/images/why-choose/doctor-handshake.jpg"}
						alt={card4.title}
						fill
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
						className="object-cover size-full transition-transform duration-500 group-hover:scale-105"
					/>
					<CardOverlay
						title={card4.title}
						description={card4.description}
					/>
				</div>
			</div>
		</section>
	);
}

export default WhyChooseSection;

