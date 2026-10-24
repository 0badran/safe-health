import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { ArrowRight } from "lucide-react";
import { Slot } from "radix-ui";
import * as React from "react";

const buttonVariants = cva(
	"group/button relative capitalize overflow-hidden isolate inline-flex shrink-0 font-semibold items-center justify-center rounded-4xl border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 ",
	{
		variants: {
			variant: {
				default:
					"border-primary bg-primary text-primary-foreground shadow-xs active:scale-[0.99] before:pointer-events-none before:content-[''] before:absolute before:-z-10 before:top-1/2 before:left-0 before:-translate-y-1/2 before:-translate-x-1/2 before:aspect-square before:w-[300%] before:rounded-full before:bg-background before:scale-0 before:transition-transform before:duration-700 before:ease-out hover:before:scale-100 hover:text-primary transition-colors duration-700",
				secondary:
					"bg-background border border-primary text-primary hover:opacity-80 shadow-xs active:scale-[0.99] border border-primary",
				outline:
					"border border-primary text-primary bg-background/0 shadow-xs active:scale-[0.99] before:pointer-events-none before:content-[''] before:absolute before:-z-10 before:top-1/2 before:left-0 before:-translate-y-1/2 before:-translate-x-1/2 before:aspect-square before:w-[300%] before:rounded-full before:bg-primary before:scale-0 before:transition-transform before:duration-700 before:ease-out hover:before:scale-100 hover:text-primary-foreground transition-colors duration-700",

				ghost:
					"hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
				destructive:
					"bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
				link: "text-primary underline-offset-4 hover:underline",
				teal: "bg-[#159BA8] text-white hover:bg-[#128a96] shadow-sm active:scale-[0.99]",
				"nav-white":
					"bg-white text-secondary hover:bg-white/95 rounded-full font-semibold shadow-sm active:scale-[0.99]",
			},
			size: {
				default:
					"h-8 md:h-9 xl:h-11 gap-1.5 px-4 text-xs md:text-sm has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5",
				icon: "size-8 md:size-9 xl:size-11",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const arrowBgVariants: Record<string, string> = {
	default:
		"bg-primary-foreground text-primary group-hover/button:bg-primary group-hover/button:text-primary-foreground transition-colors duration-300",
	secondary: "bg-primary text-background",
	outline:
		"bg-primary text-primary-foreground group-hover/button:bg-background group-hover/button:text-primary transition-colors duration-300",
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
			className={cn(
				buttonVariants({ variant, size, className }),
				withArrow && "pe-1 ps-2.5",
			)}
			{...props}
		>
			<Slot.Slottable>{children}</Slot.Slottable>
			{withArrow && !size?.startsWith("icon") && (
				<div
					className={cn(
						"relative z-10 inline-flex items-center xl:size-9 size-6 md:size-7 justify-center rounded-full shrink-0 transition-colors duration-300",
						arrowBgVariants[variant!] ?? arrowBgVariants.default,
					)}
				>
					<ArrowRight className="stroke-1 rtl:rotate-180 size-4 md:size-5 transition-colors duration-300" />
				</div>
			)}
		</Comp>
	);
}

export { Button, buttonVariants };
