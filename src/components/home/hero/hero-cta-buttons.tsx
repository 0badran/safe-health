"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/language-context";

interface HeroCtaButtonsProps {
	className?: string;
}

export function HeroCtaButtons({ className }: HeroCtaButtonsProps) {
	const { t } = useTranslation();

	return (
		<div className={cn("flex flex-wrap items-center gap-3 sm:gap-4", className)}>
			{/* Start Planning Button */}
			<Link href="#consultation">
				<Button variant="secondary" withArrow>
					<span>{t("hero.startPlanning")}</span>
				</Button>
			</Link>

			{/* View Services Button */}
			<Link href="#services">
				<Button variant="outline-white" withArrow>
					<span>{t("hero.viewServices")}</span>
				</Button>
			</Link>
		</div>
	);
}
