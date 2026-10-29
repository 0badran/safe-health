"use client";

import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { ShieldCheckIcon } from "lucide-react";
import { MultiStepConsultationForm } from "./multi-step/multi-step-consultation-form";

export interface ConsultationPageContentProps {
	className?: string;
	title?: string;
}

export function ConsultationPageContent({
	className,
	title,
}: ConsultationPageContentProps) {
	const { t } = useTranslation();
	const resolvedTitle = title || t("consultation.title");

	return (
		<main
			className={cn(
				"min-h-screen w-full flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-6 bg-wallpaper",
				className,
			)}
		>
			<div className="w-full max-w-xl mx-auto space-y-4">
				{/* Centered Form Card */}
				<div className="rounded-3xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-xl relative overflow-hidden">
					{/* Card Header Title & Description */}
					<div className="space-y-1.5 pb-2 text-start">
						<h1 className="h4 font-heading font-medium text-primary">
							{resolvedTitle}
						</h1>
						<p className="small text-muted-foreground leading-relaxed">
							{t("consultation.subtitle")}
						</p>
					</div>

					<MultiStepConsultationForm className="p-0" />
				</div>

				{/* Subtle Trust Footer Note */}
				<div className="flex items-center justify-center gap-1.5 text-center text-muted-foreground small py-1">
					<ShieldCheckIcon className="size-4 text-primary shrink-0" />
					<span>{t("consultationPage.trust2Title")}</span>
				</div>
			</div>
		</main>
	);
}

export default ConsultationPageContent;
