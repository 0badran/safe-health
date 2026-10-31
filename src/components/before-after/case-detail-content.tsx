"use client";

import { ConsultationDrawer } from "@/components/consultation/consultation-drawer";
import { FallbackImage } from "@/components/shared/fallback-image";
import { PageHeader } from "@/components/shared/page-header";
import { SectionBadge } from "@/components/shared/section-badge";
import { Button } from "@/components/ui/button";
import useFetchData from "@/hooks/use-fetch-data";
import { Link } from "@/i18n/navigation";
import { useTranslation } from "@/lib/language-context";
import type { ApiResponse } from "@/types/api";
import type { CaseItem } from "@/types/before-after";
import {
	ArrowRightIcon,
	CalendarCheckIcon,
	ChevronsLeftRight,
	MapPin,
} from "lucide-react";
import * as React from "react";
import { CaseDetailSkeleton } from "./case-detail-skeleton";

export interface CaseDetailContentProps {
	slug: string;
	initialCase?: CaseItem | null;
}

export function CaseDetailContent({
	slug,
	initialCase,
}: CaseDetailContentProps) {
	const { t } = useTranslation();

	const {
		data: apiResponse,
		isLoading,
		isError,
	} = useFetchData<ApiResponse<CaseItem>>({
		route: `/cases/${slug}`,
		initialData: initialCase
			? {
					key: "success",
					message: "success",
					data: initialCase,
				}
			: undefined,
	});

	const caseItem = apiResponse?.data ?? initialCase;

	// Slider position percentage (0 to 100, default 50%)
	const [sliderPosition, setSliderPosition] = React.useState(50);
	const [isDragging, setIsDragging] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement>(null);

	const handleMove = React.useCallback((clientX: number) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = clientX - rect.left;
		const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
		setSliderPosition(percentage);
	}, []);

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging) return;
		handleMove(e.touches[0].clientX);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) return;
		handleMove(e.clientX);
	};

	if (isLoading && !caseItem) {
		return <CaseDetailSkeleton />;
	}

	if (isError || !caseItem) {
		return (
			<main className="flex flex-col flex-1">
				<PageHeader
					badge={t("footer.beforeAfter")}
					title={t("beforeAfter.caseNotFound")}
					description={t("beforeAfter.caseNotFoundDesc")}
				/>
				<div className="container max-w-4xl px-4 pb-20 text-center space-y-4">
					<Button asChild variant="default">
						<Link href="/before-after" className="gap-2">
							<ArrowRightIcon className="size-4 rtl:rotate-180" />
							<span className="small">{t("beforeAfter.backToCases")}</span>
						</Link>
					</Button>
				</div>
			</main>
		);
	}

	return (
		<main className="flex flex-col flex-1">
			{/* PageHeader with Case Title */}
			<PageHeader
				badge={caseItem.treatment || t("footer.beforeAfter")}
				title={caseItem.title}
			/>

			{/* Main Article Container */}
			<article className="container max-w-4xl px-4 sm:px-6 py-10 sm:py-16 space-y-8 sm:space-y-10">
				{/* Meta Info Bar: Treatment Badge + Location */}
				<div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60">
					<div className="flex items-center gap-3">
						<SectionBadge withoutIcon className="small font-bold text-primary">
							{caseItem.treatment}
						</SectionBadge>
					</div>

					<div className="flex items-center gap-1.5 text-foreground small font-medium">
						<MapPin className="size-4 stroke-2 text-primary shrink-0" />
						<span>{caseItem.location}</span>
					</div>
				</div>

				{/* High-Resolution Interactive Comparison Viewer */}
				<div
					ref={containerRef}
					onMouseDown={() => setIsDragging(true)}
					onMouseUp={() => setIsDragging(false)}
					onMouseLeave={() => setIsDragging(false)}
					onMouseMove={handleMouseMove}
					onTouchStart={() => setIsDragging(true)}
					onTouchEnd={() => setIsDragging(false)}
					onTouchMove={handleTouchMove}
					className="relative w-full aspect-16/10 sm:aspect-video rounded-3xl sm:rounded-4xl overflow-hidden select-none cursor-ew-resize bg-muted shadow-lg border border-border/40"
				>
					{/* AFTER Image (Full background) */}
					<FallbackImage
						src={caseItem.image_after_url}
						alt={`${caseItem.title} - ${t("beforeAfter.after")}`}
						fill
						sizes="(max-width: 1024px) 100vw, 896px"
						className="object-cover object-center pointer-events-none"
					/>

					{/* BEFORE Image (Clipped from left to sliderPosition) */}
					<div
						className="absolute inset-0 overflow-hidden pointer-events-none"
						style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
					>
						<FallbackImage
							src={caseItem.image_before_url}
							alt={`${caseItem.title} - ${t("beforeAfter.before")}`}
							fill
							sizes="(max-width: 1024px) 100vw, 896px"
							className="object-cover object-center pointer-events-none"
						/>
					</div>

					{/* Badges on Top */}
					<div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
						<span className="rounded-full bg-primary/80 backdrop-blur-xs text-primary-foreground small font-bold tracking-wider px-3.5 py-1.5 uppercase shadow-xs select-none">
							{t("beforeAfter.before")}
						</span>
						<span className="rounded-full bg-card/90 backdrop-blur-xs text-primary small font-bold tracking-wider px-3.5 py-1.5 uppercase border border-border/50 shadow-xs select-none">
							{t("beforeAfter.after")}
						</span>
					</div>

					{/* Dividing Vertical Line + Circular Handle */}
					<div
						className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center -translate-x-1/2"
						style={{ left: `${sliderPosition}%` }}
					>
						{/* Vertical Line */}
						<div className="w-0.5 h-full bg-white/95 shadow-md" />

						{/* Center Round Handle Button */}
						<div className="absolute size-9 sm:size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-105 transition-transform">
							<ChevronsLeftRight className="size-4" />
						</div>
					</div>
				</div>

				{/* Detailed Description Card */}
				<div className="rounded-3xl border bg-card p-6 sm:p-8 space-y-4 shadow-2xs">
					<h2 className="h4 font-heading font-medium text-foreground">
						{caseItem.title}
					</h2>
					<p className="text-paragraph text-base leading-relaxed whitespace-pre-line">
						{caseItem.description_full || caseItem.description_preview}
					</p>
				</div>

				{/* Call To Action Box with Consultation Trigger */}
				<div className="rounded-3xl border bg-card dark:bg-muted/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start shadow-2xs">
					<div className="space-y-1.5 max-w-xl">
						<h3 className="h4 font-heading font-medium text-foreground">
							{t("beforeAfter.ctaTitle")}
						</h3>
						<p className="small text-muted-foreground leading-relaxed">
							{t("beforeAfter.ctaSubtitle")}
						</p>
					</div>

					<ConsultationDrawer
						treatment={caseItem.treatment}
						withArrow
						variant="default"
						className="shrink-0 cursor-pointer"
					>
						<CalendarCheckIcon className="size-4 me-1.5" />
						<span>{t("navbar.getConsultation")}</span>
					</ConsultationDrawer>
				</div>
			</article>
		</main>
	);
}

export default CaseDetailContent;

