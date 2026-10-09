import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export interface PageHeroProps {
	title: string;
	description?: string;
	imageSrc?: string;
	imageAlt?: string;
	breadcrumbs?: BreadcrumbItem[];
	className?: string;
	children?: React.ReactNode;
}

export function PageHero({
	title,
	description,
	imageSrc = "/images/about/hero-banner.jpg",
	imageAlt = "Safe Health",
	breadcrumbs = [],
	className,
	children,
}: PageHeroProps) {
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
				<div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/10 to-background/30" />
			</div>

			<div className="container relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-center text-center space-y-4">
					{/* Main Title */}
					<h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground drop-shadow-sm">
						{title}
					</h1>

					{/* Breadcrumbs Navigation */}
					{breadcrumbs.length > 0 && (
						<nav
							aria-label="مسار التنقل"
							className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-md border border-border text-foreground shadow-sm"
						>
							<Link
								href="/"
								className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
							>
								<HomeIcon className="size-3.5" />
								<span>الرئيسية</span>
							</Link>

							{breadcrumbs.map((item, index) => {
								const isLast = index === breadcrumbs.length - 1;
								return (
									<React.Fragment key={item.label}>
										<ChevronLeftIcon className="size-3.5 rtl:rotate-0 rotate-180 opacity-60 shrink-0" />
										{item.href && !isLast ? (
											<Link
												href={item.href}
												className="transition-colors hover:text-primary"
											>
												{item.label}
											</Link>
										) : (
											<span className="text-primary font-semibold">
												{item.label}
											</span>
										)}
									</React.Fragment>
								);
							})}
						</nav>
					)}

					{/* Supportive Description */}
					{description && (
						<p className="max-w-2xl text-sm sm:text-base text-muted-foreground font-medium leading-relaxed pt-2">
							{description}
						</p>
					)}

					{children}
				</div>
			</div>
		</section>
	);
}
