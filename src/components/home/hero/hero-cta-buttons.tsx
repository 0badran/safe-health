import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroCtaButtonsProps {
	className?: string;
}

export function HeroCtaButtons({ className }: HeroCtaButtonsProps) {
	return (
		<div className={cn("flex flex-wrap items-center gap-3 sm:gap-4", className)}>
			{/* Start Planning Button */}
			<Link
				href="#consultation"
				className={cn(
					"group inline-flex items-center gap-3 h-12 pl-6 pr-1.5 rounded-full",
					"bg-white text-[#28185c] font-semibold text-sm sm:text-[15px] font-sans",
					"shadow-lg shadow-purple-950/20 hover:shadow-xl transition-all duration-200 select-none",
					"hover:bg-slate-50 active:scale-[0.98]",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#28185c]",
				)}
			>
				<span>start planning</span>
				<span className="size-9 rounded-full bg-[#28185c] text-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 shadow-xs">
					<ArrowRightIcon className="size-4 rtl:rotate-180" />
				</span>
			</Link>

			{/* View Treatments Button */}
			<Link
				href="#treatments"
				className={cn(
					"group inline-flex items-center gap-2.5 h-12 px-6 rounded-full",
					"bg-[#3b2484]/70 hover:bg-[#3b2484] border border-white/25 text-white",
					"backdrop-blur-xs font-semibold text-sm sm:text-[15px] font-sans",
					"transition-all duration-200 select-none",
					"hover:border-white/40 active:scale-[0.98]",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#28185c]",
				)}
			>
				<span>view treatments</span>
				<ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
			</Link>
		</div>
	);
}
