"use client";

import React, { useState, useEffect } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface SectionCarouselProps<T = unknown> {
	items?: T[];
	renderItem?: (item: T, index: number) => React.ReactNode;
	keyExtractor?: (item: T, index: number) => string | number;
	children?: React.ReactNode;
	className?: string;
	contentClassName?: string;
	itemClassName?: string;
	showArrows?: boolean;
	showDots?: boolean;
	previousArrowClassName?: string;
	nextArrowClassName?: string;
	dotsClassName?: string;
	opts?: Parameters<typeof Carousel>[0]["opts"];
	plugins?: Parameters<typeof Carousel>[0]["plugins"];
	setApi?: (api: CarouselApi) => void;
	onSlideChange?: (current: number, count: number) => void;
}

export function SectionCarousel<T = unknown>({
	items,
	renderItem,
	keyExtractor,
	children,
	className,
	contentClassName,
	itemClassName = "ps-4 basis-[70%] sm:basis-[40%] md:basis-[40%] lg:basis-[24%]",
	showArrows = false,
	showDots = true,
	previousArrowClassName = "hidden md:flex -inset-s-4 lg:-inset-s-6",
	nextArrowClassName = "hidden md:flex -inset-e-4 lg:-inset-e-6",
	dotsClassName,
	opts,
	plugins,
	setApi: externalSetApi,
	onSlideChange,
}: SectionCarouselProps<T>) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) return;

		if (externalSetApi) {
			externalSetApi(api);
		}

		const updatePagination = () => {
			const total = api.scrollSnapList().length;
			const selected = api.selectedScrollSnap();
			setCount(total);
			setCurrent(selected);
			onSlideChange?.(selected, total);
		};

		api.on("select", updatePagination);
		api.on("reInit", updatePagination);

		queueMicrotask(updatePagination);

		return () => {
			api.off("select", updatePagination);
			api.off("reInit", updatePagination);
		};
	}, [api, current, externalSetApi, onSlideChange]);

	return (
		<div className={cn("w-full", className)}>
			<Carousel
				setApi={setApi}
				opts={{
					loop: false,
					...opts,
				}}
				plugins={plugins}
				className="w-full"
			>
				<CarouselContent className={cn("py-2", contentClassName)}>
					{items && renderItem
						? items.map((item, index) => {
								const key = keyExtractor ? keyExtractor(item, index) : index;
								return (
									<CarouselItem key={key} className={itemClassName}>
										{renderItem(item, index)}
									</CarouselItem>
								);
							})
						: React.Children.map(children, (child, index) => {
								if (!child) return null;
								return (
									<CarouselItem key={index} className={itemClassName}>
										{child}
									</CarouselItem>
								);
							})}
				</CarouselContent>

				{showArrows && (
					<>
						<CarouselPrevious className={previousArrowClassName} />
						<CarouselNext className={nextArrowClassName} />
					</>
				)}
			</Carousel>

			{/* Carousel Indicators / Dots */}
			{showDots && count > 1 && (
				<div
					className={cn(
						"flex items-center justify-center gap-2 mt-6 sm:mt-8",
						dotsClassName,
					)}
				>
					{Array.from({ length: count }).map((_, index) => (
						<button
							key={index}
							type="button"
							onClick={() => api?.scrollTo(index)}
							aria-label={`Go to slide ${index + 1}`}
							className={cn(
								"transition-all duration-300 cursor-pointer h-2 rounded-full",
								current === index
									? "w-9 bg-secondary"
									: "w-7 bg-secondary/15 hover:bg-secondary/40",
							)}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default SectionCarousel;
