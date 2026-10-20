"use client";

import React from "react";
import TeamCard from "../shared/team-card";
import SectionHeader from "../shared/section-header";
import { SectionCarousel } from "../shared/section-carousel";

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
	return (
		<section className="flex flex-col w-full" id="team">
			<SectionHeader
				subTitle="Trusted Hands, Expert Care"
				title="Meet Our Doctors & Specialists"
				desc="Our team of certified and experienced doctors is dedicated to providing exceptional medical care across every specialty."
				buttonText="view doctors team"
				buttonLink="/doctors"
			/>

			<SectionCarousel
				items={doctors}
				keyExtractor={(doc, ind) => `${doc.name}-${ind}`}
				itemClassName="ps-4 basis-[70%] sm:basis-[40%] md:basis-[40%] lg:basis-1/4"
				contentClassName="-ms-4 p-1"
				showArrows={false}
				renderItem={(doc) => (
					<div className="flex justify-center h-full">
						<TeamCard
							name={doc.name}
							expYears={doc.expYears}
							special={doc.special}
							imgSrc={doc.imgSrc}
						/>
					</div>
				)}
			/>
		</section>
	);
}

export default TeamSection;
