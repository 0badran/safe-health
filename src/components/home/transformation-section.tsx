import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TransformationSection() {
	return (
		<section className="relative w-full h-60 md:h-100 rounded-3xl overflow-hidden flex items-center translate-y-[7%] z-1">
			{/* Background Poster Image */}
			<Image
				src="/images/transformation-banner.png"
				alt="Ready For Your Transformation"
				fill
				priority
				sizes="100vw"
				className="object-cover object-[0_38%] pointer-events-none select-none"
			/>

			{/* Tailwind Gradient Layer */}
			<div
				className="absolute inset-0 bg-linear-[92.73deg] from-white/48 from-[9.33%] to-primary/24 to-[70.17%] pointer-events-none"
				aria-hidden="true"
			/>

			{/* Content */}
			<div className="relative z-10 flex flex-col justify-center items-start px-6 flex-1">
				<h2 className="font-heading italic text-primary h2 leading-tight tracking-tight">
					Ready For Your Transformation?
				</h2>

				<p className="text-paragraph h5 mt-3 leading-tight max-w-lg line-clamp-2 sm:line-clamp-none">
					Take the first step toward feeling confident in your own skin. Our
					specialists are here to guide you every step of the way.
				</p>

				<div className="mt-6 sm:mt-8">
					<Link href="/contact">
						<Button variant="default" withArrow>
							Get A Free Consultation
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
