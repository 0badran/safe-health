"use client";

import React, { useState } from "react";
import Image, { type ImageProps, type StaticImageData } from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FallbackImageProps extends Omit<ImageProps, "src"> {
	/**
	 * The image source URL or StaticImageData. Can be null or undefined.
	 */
	src?: string | StaticImageData | null;
	/**
	 * Optional custom fallback image URL to load if the primary src fails or is null.
	 */
	fallbackSrc?: string | StaticImageData;
	/**
	 * Optional custom JSX node to render if no image is available or when loading fails.
	 */
	fallbackNode?: React.ReactNode;
	/**
	 * Container className when rendered with fill or wrapping element.
	 */
	containerClassName?: string;
}

export function FallbackImage({
	src,
	alt = "",
	fallbackSrc,
	fallbackNode,
	className,
	containerClassName,
	fill,
	width,
	height,
	onLoad,
	onError,
	...rest
}: FallbackImageProps) {
	const [prevSrc, setPrevSrc] = useState(src);
	const [hasError, setHasError] = useState(false);
	const [overrideSrc, setOverrideSrc] = useState<
		string | StaticImageData | null
	>(null);
	const [isLoading, setIsLoading] = useState(Boolean(src || fallbackSrc));

	// Synchronize state during render without useEffect when src prop updates
	if (src !== prevSrc) {
		setPrevSrc(src);
		setHasError(false);
		setOverrideSrc(null);
		setIsLoading(Boolean(src || fallbackSrc));
	}

	const activeSrc = overrideSrc ?? src ?? fallbackSrc ?? null;

	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		if (fallbackSrc && activeSrc !== fallbackSrc) {
			setOverrideSrc(fallbackSrc);
			setHasError(false);
			setIsLoading(true);
		} else {
			setHasError(true);
			setIsLoading(false);
		}
		onError?.(e);
	};

	const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		setIsLoading(false);
		onLoad?.(e);
	};

	if (hasError || !activeSrc) {
		if (fallbackNode) {
			return <>{fallbackNode}</>;
		}

		return (
			<div
				className={cn(
					"flex items-center justify-center bg-muted text-muted-foreground border border-border/40 select-none",
					fill ? "absolute inset-0 size-full" : "size-full",
					containerClassName,
				)}
				aria-label={alt || "Image unavailable"}
			>
				<ImageIcon
					className="size-8 sm:size-10 opacity-40 shrink-0"
					aria-hidden="true"
				/>
			</div>
		);
	}

	return (
		<>
			{/* Loading skeleton placeholder */}
			{isLoading && (
				<div
					className={cn(
						"bg-muted animate-pulse pointer-events-none",
						fill ? "absolute inset-0 size-full z-1" : "size-full",
						containerClassName,
					)}
					aria-hidden="true"
				/>
			)}

			<Image
				src={activeSrc}
				alt={alt}
				fill={fill}
				width={!fill ? width : undefined}
				height={!fill ? height : undefined}
				className={cn(
					"transition-opacity duration-300",
					isLoading ? "opacity-0" : "opacity-100",
					className,
				)}
				onLoad={handleLoad}
				onError={handleError}
				{...rest}
			/>
		</>
	);
}

export default FallbackImage;
