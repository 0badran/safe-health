import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsultationSubmitButtonProps {
	isSubmitting?: boolean;
	disabled?: boolean;
	label?: string;
	className?: string;
}

export function ConsultationSubmitButton({
	isSubmitting = false,
	disabled = false,
	label = "Send Request",
	className,
}: ConsultationSubmitButtonProps) {
	return (
		<button
			type="submit"
			disabled={disabled || isSubmitting}
			className={cn(
				"group relative inline-flex items-center gap-3 h-12 pl-6 pr-1.5 rounded-full",
				"bg-[#392579] text-white text-[15px] sm:text-[16px] leading-[22px] font-semibold capitalize",
				"cursor-pointer shadow-md shadow-[#392579]/20 select-none",
				"hover:bg-[#322068] active:scale-[0.98] transition-all duration-200",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#392579]/50 focus-visible:ring-offset-2",
				"disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none",
				className,
			)}
		>
			<span className="font-sans">{isSubmitting ? "Sending..." : label}</span>
			<span className="size-10 rounded-full bg-white flex items-center justify-center text-[#392579] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 shadow-xs">
				{isSubmitting ? (
					<Loader2Icon className="size-4 animate-spin text-[#392579]" />
				) : (
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						aria-hidden="true"
						className="rtl:rotate-180"
					>
						<path
							d="M2 8H11.3M7 3.3L11.7 8L7 12.7"
							fill="none"
							stroke="#392579"
							strokeWidth="1.6"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</span>
		</button>
	);
}
