"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TeamCardProps {
	imgSrc?: string | null;
	expYears?: number | null;
	name: string;
	specialties?: string[];
	className?: string;
}

export default function TeamCard({
	imgSrc,
	expYears,
	name,
	specialties = [],
	className,
}: TeamCardProps) {
	const [showAllSpecialties, setShowAllSpecialties] = useState(false);

	const safeImg = imgSrc || "/images/hero-doctor.jpg";

	const firstSpecialty = specialties[0];
	const remainingSpecialties = specialties.slice(1);
	const remainingCount = remainingSpecialties.length;

	return (
		<div
			data-figma="Card"
			className={cn(
				"group relative flex flex-col justify-end w-full max-w-87.5 min-h-73.5 p-4 rounded-2xl bg-muted border border-border/50 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md",
				className,
			)}
		>
			{/* Doctor Portrait Image */}
			<Image
				src={safeImg}
				alt={name}
				fill
				sizes="(max-width: 640px) 100vw, 350px"
				className="object-cover object-[79%_0%] transition-transform duration-500 group-hover:scale-105"
			/>

			{/* Subtle gradient overlay at bottom for contrast */}
			<div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

			{/* Doctor Details */}
			<div
				data-figma="Doctor Details"
				className="relative z-10 flex flex-col gap-2 p-3 sm:p-3.5 min-h-17.5 rounded-[17px] bg-card/95 backdrop-blur-md text-card-foreground shadow-md border border-border/40 transition-all duration-300"
			>
				{/* Doctor Name */}
				<h3 className="font-heading font-semibold text-foreground leading-tight">
					{name}
				</h3>

				{/* Specialty & Expand Button */}
				{firstSpecialty && (
					<div
						data-figma="Doctor Speciality"
						className="flex flex-wrap items-center gap-1.5"
					>
						<span className="small text-muted-foreground font-medium">
							{firstSpecialty}
						</span>

						{remainingCount > 0 && (
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									setShowAllSpecialties((prev) => !prev);
								}}
								className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-secondary/15 hover:bg-secondary/25 text-secondary text-xs font-medium transition-colors cursor-pointer"
								aria-label="Toggle specialties"
								title={remainingSpecialties.join(", ")}
							>
								<span>+{remainingCount}</span>
								<ChevronDown
									className={cn(
										"size-3 transition-transform duration-200",
										showAllSpecialties && "rotate-180",
									)}
								/>
							</button>
						)}
					</div>
				)}

				{/* Expanded Remaining Specialties List */}
				{showAllSpecialties && remainingCount > 0 && (
					<div className="flex flex-wrap gap-1 pt-1.5 border-t border-border/40 animate-in fade-in slide-in-from-top-1 duration-200 max-h-24 overflow-y-auto">
						{remainingSpecialties.map((item, idx) => (
							<span
								key={`${item}-${idx}`}
								className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-normal"
							>
								{item}
							</span>
						))}
					</div>
				)}

				{/* Experience Years */}
				{expYears !== undefined && expYears !== null && (
					<span
						data-figma="15+ Years of Experience"
						className="small text-muted-foreground/80 leading-tight"
					>
						{expYears}+ Years of Experience
					</span>
				)}
			</div>
		</div>
	);
}
