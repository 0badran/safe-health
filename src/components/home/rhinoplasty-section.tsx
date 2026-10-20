import Image from "next/image";
import Link from "next/link";
import { SectionBadge } from "@/components/shared/section-badge";
import { Button } from "@/components/ui/button";
import { NaturalResultsIcon, PersonalizedCareIcon } from "@/components/icons";

export function RhinoplastySection() {
	return (
		<section className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 items-center">
			{/* Left Column: Heading, Badge & CTA */}
			<div className="flex flex-col justify-center">
				<SectionBadge>Rhinoplasty</SectionBadge>

				<h1 className="text-heading mt-3 sm:mt-5 ">
					<span className="text-nowrap">Refine Your Profile,</span>
					{" "}
					<br className="hidden lg:block" />
					Enhance Your{" "}
					<br className="hidden lg:block" />
					Beauty
				</h1>

				<p className="text-paragraph leading-relaxed lg:max-w-sm mt-3 md:mt-5 mb-6 md:mb-8">
					Discover personalized rhinoplasty treatments designed to enhance your
					facial harmony and natural beauty.
				</p>

				<Link href="/about" className="w-fit">
					<Button variant="outline" size="default" withArrow>
						Get a Free Consultation
					</Button>
				</Link>
			</div>

			{/* Center Column: Arched Profile Photo */}
			<div className="relative  flex justify-center items-center">
				<div className="relative w-full sm:max-w-100 aspect-374/419">
					<Image
						src="/images/nosee.png"
						alt="Refine Your Profile - Rhinoplasty"
						fill
						priority
						sizes="(max-width: 640px) 100vw, 400px"
						className="object-contain size-full"
					/>
				</div>
			</div>

			{/* Right Column: Features with Divider */}
			<div className="flex max-sm:flex-wrap max-sm:col-span-1 max-lg:col-span-2 lg:flex-col justify-center gap-6 sm:gap-7  lg:max-w-md lg:ps-4">
				{/* Feature 1: Natural Results */}
				<div className="flex  items-start gap-4">
					<NaturalResultsIcon />
					<div className="flex flex-col gap-1">
						<h3 className="font-heading h3 text-primary">Natural Results</h3>
						<p className="text-paragraph text-sm leading-relaxed">
							Enhancing your features while preserving your natural beauty.
						</p>
					</div>
				</div>

				<div className="h-px w-full bg-border max-lg:hidden" />

				{/* Feature 2: Personalized Care */}
				<div className="flex items-start gap-4">
					<PersonalizedCareIcon />
					<div className="flex flex-col gap-1">
						<h3 className="font-heading h3 text-primary">Personalized Care</h3>
						<p className="text-paragraph text-sm leading-relaxed">
							Every procedure is tailored to your unique facial features and
							goals.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default RhinoplastySection;
