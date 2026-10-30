"use client";

import { cn } from "@/lib/utils";

export interface StatItem {
	count?: string;
	number?: string;
	suffix?: string;
	title: string;
}

export interface HeroStatsBannerProps {
	className?: string;
	title?: string;
	stats?: StatItem[];
}

import { useEffect, useRef } from "react";
import EndLine from "./stats-banner/endline-svg";
import { StartLine } from "./stats-banner/startline-svg";



export function AirplanePath() {
	return (
		<g transform="translate(-11, -11)">
			<path
				d="M22.16 16.33V14L12.83 8.16V1.75a1.75 1.75 0 0 0-3.5 0v6.41L0 14v2.33l9.33-2.92v6.42L7 21.58v1.75l4.08-1.17 4.08 1.17v-1.75l-2.33-1.75v-6.42l9.33 2.92Z"
				fill="var(--primary)"
			/>
		</g>
	);
}

// =========================================================================
// إعدادات حركة وتحجيم الطائرة (Animation & Scale Configurations)
// يمكنك تعديل جميع القيم الخاصة بالحجم ونقاط الاختفاء من هنا مباشرة:
// =========================================================================
export const PLANE_CONFIG = {
	// أحجام الطائرة (Scales):
	appearScale: 0.72, // الحجم الكبير عند بداية الظهور
	normalScale: 0.95, // الحجم الطبيعي أثناء الطيران
	disappearScale: 0.4, // الحجم الصغير عند الاختفاء التدريجي

	// نقاط مسار الطيران (من 0 بداية الخط إلى 1 نهاية الخط):
	startLine: {
		appearEnd: 0.12, // ينتهي الظهور الكبير ويستقر عند 12% من المسار
		disappearStart: 0.7, // يبدأ بالاختفاء مبكراً عند 70% من المسار (قبل النهاية)
		disappearEnd: 0.85, // يختفي تماماً عند 85% من المسار
	},
	endLine: {
		appearEnd: 0.12, // ينتهي الظهور الكبير ويستقر عند 12% من المسار
		disappearStart: 0.72, // يبدأ بالاختفاء مبكراً عند 72% من المسار (قبل النهاية)
		disappearEnd: 0.88, // يختفي تماماً عند 88% من المسار
	},

	// المدة الزمنية لكل مرحلة بالمللي ثانية (Timings in ms):
	timings: {
		flyStart: 2400, // مدة طيران الخط الأول
		pauseMid: 400, // التوقف أثناء الانتقال بين الخطين
		flyEnd: 2600, // مدة طيران الخط الثاني
		pauseEnd: 800, // التوقف قبل إعادة الدورة
	},
};

// دالة حساب الشفافية والحجم بناءً على موضع الطائرة في المسار
function getFlightState(
	rawProgress: number,
	config: { appearEnd: number; disappearStart: number; disappearEnd: number },
) {
	if (rawProgress >= config.disappearEnd) {
		return { opacity: 0, scale: PLANE_CONFIG.disappearScale };
	}

	let opacity = 1;
	let scale = PLANE_CONFIG.normalScale;

	if (rawProgress < config.appearEnd) {
		// مرحلة الظهور: تبدأ بـ Scale كبير (appearScale) وتصل للحجم الطبيعي
		const t = rawProgress / config.appearEnd;
		opacity = t;
		scale =
			PLANE_CONFIG.appearScale -
			t * (PLANE_CONFIG.appearScale - PLANE_CONFIG.normalScale);
	} else if (rawProgress >= config.disappearStart) {
		// مرحلة الاختفاء قبل النهاية: تصغر تدريجياً إلى (disappearScale) وتتلاشى الشفافية
		const t =
			(rawProgress - config.disappearStart) /
			(config.disappearEnd - config.disappearStart);
		opacity = 1 - t;
		scale =
			PLANE_CONFIG.normalScale -
			t * (PLANE_CONFIG.normalScale - PLANE_CONFIG.disappearScale);
	}

	return { opacity, scale };
}





export function HeroStatsBanner({
	className,
	stats,
	title,
}: HeroStatsBannerProps) {
	const startGuideRef = useRef<SVGPathElement | null>(null);
	const startPlaneRef = useRef<SVGGElement | null>(null);
	const endGuideRef = useRef<SVGPathElement | null>(null);
	const endPlaneRef = useRef<SVGGElement | null>(null);

	useEffect(() => {
		const startGuide = startGuideRef.current;
		const startPlane = startPlaneRef.current;
		const endGuide = endGuideRef.current;
		const endPlane = endPlaneRef.current;

		if (!startGuide || !startPlane || !endGuide || !endPlane) return;

		// Respect user preference for reduced motion
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion) {
			endPlane.style.transform = `translate(127px, 84px) rotate(42deg) scale(${PLANE_CONFIG.normalScale})`;
			endPlane.style.opacity = "1";
			return;
		}

		const lenStart = startGuide.getTotalLength();
		const lenEnd = endGuide.getTotalLength();

		const { flyStart, pauseMid, flyEnd, pauseEnd } = PLANE_CONFIG.timings;
		const T_CYCLE = flyStart + pauseMid + flyEnd + pauseEnd;

		// Smooth ease-in-out easing
		const ease = (t: number) =>
			t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

		let animId: number;
		let startTime: number | null = null;

		const frame = (now: number) => {
			if (!startTime) startTime = now;
			const elapsed = (now - startTime) % T_CYCLE;

			if (elapsed < flyStart) {
				// --- Phase 1: Left Line (StartLine) Flight ---
				const rawProgress = elapsed / flyStart;
				const progress = ease(rawProgress);

				const dist = progress * lenStart;
				const p = startGuide.getPointAtLength(dist);
				const pNext = startGuide.getPointAtLength(
					Math.min(lenStart, dist + 1.5),
				);

				const angle =
					Math.atan2(pNext.y - p.y, pNext.x - p.x) * (180 / Math.PI);
				const rot = angle + 90; // Align forward nose vector with tangent

				// حساب الحجم والشفافية (تظهر كبيرة وتصغر، ثم تختفي بحجم صغير قبل نهاية الخط)
				const { opacity, scale } = getFlightState(
					rawProgress,
					PLANE_CONFIG.startLine,
				);

				startPlane.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${rot}deg) scale(${scale})`;
				startPlane.style.opacity = `${opacity}`;
				endPlane.style.opacity = "0";
			} else if (elapsed < flyStart + pauseMid) {
				// --- Phase 2: Crossing Title Gap ---
				startPlane.style.opacity = "0";
				endPlane.style.opacity = "0";
			} else if (elapsed < flyStart + pauseMid + flyEnd) {
				// --- Phase 3: Right Line (EndLine) Flight ---
				const rawProgress = (elapsed - flyStart - pauseMid) / flyEnd;
				const progress = ease(rawProgress);

				const dist = progress * lenEnd;
				const p = endGuide.getPointAtLength(dist);
				const pNext = endGuide.getPointAtLength(Math.min(lenEnd, dist + 1.5));

				const angle =
					Math.atan2(pNext.y - p.y, pNext.x - p.x) * (180 / Math.PI);
				const rot = angle + 90;

				// حساب الحجم والشفافية للخط الثاني
				const { opacity, scale } = getFlightState(
					rawProgress,
					PLANE_CONFIG.endLine,
				);

				endPlane.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${rot}deg) scale(${scale})`;
				endPlane.style.opacity = `${opacity}`;
				startPlane.style.opacity = "0";
			} else {
				// --- Phase 4: Final Touchdown Pause & Reset ---
				startPlane.style.opacity = "0";
				endPlane.style.opacity = "0";
			}

			animId = requestAnimationFrame(frame);
		};

		animId = requestAnimationFrame(frame);
		return () => cancelAnimationFrame(animId);
	}, []);
	if (!stats || stats.length === 0) return null;
	return (
		<div
			className={cn(
				"relative flex flex-col lg:justify-center    w-full select-none",
				className,
			)}
		>
			{/* Heading with Anchored Flight Lines */}
			<div className="relative max-lg:hidden inline-block text-center w-full sm:w-auto">
				{/* Main Headline with fluid typography */}
				<h2 className="relative w-fit  mx-auto leading-[1.12] tracking-tight">
					{/* Left Decorative Line:
				    - Tip connects near 'Y'
				    - Dot lands cleanly near the top-left of the stats card
				*/}
					<div
						aria-hidden="true"
						className="absolute max-lg:hidden right-[calc(100%-8px)] top-8 lg:top-9 xl:top-11 pointer-events-none block z-10"
					>
						<StartLine guideRef={startGuideRef} planeRef={startPlaneRef} />
					</div>

					{/* Right Decorative Line:
				    - Arcs out from 'Care' / 'Journey,'
				    - Airplane lands cleanly near top-right of the stats card
				*/}
					<div
						aria-hidden="true"
						className="absolute max-lg:hidden right-0 lg:left-[calc(100%-20px)] top-11 lg:top-13 xl:top-15 pointer-events-none block z-10"
					>
						<EndLine guideRef={endGuideRef} planeRef={endPlaneRef} />
					</div>
					{title ? (
						title.includes(",") ? (
							<>
								<span className="block text-heading">
									{title.split(",")[0]},
								</span>
								<span className="block text-heading">
									{title.split(",").slice(1).join(",").trim()}
								</span>
							</>
						) : (
							<span className="block text-heading">{title}</span>
						)
					) : null}
				</h2>
			</div>

			{/* Stats Card:
			    - Responsive 2x2 grid on mobile, locks to -ml-[62px] & w-[calc(100%+186px)] row on sm+
			*/}
			<div className="relative lg:mt-4 w-full text-center bg-purple-tint/50 backdrop-blur-xs rounded-2xl p-3 grid grid-cols-2 sm:grid-cols-4 justify-items-around gap-y-3 border border-primary/5 ">
				{stats.map((item, index) => {
					const rawCount = item.count ?? item.number ?? "";
					const suffix =
						item.suffix ??
						rawCount.match(/^[+]?\d+[%]?([a-zA-Z]+)$/)?.[1]?.toLowerCase();
					const displayCount =
						suffix &&
							(rawCount.endsWith(suffix.toUpperCase()) ||
								rawCount.endsWith(suffix.toLowerCase()))
							? rawCount.slice(0, -suffix.length)
							: rawCount;

					return (
						<div
							key={index}
							className="flex items-center justify-center sm:flex-1"
						>
							<div className="flex flex-col items-center text-center px-1">
								<div className="flex items-baseline justify-center gap-0.5">
									<span className="h5 text-primary font-bold font-heading">
										{displayCount}
									</span>
									{suffix && (
										<span className=" font-heading font-bold text-lg sm:text-xl leading-none">
											{suffix}
										</span>
									)}
								</div>
								<p className="small text-nowrap text-muted-foreground font-medium text-center leading-tight mt-0.5">
									{item.title}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default HeroStatsBanner;
