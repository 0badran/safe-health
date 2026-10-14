import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeroCtaButtonsProps {
	className?: string;
}

export function HeroCtaButtons({ className }: HeroCtaButtonsProps) {
	return (
		<div className={cn("flex flex-wrap items-center gap-3 sm:gap-4", className)}>
			{/* Start Planning Button */}
			<Link
				href="#consultation"

			>
				<Button
					variant="secondary"
					withArrow
				>
					<span>Start planning</span>
				</Button>
			</Link>

			{/* View Treatments Button */}
			<Link
				href="#treatments"
			>
				<Button
					variant="outline"
					withArrow
					className="text-white"
				>
					<span>View treatments</span>
				</Button>
			</Link>
		</div>
	);
}
