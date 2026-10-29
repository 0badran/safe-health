"use client";

import InteractiveGridBackground from "@/components/shared/interactive-grid-background";
import { SectionBadge } from "@/components/shared/section-badge";
import { useTranslation } from "@/lib/language-context";

interface PageHeaderProps {
	badge?: string;
	title?: string;
	description?: string;
	badgeKey?: string;
	titleKey?: string;
	descriptionKey?: string;
}

export function PageHeader({
	badge = "",
	title = "",
	description = "",
	badgeKey,
	titleKey,
	descriptionKey,
}: PageHeaderProps) {
	const { t } = useTranslation();

	const displayBadge = badgeKey ? t(badgeKey) : badge;
	const displayTitle = titleKey ? t(titleKey) : title;
	const displayDescription = descriptionKey
		? t(descriptionKey)
		: description;

	return (
		<section className="relative overflow-hidden pt-24 lg:pt-32 pb-10 lg:pb-20">
			{/* Interactive Grid Hover Effect matching template */}
			<InteractiveGridBackground
				borderColor="var(--border)"
				hoverColor="color-mix(in srgb, var(--primary) 8%, transparent)"
				borderOpacity={0.2}
			/>

			<div className="container relative z-10 pointer-events-none">
				<div className="flex flex-col items-center justify-center text-center gap-4">
					{/* Gradient Display Title */}
					{displayTitle && (
						<h1 className="text-heading max-w-xl">{displayTitle}</h1>
					)}

					{/* Badge + Description Row */}
					{(displayBadge || displayDescription) && (
						<div className="flex flex-col sm:flex-row items-start justify-center gap-4 sm:gap-6 max-w-4xl">
							{displayBadge && (
								<SectionBadge className="shrink-0 max-sm:mx-auto">
									{displayBadge}
								</SectionBadge>
							)}

							{displayDescription && (
								<p className="text-paragraph h5 font-normal py-1 text-center sm:text-start">
									{displayDescription}
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
