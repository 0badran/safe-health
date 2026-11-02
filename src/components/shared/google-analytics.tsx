"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

export const GA_MEASUREMENT_ID =
	process.env.NEXT_PUBLIC_GA_ID || "G-R4Z51KJG65";

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

/**
 * Helper to track standard or custom Google Analytics (GA4) events
 */
export function trackGAEvent(
	eventName: string,
	params?: Record<string, unknown>,
) {
	if (typeof window !== "undefined" && typeof window.gtag === "function") {
		window.gtag("event", eventName, params);
	}
}

function GAPageTracking() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (typeof window !== "undefined" && typeof window.gtag === "function") {
			const url =
				pathname +
				(searchParams?.toString() ? `?${searchParams.toString()}` : "");
			window.gtag("config", GA_MEASUREMENT_ID, {
				page_path: url,
			});
		}
	}, [pathname, searchParams]);

	return null;
}

export function GoogleAnalytics() {
	return (
		<>
			{/* Google Analytics Script (gtag.js) */}
			<Script
				id="google-analytics-tag"
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
			/>
			<Script id="google-analytics-init" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GA_MEASUREMENT_ID}', {
						page_path: window.location.pathname,
					});
				`}
			</Script>
			<Suspense fallback={null}>
				<GAPageTracking />
			</Suspense>
		</>
	);
}

export default GoogleAnalytics;

