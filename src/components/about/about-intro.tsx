import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon } from "lucide-react";

export function AboutIntro() {
	const stats = [
		{
			label: "INTERNATIONAL PATIENTS",
			value: "50+ Countries",
		},
		{
			label: "Continuous Support",
			value: "24/7",
		},
		{
			label: "Treatments",
			value: "10+",
		},
	];

	return (
		<section>
			<div className="container max-w-7xl">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
					{/* Left: Treatment Photo */}
					<div className="lg:col-span-6">
						<div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-xl border border-border/40">
							<Image
								src="/images/why-choose/aesthetic-care.jpg"
								alt="Advanced aesthetic treatment at SafeHealthMe"
								fill
								priority
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover object-center transition-transform duration-700 scale-3d scale-x-[-1] hover:scale-102"
							/>
						</div>
					</div>

					{/* Right: Content & Stats */}
					<div className="lg:col-span-6 flex flex-col gap-y-4">
						{/* Two-line Gradient Heading */}
						<h2 className="text-heading leading-tight">
							Enhancing Beauty.
							<br />
							Preserving Identity.
						</h2>

						{/* Description Paragraph */}
						<p className="text-paragraph h5 font-normal leading-relaxed max-w-xl">
							At SafeHealthMe, we bring together medical expertise, advanced
							aesthetic treatments, and personalized care to help every patient
							feel confident in their choices.
						</p>

						{/* 3 Stats Columns */}
						<div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 border-y">
							{stats.map((stat) => (
								<div key={stat.label} className="space-y-1.5">
									<span className="block text-primary small font-medium tracking-wide uppercase">
										{stat.label}
									</span>
									<span className="block h5 font-bold">
										{stat.value}
									</span>
								</div>
							))}
						</div>

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
