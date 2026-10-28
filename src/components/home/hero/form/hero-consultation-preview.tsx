"use client";

import * as React from "react";
import Image from "next/image";
import { SparklesIcon, CalendarIcon, ChevronDownIcon } from "lucide-react";
import { ConsultationDrawer } from "@/components/consultation/consultation-drawer";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export interface HeroConsultationPreviewProps {
	className?: string;
}

export function HeroConsultationPreview({
	className,
}: HeroConsultationPreviewProps) {
	const { t } = useTranslation();

	return (
		<ConsultationDrawer
			trigger={
				<div
					role="button"
					tabIndex={0}
					className={cn(
						"group relative z-20 w-full overflow-hidden bg-card text-card-foreground cursor-pointer select-none transition-all duration-200",
						"hover:ring-2 hover:ring-primary/30",
						className,
					)}
				>
					{/* Brand Watermark Decoration */}
					<Image
						src="/images/form-logo.png"
						alt=""
						width={200}
						height={200}
						className="absolute right-0 top-0 pointer-events-none opacity-85 w-auto h-auto"
					/>

					<div className="relative p-6 sm:p-8 flex flex-col gap-4 box-border">
						{/* Header */}
						<header className="space-y-1.5 text-start">
							<div className="flex items-center gap-1.5 text-primary small font-semibold tracking-wide uppercase">
								<SparklesIcon className="size-3.5" />
								<span>{t("navbar.getConsultation")}</span>
							</div>
							<h2 className="m-0 h3 leading-tight font-normal text-primary capitalize font-heading">
								{t("consultation.previewCardTitle")}
							</h2>
							<p className="mt-1 small md:leading-5.5 text-foreground/80 font-sans">
								{t("consultation.previewCardSubtitle")}
							</p>
						</header>

						{/* Mock Preview Fields */}
						<div className="flex flex-col gap-3 pointer-events-none">
							{/* Service Preview Field */}
							<div className="space-y-1 text-start">
								<span className="small leading-5 font-medium text-foreground font-sans flex items-center gap-1">
									{t("consultation.service")}
									<span className="text-primary font-bold">*</span>
								</span>
								<div className="h-9.5 md:h-10.5 rounded-xl bg-input/30 border border-input px-3.5 flex items-center justify-between text-muted-foreground small">
									<span className="truncate">{t("consultation.servicePlaceholder")}</span>
									<ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
								</div>
							</div>

							{/* Name + Phone Grid Preview */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<div className="space-y-1 text-start">
									<span className="small leading-5 font-medium text-foreground font-sans flex items-center gap-1">
										{t("consultation.fullName")}
										<span className="text-primary font-bold">*</span>
									</span>
									<div className="h-9.5 md:h-10.5 rounded-xl bg-input/30 border border-input px-3.5 flex items-center text-muted-foreground small">
										<span>{t("consultation.fullNamePlaceholder")}</span>
									</div>
								</div>

								<div className="space-y-1 text-start">
									<span className="small leading-5 font-medium text-foreground font-sans flex items-center gap-1">
										{t("consultation.phone")}
										<span className="text-primary font-bold">*</span>
									</span>
									<div className="h-9.5 md:h-10.5 rounded-xl bg-input/30 border border-input px-3.5 flex items-center text-muted-foreground small">
										<span>{t("consultation.phonePlaceholder")}</span>
									</div>
								</div>
							</div>

							{/* Country Select Preview */}
							<div className="space-y-1 text-start">
								<span className="small leading-5 font-medium text-foreground font-sans flex items-center gap-1">
									{t("consultation.country")}
									<span className="text-primary font-bold">*</span>
								</span>
								<div className="h-9.5 md:h-10.5 rounded-xl bg-input/30 border border-input px-3.5 flex items-center justify-between text-muted-foreground small">
									<span>{t("consultation.countryPlaceholder")}</span>
									<ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
								</div>
							</div>
						</div>

						{/* Action Button */}
						<div className="pt-2">
							<Button
								type="button"
								variant="default"
								withArrow
								className="w-full group-hover:bg-primary/95 transition-all shadow-md gap-2"
							>
								<CalendarIcon className="size-4" />
								<span>{t("consultation.previewCardCta")}</span>
							</Button>
						</div>
					</div>
				</div>
			}
		/>
	);
}

export default HeroConsultationPreview;

