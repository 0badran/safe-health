import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../shared/section-header";

export interface CardOverlayProps {
	title: string;
	description: string;
	withHoverEffect?: boolean;
}

export function CardOverlay({
	title,
	description,
	withHoverEffect = false,
}: CardOverlayProps) {
	return (
		<div
			className={cn(
				"absolute inset-x-3 bottom-3 rounded-xl bg-primary/54 backdrop-blur-lg px-4 py-2.5 text-primary-foreground shadow-md border border-primary-foreground/15",
				withHoverEffect &&
					"translate-y-[calc(100%+12px)] opacity-0 scale-3d scale-85 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto",
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

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{/* Left Column: 2 Stacked Cards */}
				<div className="flex flex-col gap-5 justify-between">
					{/* Top Card: Aesthetic Care */}
					<div className="group relative h-48 lg:h-52.5 w-full rounded-2xl overflow-hidden shadow-xs bg-muted">
						<Image
							src="/images/why-choose/aesthetic-care.jpg"
							alt="Aesthetic Skin Care"
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className="object-cover size-full"
						/>
						<CardOverlay
							title="AESTHETIC CARE"
							description="Personalized aesthetic care guided by certified specialists."
							withHoverEffect
						/>
					</div>

					{/* Bottom Card: Patient Focus with Quality Care Overlay (Static, No Hover) */}
					<div className="relative h-48 lg:h-52.5 w-full rounded-2xl overflow-hidden shadow-xs bg-muted">
						<Image
							src="/images/why-choose/patient-focus.png"
							alt="Patient Focus"
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className="object-cover size-full"
						/>
						<CardOverlay
							title="QUALITY CARE"
							description="Connecting you with quality-focused healthcare services."
						/>
					</div>
				</div>

				{/* Middle Column: Doctor Handshake Tall Card */}
				<div className="group relative min-h-85 lg:min-h-110 h-full w-full rounded-2xl overflow-hidden shadow-xs bg-muted">
					<Image
						src="/images/why-choose/doctor-handshake.jpg"
						alt="Trusted Medical Care"
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						className="object-cover size-full"
					/>
					<CardOverlay
						title="TRUSTED EXPERTS"
						description="Certified doctors committed to your safety and care."
						withHoverEffect
					/>
				</div>

				{/* Right Column: Text & CTA + Global Travel Image */}
				<div className="flex flex-row lg:flex-col justify-center gap-5 col-span-2 lg:col-span-1">
					{/* Description & Action Button */}
					<div className="flex-col gap-4 hidden sm:flex">
						<p className="text-paragraph h5 mt-10">
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

					{/* Bottom Image: Global Medical Journey */}
					<div className="group relative h-48 lg:h-52.5 w-full rounded-2xl overflow-hidden shadow-xs">
						<Image
							src="/images/why-choose/global-travel.png"
							alt="Making your healthcare journey across borders easier"
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className="object-cover size-full"
						/>
						<CardOverlay
							title="GLOBAL ACCESS"
							description="Making your healthcare journey across borders seamless."
							withHoverEffect
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default WhyChooseSection;
