"use client";

import * as React from "react";
import { useState } from "react";
import { type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerClose,
} from "@/components/ui/drawer";
import { MultiStepConsultationForm } from "./multi-step/multi-step-consultation-form";
import { useLanguage, useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export interface ConsultationDrawerProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSubmit">,
		VariantProps<typeof buttonVariants> {
	/** Optional pre-selected doctor ID */
	doctorId?: number | string;
	/** Optional pre-selected treatment / procedure */
	treatment?: string;
	/** Whether to display arrow icon in trigger button */
	withArrow?: boolean;
	/** Custom trigger node to replace the default Button */
	trigger?: React.ReactNode;
	/** Custom form title */
	title?: string;
	/** Custom form description */
	description?: string;
	/** Controlled open state */
	open?: boolean;
	/** Controlled onOpenChange handler */
	onOpenChange?: (open: boolean) => void;
	/** Callback when consultation booking completes */
	onSuccess?: () => void;
	/** Additional className for the drawer content panel */
	drawerClassName?: string;
}

export function ConsultationDrawer({
	doctorId,
	treatment,
	variant = "secondary",
	size = "default",
	withArrow,
	className,
	children,
	trigger,
	title,
	description,
	open: controlledOpen,
	onOpenChange: controlledOnOpenChange,
	onSuccess,
	drawerClassName,
	...buttonProps
}: ConsultationDrawerProps) {
	const { isRtl } = useLanguage();
	const { t } = useTranslation();
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

	const resolvedTitle = title ?? t("consultation.title");
	const resolvedDescription = description ?? t("consultation.subtitle");

	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : uncontrolledOpen;
	const setOpen = isControlled ? controlledOnOpenChange : setUncontrolledOpen;

	const handleSuccess = () => {
		onSuccess?.();
	};

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				{trigger ? (
					trigger
				) : (
					<Button
						variant={variant}
						size={size}
						withArrow={withArrow}
						className={cn("px-3 cursor-pointer", className)}
						{...buttonProps}
					>
						{children ?? t("navbar.getConsultation")}
					</Button>
				)}
			</DrawerTrigger>

			<DrawerContent
				side={isRtl ? "left" : "right"}
				className={cn(
					"w-full sm:max-w-xl md:max-w-2xl overflow-y-auto p-0 bg-card border-s border-border shadow-2xl",
					drawerClassName,
				)}
			>
				{/* Top Drawer Header with Close Button */}
				<div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-xs px-6 py-4">
					<DrawerHeader className="p-0 text-start space-y-1">
						<DrawerTitle className="h4 font-heading font-medium text-primary">
							{resolvedTitle}
						</DrawerTitle>
						<DrawerDescription className="small text-muted-foreground">
							{resolvedDescription}
						</DrawerDescription>
					</DrawerHeader>

					<DrawerClose asChild>
						<button
							type="button"
							className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
							aria-label="Close"
						>
							<XIcon className="size-4" />
						</button>
					</DrawerClose>
				</div>

				{/* Multi-Step Wizard Body */}
				<div className="py-2">
					{open && (
						<MultiStepConsultationForm
							initialDoctorId={doctorId}
							initialTreatment={treatment}
							onSuccess={handleSuccess}
						/>
					)}
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export const ConsultationDrawerButton = ConsultationDrawer;
export default ConsultationDrawer;
