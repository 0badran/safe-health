import { cn } from "@/lib/utils";

interface HeroStatsBannerProps {
	className?: string;
}

export function HeroStatsBanner({ className }: HeroStatsBannerProps) {
	return (
		<div
			className={cn(
				"relative w-full bg-white rounded-t-[32px] sm:rounded-tr-[44px] rounded-tl-[32px]",
				"p-6 sm:p-8 lg:p-10 shadow-xl shadow-purple-950/5 border border-slate-100",
				className,
			)}
		>
			{/* Dashed Flight Arc with Airplane */}
			<div
				aria-hidden="true"
				className="pointer-events-none select-none absolute inset-x-0 top-3 h-28 overflow-visible"
			>
				<svg
					viewBox="0 0 540 100"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-full h-full overflow-visible"
					preserveAspectRatio="none"
				>
					{/* Decorative dashed arc */}
					<path
						d="M 10 75 Q 80 10, 220 30 T 480 65"
						stroke="#159ba8"
						strokeWidth="1.8"
						strokeDasharray="6 6"
						strokeLinecap="round"
						className="opacity-60"
					/>
					{/* Airplane Icon */}
					<g transform="translate(475, 55) rotate(35) scale(0.75)">
						<path
							d="M21 16V10L13 5V1.5C13 0.67 12.33 0 11.5 0C10.67 0 10 0.67 10 1.5V5L2 10V16L10 13.5V19L8 20.5V23L11.5 22L15 23V20.5L13 19V13.5L21 16Z"
							fill="#251860"
						/>
					</g>
				</svg>
			</div>

			{/* Headline */}
			<div className="relative space-y-1 mb-8 sm:mb-10">
				<h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.15] text-[#251860] font-heading tracking-tight">
					Your Health Journey,
				</h2>
				<h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.15] text-[#159ba8] font-heading tracking-tight">
					Handled with Care
				</h2>
			</div>

			{/* Stats Grid */}
			<div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2 items-center pt-2">
				{/* Stat 1 */}
				<div className="flex flex-col">
					<span className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#251860] font-sans leading-none">
						+10
					</span>
					<span className="text-xs sm:text-[13px] text-slate-500 font-medium font-sans mt-1.5">
						years
					</span>
				</div>

				{/* Stat 2 */}
				<div className="flex flex-col sm:border-s sm:border-slate-200/80 sm:ps-5">
					<div className="flex items-baseline gap-1">
						<span className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#251860] font-sans leading-none">
							+10
						</span>
						<span className="text-xl sm:text-2xl font-bold text-[#159ba8] font-heading leading-none">
							k
						</span>
					</div>
					<span className="text-xs sm:text-[13px] text-slate-500 font-medium font-sans mt-1.5 whitespace-nowrap">
						International Patients
					</span>
				</div>

				{/* Stat 3 */}
				<div className="flex flex-col sm:border-s sm:border-slate-200/80 sm:ps-5">
					<span className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#251860] font-sans leading-none">
						+10
					</span>
					<span className="text-xs sm:text-[13px] text-slate-500 font-medium font-sans mt-1.5">
						years
					</span>
				</div>

				{/* Stat 4 */}
				<div className="flex flex-col sm:border-s sm:border-slate-200/80 sm:ps-5">
					<span className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#251860] font-sans leading-none">
						95%
					</span>
					<span className="text-xs sm:text-[13px] text-slate-500 font-medium font-sans mt-1.5 whitespace-nowrap">
						Patient Satisfaction Rate
					</span>
				</div>
			</div>
		</div>
	);
}
