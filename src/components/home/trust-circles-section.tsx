"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export interface TrustCircleItem {
	id?: string | number;
	title: string;
	description: string;
	icon?: React.ReactNode | string | null;
}

export function CertifiedDoctorIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 64 64"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			{/* Doctor Head */}
			<circle cx="35" cy="18" r="8" />
			{/* Parted Hair */}
			<path d="M28 17c1.5-3.5 6-5.5 11.5-3.5 2.5 1 3.5 3.5 3.5 3.5" />
			{/* Smile */}
			<path d="M33 20c.8 1 2.2 1 3 0" />
			{/* Stethoscope */}
			<path d="M31 26v4a4 4 0 0 0 8 0v-4" />
			<circle cx="39" cy="33" r="1.5" fill="currentColor" />
			{/* Doctor Shoulders & Coat */}
			<path d="M29 33c-5 2-9 6-9 12h29c0-6-4-10-9-12" />
			<path d="M32 33v12" />
			<path d="M37 33v12" />
			{/* Rosette Medal / Badge */}
			<circle cx="21" cy="40" r="6" className="fill-background" />
			<path d="M21 34.5l1.5 1.5 2-.5-.5 2 1.5 1.5-2 .5v2l-2-1.5-2 1.5v-2l-2-.5 1.5-1.5-.5-2 2 .5z" />
			{/* Cross inside badge */}
			<path d="M21 38v4M19 40h4" strokeWidth="1.6" />
			{/* Ribbon tails */}
			<path d="M18.5 45l-2 6 4.5-2 4.5 2-2-6" />
		</svg>
	);
}

export function ModernEquipmentIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 64 64"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			{/* Stand / Floor Base */}
			<path d="M20 52h24" />
			<path d="M32 52v-6" />
			<path d="M26 46h12" />
			{/* Reclined Dental/Exam Chair */}
			<path d="M19 41h15l5-8h8" />
			<path d="M19 41l-3 5h-4" />
			{/* Backrest & Headrest */}
			<path d="M34 33l-7-14h-4" />
			<rect x="22" y="14" width="7" height="4" rx="2" />
			{/* Armrest */}
			<path d="M26 35h8" />
			{/* Articulated Lamp Arm */}
			<path d="M41 33l6-10-4-6" />
			{/* Overhead Exam Lamp Head */}
			<ellipse
				cx="38"
				cy="18"
				rx="4.5"
				ry="2.8"
				transform="rotate(-30 38 18)"
			/>
		</svg>
	);
}

export function PatientPrivacyIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 64 64"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			{/* Patient Head */}
			<circle cx="32" cy="18" r="6" />
			{/* Shoulders */}
			<path d="M20 39c0-6 5-10 12-10s12 4 12 10" />
			{/* Security Shield */}
			<path
				d="M32 29l10 4v8c0 7-6 12-10 14-4-2-10-7-10-14v-8l10-4z"
				className="fill-background"
			/>
			{/* Verified Checkmark inside Shield */}
			<path d="M28 40l3 3 6-6" strokeWidth="2" />
		</svg>
	);
}

export function SeamlessExperienceIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 64 64"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			{/* Cupped Hand */}
			<path d="M15 48h14l8-4c2-1 4-1 6 0l4 2" />
			<path d="M15 48v-5c0-1.5 1-2.5 2.5-2.5h8.5l9 3" />
			<path d="M15 43h-4v5h4" />
			{/* Cogwheel / Gear */}
			<path d="M43 14v3m0 20v3m-13-13h3m20 0h3m-19.8-7.8l2.1 2.1m14.2 14.2l2.1 2.1m-18.4 0l2.1-2.1m14.2-14.2l2.1-2.1" />
			<circle cx="43" cy="27" r="9.5" />
			{/* Star inside Gear */}
			<path
				d="M43 22l1.5 3.5 3.8.4-2.8 2.6.8 3.7-3.3-1.9-3.3 1.9.8-3.7-2.8-2.6 3.8-.4z"
				fill="currentColor"
				stroke="none"
			/>
		</svg>
	);
}

const DEFAULT_ICONS = [
	<CertifiedDoctorIcon
		key="doc"
		className="size-8 md:size-14 text-secondary"
	/>,
	<ModernEquipmentIcon key="eq" className="size-8 md:size-14 text-secondary" />,
	<PatientPrivacyIcon
		key="priv"
		className="size-8 md:size-14 text-secondary"
	/>,
	<SeamlessExperienceIcon
		key="exp"
		className="size-8 md:size-14 text-secondary"
	/>,
];

function renderFeatureIcon(
	icon: React.ReactNode | string | null | undefined,
	index: number,
	title: string,
) {
	if (typeof icon === "string" && icon.trim().length > 0) {
		return (
			<div className="relative size-8 md:size-14 shrink-0">
				<Image
					src={icon}
					alt={title}
					fill
					sizes="56px"
					className="object-contain"
				/>
			</div>
		);
	}
	if (React.isValidElement(icon)) {
		return icon;
	}
	return DEFAULT_ICONS[index % DEFAULT_ICONS.length];
}

export interface TrustCirclesSectionProps {
	features?: TrustCircleItem[];
}

export function TrustCirclesSection({
	features,
}: TrustCirclesSectionProps = {}) {
	if (!features || features.length === 0) {
		return null;
	}

	return (
		<section className="w-full grid grid-cols-2 xl:w-[90%] max-sm:gap-2 sm:flex justify-items-center items-center sm:justify-center sm:lg:min-w-0 mx-auto sm:-space-x-4 sm:rtl:space-x-4">
			{features.map((item, index) => (
				<motion.div
					key={item.id ?? item.title ?? index}
					initial={{ opacity: 0, y: 24, scale: 0.92 }}
					whileInView={{ opacity: 1, y: 0, scale: 1 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={{
						duration: 0.55,
						delay: index * 0.14,
						ease: EASE,
					}}
					className="group relative flex aspect-square shrink-0 flex-col items-center justify-center rounded-full bg-background/50 p-2 text-center overflow-hidden w-full sm:w-1/4"
				>
					<svg
						className="absolute inset-0 size-full"
						viewBox="0 0 100 100"
						fill="none"
					>
						<defs>
							<linearGradient id={`g${index}`} x1="0" y1="0" x2="1" y2="1">
								<stop
									offset="0%"
									stopColor={index % 2 === 0 ? "var(--secondary)" : "#fff"}
								/>
								<stop
									offset="100%"
									stopColor={index % 2 === 0 ? "#fff" : "var(--secondary)"}
								/>
							</linearGradient>
						</defs>
						<circle
							cx="50"
							cy="50"
							r="49"
							stroke={`url(#g${index})`}
							strokeWidth="0.4"
							strokeDasharray="2 1.5"
						/>
					</svg>

					{/* Bottom Teal Gradient Glow */}
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 h-7 rounded-b-full bg-linear-to-t from-secondary/20 via-secondary/10 to-transparent transition-all duration-500 group-hover:h-52 lg:group-hover:h-60"
						aria-hidden="true"
					/>

					{/* Icon */}
					<div className="relative z-10 mb-3 sm:mb-4">
						{renderFeatureIcon(item.icon, index, item.title)}
					</div>

					{/* Title in Merienda cursive */}
					<h3 className="relative z-10 font-heading lg:h4 text-primary leading-tight font-bold">
						{item.title}
					</h3>

					{/* Description */}
					<p className="relative z-10 small text-paragraph leading-relaxed mt-2 px-2">
						{item.description}
					</p>
				</motion.div>
			))}
		</section>
	);
}

export default TrustCirclesSection;