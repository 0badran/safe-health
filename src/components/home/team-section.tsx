"use client";

import React, { useState, useEffect } from "react";
import TeamCard from "../shared/team-card";
import SectionHeader from "../shared/section-header";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface Doctor {
	name: string;
	special: string;
	imgSrc: string;
	expYears: number;
}

const DEFAULT_DOCTORS: Doctor[] = [
	{
		name: "Dr. Ananya Mehta",
		special: "Dermatology",
		imgSrc: "/images/hero-doctor.jpg",
		expYears: 15,
	},
	{
		name: "Dr. Marcus Vance",
		special: "Plastic Surgery",
		imgSrc: "/images/about/team-ceo.jpg",
		expYears: 18,
	},
	{
		name: "Dr. Elena Rostova",
		special: "Aesthetic Care",
		imgSrc: "/images/about/team-cmo.jpg",
		expYears: 12,
	},
	{
		name: "Dr. David Kim",
		special: "Rhinoplasty Specialist",
		imgSrc: "/images/about/team-director.jpg",
		expYears: 14,
	},
	{
		name: "Dr. Sarah Jenkins",
		special: "Hair Restoration",
		imgSrc: "/images/about/team-supervisor.jpg",
		expYears: 10,
	},
	{
		name: "Dr. Tariq Al-Mansoor",
		special: "Dental Aesthetics",
		imgSrc: "/images/blog-author.jpg",
		expYears: 16,
	},
];

export interface TeamSectionProps {
	doctors?: Doctor[];
}

export function TeamSection({ doctors = DEFAULT_DOCTORS }: TeamSectionProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) return;

		const updatePagination = () => {
			setCount(api.scrollSnapList().length);
			setCurrent(api.selectedScrollSnap());
		};

		api.on("select", updatePagination);
		api.on("reInit", updatePagination);

		queueMicrotask(updatePagination);

		return () => {
			api.off("select", updatePagination);
			api.off("reInit", updatePagination);
		};
	}, [api]);

	return (
		<section className="flex flex-col w-full" id="team">
			<SectionHeader
				subTitle="Trusted Hands, Expert Care"
				title="Meet Our Doctors & Specialists"
				desc="Our team of certified and experienced doctors is dedicated to providing exceptional medical care across every specialty."
				buttonText="view doctors team"
				buttonLink="/doctors"
			/>

			<Carousel
				setApi={setApi}
				opts={{
					align: "start",
					loop: false,
				}}
				className="relative w-full"
			>
				<CarouselContent className="-ms-4 p-1">
					{doctors.map((doc, ind) => (
						<CarouselItem
							key={`${doc.name}-${ind}`}
							className="ps-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
						>
							<div className="flex justify-center h-full">
								<TeamCard
									name={doc.name}
									expYears={doc.expYears}
									special={doc.special}
									imgSrc={doc.imgSrc}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="hidden md:flex -inset-s-4 lg:-inset-s-6" />
				<CarouselNext className="hidden md:flex -inset-e-4 lg:-inset-e-6" />
			</Carousel>

			{/* Carousel Indicators / Dots */}
			{count > 1 && (
				<div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
					{Array.from({ length: count }).map((_, index) => (
						<button
							key={index}
							type="button"
							onClick={() => api?.scrollTo(index)}
							aria-label={`Go to slide ${index + 1}`}
							className={cn(
								"transition-all duration-300 cursor-pointer h-2 rounded-full",
								current === index
									? "w-9 bg-secondary"
									: "w-7 bg-secondary/15 hover:bg-secondary/40",
							)}
						/>
					))}
				</div>
			)}
		</section>
	);
}

export default TeamSection;
