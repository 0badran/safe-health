"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect, useRef } from "react";

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

declare global {
	interface Window {
		fbq?: (...args: unknown[]) => void;
		_fbq?: unknown;
	}
}

/**
 * Generates a unique UUID for Meta Conversions API (CAPI) & GA event deduplication
 */
export function generateEventId(): string {
	if (
		typeof crypto !== "undefined" &&
		typeof crypto.randomUUID === "function"
	) {
		return crypto.randomUUID();
	}
	return (
		"evt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 11)
	);
}

function dispatchFbEvent(
	command: "track" | "trackCustom",
	eventName: string,
	options?: Record<string, unknown>,
	eventParams?: { eventID?: string },
) {
	if (typeof window !== "undefined" && typeof window.fbq === "function") {
		if (eventParams) {
			window.fbq(command, eventName, options, eventParams);
		} else {
			window.fbq(command, eventName, options);
		}
	}
}

/**
 * Helper to track standard Meta Pixel events
 */
export function trackFbEvent(
	eventName: string,
	options?: Record<string, unknown>,
	eventParams?: { eventID?: string },
) {
	dispatchFbEvent("track", eventName, options, eventParams);
}

/**
 * Helper to track custom Meta Pixel events
 */
export function trackFbCustomEvent(
	eventName: string,
	options?: Record<string, unknown>,
	eventParams?: { eventID?: string },
) {
	dispatchFbEvent("trackCustom", eventName, options, eventParams);
}

/**
 * Fires the Meta Pixel `FormStart` custom event once per form session when the form becomes dirty.
 */
export function useTrackFormStart(
	formName: string,
	formState: { isDirty: boolean; isSubmitSuccessful: boolean },
) {
	const { isDirty, isSubmitSuccessful } = formState;
	const hasTrackedRef = useRef(false);

	useEffect(() => {
		if (isSubmitSuccessful) {
			hasTrackedRef.current = false;
			return;
		}
		if (isDirty && !hasTrackedRef.current) {
			hasTrackedRef.current = true;
			trackFbCustomEvent("FormStart", { form_name: formName });
		}
	}, [formName, isDirty, isSubmitSuccessful]);
}

/**
 * Helper to extract UTM parameters from prop fallback, URL query params, or sessionStorage cache
 */
export function getUtmValue(
	key: string,
	fallbackVal?: string,
	searchParams?: URLSearchParams | null,
): string | undefined {
	if (fallbackVal) return fallbackVal;
	if (typeof window === "undefined") return undefined;
	try {
		const fromUrl = searchParams
			? searchParams.get(key)
			: new URLSearchParams(window.location.search).get(key);
		if (fromUrl) {
			sessionStorage.setItem(key, fromUrl);
			return fromUrl;
		}
		return sessionStorage.getItem(key) || undefined;
	} catch {
		return undefined;
	}
}

function MetaPixelTracking() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (typeof window !== "undefined" && typeof window.fbq === "function") {
			window.fbq("track", "PageView");
		}
	}, [pathname, searchParams]);

	return null;
}

export function MetaPixel() {
	return (
		<>
			{/* Meta Pixel Script */}
			<Script
				id="meta-pixel"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
						!function(f,b,e,v,n,t,s)
						{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
						n.callMethod.apply(n,arguments):n.queue.push(arguments)};
						if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
						n.queue=[];t=b.createElement(e);t.async=!0;
						t.src=v;s=b.getElementsByTagName(e)[0];
						s.parentNode.insertBefore(t,s)}(window, document,'script',
						'https://connect.facebook.net/en_US/fbevents.js');
						fbq('init', '${FB_PIXEL_ID}');
					`,
				}}
			/>
			{/* Noscript fallback */}
			<noscript>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					height="1"
					width="1"
					style={{ display: "none" }}
					src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
					alt=""
				/>
			</noscript>
			{/* Route change page view tracker */}
			<Suspense fallback={null}>
				<MetaPixelTracking />
			</Suspense>
		</>
	);
}

export default MetaPixel;
