"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/language-context";
import { CheckCircle2Icon, RotateCcwIcon } from "lucide-react";

interface ConsultationSuccessProps {
	onReset?: () => void;
	message?: string;
}

export function ConsultationSuccess({
	onReset,
	message,
}: ConsultationSuccessProps) {
	const { t } = useTranslation();

	return (
		<div className="relative py-12 px-4 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300">
			<div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-inner">
				<CheckCircle2Icon className="size-9 stroke-[2.2]" />
			</div>

			<div className="space-y-1.5 max-w-sm">
				<h3 className="h4 font-semibold text-primary font-heading">
					{message ?? t("consultation.successTitle")}
				</h3>
				<p className="small text-muted-foreground leading-relaxed font-sans">
					{t("consultation.successMessage")}
				</p>
			</div>

			{onReset && (
				<Button
					type="button"
					variant="ghost"
					onClick={onReset}
					className="mt-2 text-secondary hover:text-secondary"
				>
					<RotateCcwIcon className="size-3.5" />
					<span className="small">{t("consultation.sendAnother")}</span>
				</Button>
			)}
		</div>
	);
}
