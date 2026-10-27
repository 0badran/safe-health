"use client";

import * as React from "react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
} from "@/components/ui/drawer";
import { ConsultationForm, type ConsultationFormProps } from "@/components/home/hero/form/consultation-form";
import { useLanguage, useTranslation } from "@/lib/language-context";
import useSettings from "@/hooks/use-settings";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface ConsultationDrawerProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSubmit">,
		VariantProps<typeof buttonVariants> {
	/** Whether to display arrow icon in trigger button */
	withArrow?: boolean;
	/** Custom trigger node to replace the default Button */
	trigger?: React.ReactNode;
	/** Brand name displayed in title and agreements */
	brandName?: string;
	/** Custom form title */
	title?: string;
	/** Custom form description */
	description?: string;
	/** Custom eyebrow text */
	eyebrow?: string;
	/** Callback when form submission completes */
	onSubmit?: ConsultationFormProps["onSubmit"];
	/** Controlled open state */
	open?: boolean;
	/** Controlled onOpenChange handler */
	onOpenChange?: (open: boolean) => void;
	/** Additional className for the drawer content panel */
	drawerClassName?: string;
}

export function ConsultationDrawer({
	variant = "secondary",
	size = "default",
	withArrow,
	className,
	children,
	trigger,
	brandName,
	title,
	description,
	onSubmit,
	open: controlledOpen,
	onOpenChange: controlledOnOpenChange,
	drawerClassName,
	...buttonProps
}: ConsultationDrawerProps) {
	const { settings } = useSettings();
	const { isRtl } = useLanguage();
	const { t } = useTranslation();
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

	const resolvedBrandName = brandName ?? settings?.brand_name ?? undefined;
	const resolvedTitle = title ?? t("consultation.title");
	const resolvedDescription = description ?? t("consultation.subtitle");

	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : uncontrolledOpen;
	const setOpen = isControlled ? controlledOnOpenChange : setUncontrolledOpen;

	const handleSuccess = () => {
		// Keep open for user to see success state, or auto-close if needed
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
						className={cn("m-2  px-3", className)}
						{...buttonProps}
					>
						{children ?? t("navbar.getConsultation")}
					</Button>
				)}
			</DrawerTrigger>
			<DrawerContent
				side={isRtl ? "left" : "right"}
				className={cn(
					"w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl overflow-y-auto p-0 bg-card border-s border-border shadow-2xl",
					drawerClassName,
				)}
			>
				{/* Accessible Header for Screen Readers */}
				<DrawerHeader className="sr-only">
					<DrawerTitle>{resolvedTitle}</DrawerTitle>
					<DrawerDescription>{resolvedDescription}</DrawerDescription>
				</DrawerHeader>

				<div className="py-2">
					<ConsultationForm
						brandName={resolvedBrandName}
						title={resolvedTitle}
						description={resolvedDescription}
						onSubmit={onSubmit}
						onSuccess={handleSuccess}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export const ConsultationDrawerButton = ConsultationDrawer;
export default ConsultationDrawer;
