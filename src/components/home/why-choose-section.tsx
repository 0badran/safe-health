import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../shared/section-header";

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

export function WhyChooseSection() {
	return (
		<section className="w-full">
			<SectionHeader
				title="Why Choose SafeHealthMe?"
				subTitle="TRUSTED CARE, WORLDWIDE"
				align="center"
			/>

			<div className="grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-5">
				{/* 1. Description & Action Button: On mobile appears first below title, on desktop in Column 3 Row 1 */}
				<div className="col-span-2 order-1 flex flex-col justify-center gap-4 pb-1 sm:pb-2 md:order-0 md:col-span-1 md:col-start-3 md:row-start-1 md:pb-0">
					<p className="text-paragraph h5 leading-relaxed">
						We connect your healthcare needs with personalized care and
						trusted medical experiences, making your journey smoother and more
						reassuring.
					</p>

					<Link href="/about" className="w-fit">
						<Button variant="outline" size="default" withArrow>
							Learn About Us
						</Button>
					</Link>
				</div>

				{/* 2. Aesthetic Care Card: On mobile appears 2nd (full width), on desktop Column 1 Row 1 */}
				<div className="group relative col-span-2 order-2 h-52 sm:h-64 w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs bg-muted md:order-0 md:col-span-1 md:col-start-1 md:row-start-1 md:h-52.5">
					<Image
						src="/images/why-choose/aesthetic-care.jpg"
						alt="Aesthetic Skin Care"
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
						className="object-cover size-full transition-transform duration-500 group-hover:scale-105"
					/>
					<CardOverlay
						title="AESTHETIC CARE"
						description="Personalized aesthetic care guided by certified specialists."
					/>
				</div>

				{/* 3. Patient Focus Card: On mobile appears 3rd (full width), on desktop Column 1 Row 2 */}
				<div className="group relative col-span-2 order-3 h-52 sm:h-64 w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs bg-muted md:order-0 md:col-span-1 md:col-start-1 md:row-start-2 md:h-52.5">
					<Image
						src="/images/why-choose/patient-focus.png"
						alt="Patient Focus"
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
						className="object-cover size-full transition-transform duration-500 group-hover:scale-105"
					/>
					<CardOverlay
						title="QUALITY CARE"
						description="Connecting you with quality-focused healthcare services."
					/>
				</div>

				{/* 4. Global Travel Card: On mobile appears 4th (left side of bottom 2-column row), on desktop Column 3 Row 2 */}
				<div className="group relative col-span-1 order-4 aspect-3/4 sm:aspect-4/5 w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs bg-muted md:order-0 md:col-span-1 md:col-start-3 md:row-start-2 md:aspect-auto md:h-52.5">
					<Image
						src="/images/why-choose/global-travel.png"
						alt="Making your healthcare journey across borders easier"
						fill
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
						className="object-cover size-full transition-transform duration-500 group-hover:scale-105"
					/>
					<CardOverlay
						title="GLOBAL ACCESS"
						description="Making your healthcare journey across borders seamless."
					/>
				</div>

				{/* 5. Doctor Handshake Tall Card: On mobile appears 5th (right side of bottom 2-column row), on desktop Column 2 spanning Rows 1 & 2 */}
				<div className="group relative col-span-1 order-5 aspect-3/4 sm:aspect-4/5 w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs bg-muted md:order-0 md:col-span-1 md:col-start-2 md:row-start-1 md:row-span-2 md:aspect-auto md:h-full md:min-h-110">
					<Image
						src="/images/why-choose/doctor-handshake.jpg"
						alt="Trusted Medical Care"
						fill
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
						className="object-cover size-full transition-transform duration-500 group-hover:scale-105"
					/>
					<CardOverlay
						title="TRUSTED EXPERTS"
						description="Certified doctors committed to your safety and care."
					/>
				</div>
			</div>
		</section>
	);
}

export default WhyChooseSection;

