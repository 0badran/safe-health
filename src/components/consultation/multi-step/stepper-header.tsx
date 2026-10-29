"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export interface StepperHeaderProps {
	currentStep: 1 | 2 | 3;
	className?: string;
}

export function StepperHeader({ currentStep, className }: StepperHeaderProps) {
	const { t } = useTranslation();

	const steps = [
		{ number: 1, label: t("consultation.step1") },
		{ number: 2, label: t("consultation.step2") },
		{ number: 3, label: t("consultation.step3") },
	];

	const progressPercent = ((currentStep - 1) / 2) * 100;

	return (
		<div className={cn("w-full space-y-3 select-none", className)}>
			{/* Top Progress Track */}
			<div className="relative w-full h-1 bg-muted rounded-full overflow-hidden">
				<motion.div
					className="h-full bg-primary"
					initial={{ width: 0 }}
					animate={{ width: `${progressPercent}%` }}
					transition={{ duration: 0.35, ease: "easeOut" }}
				/>
			</div>

			{/* Step Markers and Labels */}
			<div className="grid grid-cols-3 gap-2">
				{steps.map((step) => {
					const isCompleted = currentStep > step.number;
					const isActive = currentStep === step.number;

					return (
						<div
							key={step.number}
							className={cn(
								"flex flex-col items-center sm:items-start text-center sm:text-start transition-colors",
								isActive && "text-primary",
								isCompleted && "text-foreground",
								!isActive && !isCompleted && "text-muted-foreground",
							)}
						>
							<div className="flex items-center gap-1.5">
								<div
									className={cn(
										"size-6 rounded-full flex items-center justify-center small font-semibold shrink-0 transition-colors",
										isActive && "bg-primary text-primary-foreground shadow-xs",
										isCompleted && "bg-primary/20 text-primary",
										!isActive && !isCompleted && "bg-muted text-muted-foreground",
									)}
								>
									{isCompleted ? <CheckIcon className="size-3.5" /> : step.number}
								</div>
								<span className="hidden sm:inline small font-medium truncate">
									{step.label}
								</span>
							</div>
							<span className="sm:hidden small font-medium truncate mt-1">
								{step.label}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default StepperHeader;

