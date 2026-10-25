"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/language-context";

export interface BreadcrumbItem {
	label: string;
	labelKey?: string;
	href?: string;
}

export interface PageHeroProps {
	title?: string;
	titleKey?: string;
	imageSrc?: string;
	imageAlt?: string;
	breadcrumbs?: BreadcrumbItem[];
	className?: string;
	children?: React.ReactNode;
}

export function PageHero({
	title,
	titleKey,
	imageSrc = "/images/about/hero-banner.jpg",
	imageAlt = "Safe Health",
	breadcrumbs = [],
	className,
	children,
}: PageHeroProps) {
	const { t } = useTranslation();

	const displayTitle = titleKey ? t(titleKey) : (title ?? "");

	return (
		<section
			className={cn(
				"relative overflow-hidden bg-background py-20 sm:py-28 text-foreground",
				className,
			)}
		>
			{/* Background Image Container with Proper Layering & Clear Visibility */}
			<div className="absolute inset-0 z-0">
				<Image
					src={imageSrc}
					alt={imageAlt}
					fill
					priority
					className="object-cover object-center"
					sizes="100vw"
				/>
				{/* Refined gradient overlay using semantic background tokens */}
				<div className="absolute inset-0 bg-linear-to-b from-primary/30 via-primary/10 to-primary/30" />
			</div>

			<div className="container relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-center text-center space-y-4">
					{/* Main Title */}
					<h1 className="font-heading h1 font-black tracking-tight text-background drop-shadow-sm">
						{displayTitle}
					</h1>

					{/* Breadcrumbs Navigation */}
					{breadcrumbs.length > 0 && (
						<nav
							aria-label="breadcrumbs"
							className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-1.5 small font-medium backdrop-blur-md border border-border text-foreground shadow-sm"
						>
							<Link
								href="/"
								className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
							>
								<HomeIcon className="size-3.5" />
								<span>{t("navbar.home")}</span>
							</Link>

							{breadcrumbs.map((item, index) => {
								const isLast = index === breadcrumbs.length - 1;
								const itemLabel = item.labelKey ? t(item.labelKey) : item.label;

								return (
									<React.Fragment key={item.label}>
										<ChevronLeftIcon className="size-3.5 rtl:rotate-0 rotate-180 opacity-60 shrink-0" />
										{item.href && !isLast ? (
											<Link
												href={item.href}
												className="transition-colors hover:text-primary"
											>
												{itemLabel}
											</Link>
										) : (
											<span className="text-primary font-semibold">
												{itemLabel}
											</span>
										)}
									</React.Fragment>
								);
							})}
						</nav>
					)}

					{children}
				</div>
			</div>
		</section>
	);
}
