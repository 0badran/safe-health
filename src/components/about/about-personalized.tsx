"use client";

import SectionHeader from "../shared/section-header";
import Image from "next/image";
import { Card } from "../ui/card";
import type { GlobalReachSection } from "@/types/about";
import { motion } from "framer-motion";
import {
	ComposableMap,
	Geographies,
	Geography,
	Line,
	Marker,
} from "react-simple-maps";

export interface AboutPersonalizedProps {
	data?: GlobalReachSection;
}

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const GEO_URL =
	"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const HUB_COORDS: [number, number] = [31.2357, 30.0444];

const DEFAULT_COUNTRY_MARKERS: {
	name: string;
	coordinates: [number, number];
	flag: string;
	offset: [number, number];
}[] = [
	{
		name: "Germany",
		coordinates: [10.4515, 51.1657],
		flag: "🇩🇪",
		offset: [-45, -28],
	},
	{
		name: "Canada",
		coordinates: [-106.3468, 56.1304],
		flag: "🇨🇦",
		offset: [-40, -28],
	},
	{
		name: "Brazil",
		coordinates: [-51.9253, -14.235],
		flag: "🇧🇷",
		offset: [-38, -28],
	},
	{
		name: "Pakistan",
		coordinates: [69.3451, 30.3753],
		flag: "🇵🇰",
		offset: [-42, -28],
	},
	{
		name: "Australia",
		coordinates: [133.7751, -25.2744],
		flag: "🇦🇺",
		offset: [-45, -28],
	},
];



export function AboutPersonalized({ data }: AboutPersonalizedProps = {}) {
	if (!data) return null;

	const features = data.feature_card ?? [];

	const apiMarkers = (data.map_countries ?? [])
		.map((country) => {
			const lng = Number(country.longitude);
			const lat = Number(country.latitude);
			if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
			return {
				name: country.name,
				flag: country.flag,
				coordinates: [lng, lat] as [number, number],
				offset: [-42, -28] as [number, number],
			};
		})
		.filter((item): item is NonNullable<typeof item> => item !== null);

	const countryMarkers =
		apiMarkers.length > 0 ? apiMarkers : DEFAULT_COUNTRY_MARKERS;

	return (
		<section>
			{data.headline && (
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={{ duration: 0.6, ease: EASE }}
				>
					<SectionHeader
						title={data.headline}
						subTitle={data.tag_text}
						desc={data.description}
					/>
				</motion.div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
				{features.length > 0 && (
					<div className="flex flex-col gap-4">
						{features.map((item, index) => (
							<motion.div
								key={item.title || index}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-40px" }}
								transition={{
									duration: 0.55,
									delay: index * 0.15,
									ease: EASE,
								}}
							>
								<Card className="flex-row px-4">
									{item.icon && (
										<div className="bg-secondary/10 size-12 rounded-full flex items-center justify-center shrink-0">
											{typeof item.icon === "string" ? (
												<div className="relative size-6">
													<Image
														src={item.icon}
														alt={item.title}
														fill
														className="object-contain"
													/>
												</div>
											) : (
												item.icon
											)}
										</div>
									)}
									<div>
										<h3 className="font-heading h5 mb-1">{item.title}</h3>
										<p className="text-paragraph small leading-relaxed">
											{item.description}
										</p>
									</div>
								</Card>
							</motion.div>
						))}
					</div>
				)}

				{/* Interactive World Map with react-simple-maps */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: 24 }}
					whileInView={{ opacity: 1, scale: 1, y: 0 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
					className="relative w-full"
				>
					<div className="flex items-center justify-between gap-2 mb-2">
						<span className="inline-flex items-center gap-2 small font-medium text-primary">
							<span className="size-2.5 rounded-full bg-secondary animate-pulse" />
							Active Sanctuaries
						</span>
					</div>

					<div className="w-full aspect-4/3">
						<ComposableMap
							projection="geoMercator"
							projectionConfig={{
								scale: 120,
								center: [10, 20],
							}}
							width={800}
							height={520}
							className="size-full"
						>
							<Geographies geography={GEO_URL}>
								{({ geographies }) =>
									geographies
										.filter((geo) => geo.properties?.name !== "Antarctica")
										.map((geo) => (
											<Geography
												key={geo.rsmKey}
												geography={geo}
												fill="var(--muted)"
												stroke="var(--background)"
												strokeWidth={0.75}
												className="outline-none"
											/>
										))
								}
							</Geographies>

							{/* Patient Pathway Lines */}
							{countryMarkers.map((marker, idx) => (
								<Line
									key={`line-${marker.name}-${idx}`}
									from={marker.coordinates}
									to={HUB_COORDS}
									stroke="var(--secondary)"
									strokeWidth={1.25}
									strokeDasharray="4 4"
									strokeLinecap="round"
									strokeOpacity={0.55}
								/>
							))}

						
							{/* Featured Country Markers with Badges */}
							{countryMarkers.map((marker, idx) => (
								<Marker
									key={`${marker.name}-${idx}`}
									coordinates={marker.coordinates}
								>
									<circle
										r={5}
										fill="var(--secondary)"
										stroke="var(--background)"
										strokeWidth={2}
									/>
									<foreignObject
										x={marker.offset[0]}
										y={marker.offset[1]}
										width={110}
										height={32}
										className="overflow-visible pointer-events-none"
									>
										<div className="inline-flex items-center gap-1.5 rounded-lg bg-card px-2.5 py-1 shadow-sm border border-border/60 whitespace-nowrap">
											{marker.flag &&
											(marker.flag.startsWith("http") ||
												marker.flag.startsWith("/")) ? (
												<img
													src={marker.flag}
													alt={marker.name}
													className="size-4 object-contain shrink-0"
												/>
											) : (
												<span className="leading-none">{marker.flag}</span>
											)}
											<span className="small font-medium text-foreground leading-none">
												{marker.name}
											</span>
										</div>
									</foreignObject>
								</Marker>
							))}
						</ComposableMap>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

export default AboutPersonalized;
