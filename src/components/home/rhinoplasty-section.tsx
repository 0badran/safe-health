import Image from "next/image";
import Link from "next/link";
import { SectionBadge } from "@/components/shared/section-badge";
import { Button } from "@/components/ui/button";
import { NaturalResultsIcon, PersonalizedCareIcon } from "@/components/icons";

export function RhinoplastySection() {
	return (
		<section className="w-full py-8 sm:py-12 lg:py-16">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 items-center">
				{/* Left Column: Heading, Badge & CTA */}
				<div className="flex flex-col justify-center">
					<SectionBadge>Rhinoplasty</SectionBadge>

					<h1 className="text-heading mt-4 sm:mt-5">
						Refine Your Profile,
						<br />
						Enhance Your
						<br />
						Beauty
					</h1>

					<p className="text-paragraph leading-relaxed max-w-sm mt-4 sm:mt-5 mb-6 sm:mb-8">
						Discover personalized rhinoplasty treatments designed to enhance
						your facial harmony and natural beauty.
					</p>

					<Link href="/about" className="w-fit">
						<Button variant="outline" size="default" withArrow>
							Learn About Us
						</Button>
					</Link>
				</div>

				{/* Center Column: Arched Profile Photo */}
				<div className="relative flex justify-center items-center">
					<div className="relative w-full max-w-85 sm:max-w-100 aspect-4/5 drop-shadow-[0_20px_40px_rgba(57,37,121,0.08)]">
						<Image
							src="/images/rhinoplasty.png"
							alt="Refine Your Profile - Rhinoplasty"
							fill
							priority
							className="object-contain size-full"
						/>
					</div>
				</div>

				{/* Right Column: Features with Divider */}
				<div className="flex flex-col justify-center gap-6 sm:gap-7 max-w-md lg:ps-4">
					{/* Feature 1: Natural Results */}
					<div className="flex items-start gap-4">
						<NaturalResultsIcon />
						<div className="flex flex-col gap-1">
							<h3 className="font-heading h3 text-primary">
								Natural Results
							</h3>
							<p className="text-paragraph text-sm leading-relaxed">
								Enhancing your features while preserving your natural beauty.
							</p>
						</div>
					</div>

					<div className="h-px w-full bg-border" />

					{/* Feature 2: Personalized Care */}
					<div className="flex items-start gap-4">
						<PersonalizedCareIcon />
						<div className="flex flex-col gap-1">
							<h3 className="font-heading h3 text-primary">
								Personalized Care
							</h3>
							<p className="text-paragraph text-sm leading-relaxed">
								Every procedure is tailored to your unique facial features and
								goals.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default RhinoplastySection;
