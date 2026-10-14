import Image from "next/image";
import Link from "next/link";
import { SectionBadge } from "@/components/shared/section-badge";
import { Button } from "@/components/ui/button";

export function WhyChooseSection() {
	return (
		<section className="w-full">
			<div className="flex flex-col items-center text-center mb-8 sm:mb-12">
				<SectionBadge>TRUSTED CARE, WORLDWIDE</SectionBadge>
				<h1 className="text-heading mt-3 sm:mt-4">Why Choose SafeHealthMe?</h1>
			</div>

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{/* Left Column: 2 Stacked Cards */}
				<div className="flex flex-col gap-5 justify-between">
					{/* Top Card: Aesthetic Care */}
					<div className="relative h-48 lg:h-52.5 w-full rounded-2xl overflow-hidden shadow-xs bg-muted">
						<Image
							src="/images/why-choose/aesthetic-care.jpg"
							alt="Aesthetic Skin Care"
							fill
							className="object-cover size-full transition-transform duration-500 hover:scale-105"
						/>
					</div>

					{/* Bottom Card: Patient Focus with Quality Care Overlay */}
					<div className="relative h-48 lg:h-52.5 w-full rounded-2xl overflow-hidden shadow-xs bg-muted">
						<Image
							src="/images/why-choose/patient-focus.png"
							alt="Patient Focus"
							fill
							className="object-cover size-full"
						/>

						{/* Quality Care Overlay */}
						<div className="absolute inset-x-3 bottom-3 rounded-xl bg-primary/54 backdrop-blur-md px-4 py-2.5 text-white shadow-md">
							<p className="font-semibold uppercase">QUALITY CARE</p>
							<p className="small text-wallpaper mt-0.5">
								Connecting you with quality-focused healthcare services.
							</p>
						</div>
					</div>
				</div>

				{/* Middle Column: Doctor Handshake Tall Card */}
				<div className="relative min-h-85 lg:min-h-110 h-full w-full rounded-2xl overflow-hidden shadow-xs bg-muted">
					<Image
						src="/images/why-choose/doctor-handshake.jpg"
						alt="Trusted Medical Care"
						fill
						className="object-cover size-full transition-transform duration-500 hover:scale-105"
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
					<div className="relative h-48 lg:h-52.5 w-full rounded-2xl overflow-hidden shadow-xs">
						<Image
							src="/images/why-choose/global-travel.png"
							alt="Making your healthcare journey across borders easier"
							fill
							className="object-cover size-full transition-transform duration-500 hover:scale-105"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default WhyChooseSection;
