import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { ArrowRight } from "lucide-react";
import { Slot } from "radix-ui";
import * as React from "react";

const buttonVariants = cva(
	"group/button inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs active:scale-[0.99]",
				secondary:
					"bg-background text-primary hover:opacity-80 shadow-xs active:scale-[0.99] border border-primary",
				outline:
					"border border-secondary bg-transparent hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				ghost:
					"hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
				destructive:
					"bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
				link: "text-primary underline-offset-4 hover:underline",
				teal: "bg-[#159BA8] text-white hover:bg-[#128a96] shadow-sm active:scale-[0.99]",
				"teal-pill":
					"bg-[#159BA8] text-white hover:bg-[#128a96] rounded-full shadow-md active:scale-[0.99]",
				"white-pill":
					"bg-white text-[#159BA8] hover:bg-slate-50 border border-white/80 rounded-full shadow-md active:scale-[0.99]",
				"purple-pill":
					"bg-[#392579] text-white hover:bg-[#2f1e63] rounded-full shadow-md active:scale-[0.99]",
				"nav-white":
					"bg-white text-[#159BA8] hover:bg-white/95 rounded-full font-semibold shadow-sm active:scale-[0.99]",
			},
			size: {
				default:
					"h-9 gap-1.5 px-1 ps-4 has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5",
				xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
				lg: "h-11 gap-2 px-5 text-base has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3",
				pill: "h-11 gap-2.5 px-5 rounded-full text-sm font-medium",
				"pill-sm": "h-9 gap-2 px-4 rounded-full text-xs font-medium",
				"pill-lg":
					"h-12 gap-3 px-6 rounded-full text-sm sm:text-base font-semibold",
				icon: "size-9",
				"icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const arrowBgVariants: Record<string, string> = {
	default: "bg-primary-foreground text-primary",
	secondary: "bg-primary text-background",
	outline: "bg-secondary/15 text-secondary",
	ghost: "bg-muted text-foreground",
	destructive: "bg-destructive-foreground text-destructive",
	link: "bg-transparent text-primary",
};

function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	children,
	withArrow,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		withArrow?: boolean;
	}) {
	const Comp = asChild ? Slot.Root : "button";

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
			<Slot.Slottable>{children}</Slot.Slottable>
			{withArrow && (
				<div
					className={cn(
						"inline-flex items-center justify-center size-7 rounded-full shrink-0",
						arrowBgVariants[variant ?? "default"] ?? arrowBgVariants.default,
					)}
				>
					<ArrowRight className="size-4 stroke-1 rtl:rotate-180" />
				</div>
			)}
		</Comp>
	);
}

export { Button, buttonVariants };
