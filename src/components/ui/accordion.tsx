"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from "lucide-react";

const accordionVariants = cva("flex w-full flex-col", {
	variants: {
		variant: {
			default: "overflow-hidden rounded-2xl border",
			cards: "gap-4 sm:gap-5 border-none bg-transparent",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const accordionItemVariants = cva("h-auto", {
	variants: {
		variant: {
			default: "not-last:border-b data-open:bg-muted/50",
			card: "rounded-2xl border-none bg-card py-1 shadow-[0_1px_12px_0] shadow-primary/8 transition-all duration-300 hover:shadow-md data-open:shadow-md overflow-hidden h-auto",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const accordionTriggerVariants = cva(
	"group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"p-4 text-start text-sm font-medium hover:underline gap-6 **:data-[slot=accordion-trigger-icon]:ms-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
				card: "p-4 text-start text-base font-semibold text-primary gap-4 sm:gap-6 cursor-pointer select-none",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const accordionContentVariants = cva("h-auto", {
	variants: {
		variant: {
			default:
				"pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
			card: "px-5 sm:px-6 pt-0 pb-5 sm:pb-6 text-paragraph small leading-relaxed h-auto break-words",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

function Accordion({
	className,
	variant = "default",
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> &
	VariantProps<typeof accordionVariants>) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			className={cn(accordionVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AccordionItem({
	className,
	variant = "default",
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> &
	VariantProps<typeof accordionItemVariants>) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn(accordionItemVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	variant = "default",
	iconVariant = "chevron",
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> &
	VariantProps<typeof accordionTriggerVariants> & {
		iconVariant?: "chevron" | "plus";
	}) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(accordionTriggerVariants({ variant }), className)}
				{...props}
			>
				{children}
				{iconVariant === "plus" ? (
					<PlusIcon
						data-slot="accordion-trigger-icon"
						className="pointer-events-none size-5 sm:size-6 shrink-0 text-primary transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-45"
					/>
				) : (
					<>
						<ChevronDownIcon
							data-slot="accordion-trigger-icon"
							className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
						/>
						<ChevronUpIcon
							data-slot="accordion-trigger-icon"
							className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
						/>
					</>
				)}
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	variant = "default",
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> &
	VariantProps<typeof accordionContentVariants>) {
	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up data-open:h-auto"
			{...props}
		>
			<div
				className={cn(accordionContentVariants({ variant }), className)}
			>
				{children}
			</div>
		</AccordionPrimitive.Content>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
