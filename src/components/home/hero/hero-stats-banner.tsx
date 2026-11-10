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

import { useEffect, useId, useRef, useState } from "react";

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

interface FlightGeometry {
	startPath: string;
	endPath: string;
	leftDot: { x: number; y: number };
	rightTopDot: { x: number; y: number };
	rightBottomDot: { x: number; y: number };
	leftGrad: { x1: number; y1: number; x2: number; y2: number };
	rightGrad: { x1: number; y1: number; x2: number; y2: number };
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
	const uid = useId().replace(/:/g, "");
	const containerRef = useRef<HTMLDivElement | null>(null);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const cardRef = useRef<HTMLDivElement | null>(null);
	const startGuideRef = useRef<SVGPathElement | null>(null);
	const startPlaneRef = useRef<SVGGElement | null>(null);
	const endGuideRef = useRef<SVGPathElement | null>(null);
	const endPlaneRef = useRef<SVGGElement | null>(null);

	const [geometry, setGeometry] = useState<FlightGeometry | null>(null);

	// Dynamically measure Title (h2) and Stats Card (div) to keep both SVGs anchored
	useEffect(() => {
		const container = containerRef.current;
		const titleEl = titleRef.current;
		const cardEl = cardRef.current;
		if (!container || !titleEl || !cardEl) return;

		const updateGeometry = () => {
			const cRect = container.getBoundingClientRect();
			const tRect = titleEl.getBoundingClientRect();
			const sRect = cardEl.getBoundingClientRect();

			if (cRect.width === 0 || sRect.width === 0 || tRect.width === 0) return;

			const titleLeft = tRect.left - cRect.left;
			const titleRight = tRect.right - cRect.left;
			const titleTop = tRect.top - cRect.top;
			const titleHeight = tRect.height;

			const cardLeft = sRect.left - cRect.left;
			const cardRight = sRect.right - cRect.left;
			const cardTop = sRect.top - cRect.top;
			const cardHeight = sRect.height;

			// Left line anchors: from bottom-left of stats card -> left edge of title
			const cxLeft = cardLeft - 2;
			const cyLeft = cardTop + cardHeight * 0.68;
			const txLeft = titleLeft - 6;
			const tyLeft = titleTop + titleHeight * 0.55;

			const dyL = Math.max(40, cyLeft - tyLeft);
			const outerLeft = Math.min(cxLeft, txLeft) - 24;
			const mxL = outerLeft + Math.max(24, txLeft - outerLeft) * 0.55;
			const myL = tyLeft + dyL * 0.22;

			const startPath = [
				`M ${cxLeft.toFixed(1)} ${cyLeft.toFixed(1)}`,
				`C ${(outerLeft - 6).toFixed(1)} ${(cyLeft - dyL * 0.22).toFixed(1)}, ${(outerLeft - 4).toFixed(1)} ${(myL - 4).toFixed(1)}, ${mxL.toFixed(1)} ${myL.toFixed(1)}`,
				`C ${(mxL + (txLeft - mxL) * 0.45).toFixed(1)} ${(myL + 7).toFixed(1)}, ${(txLeft - 6).toFixed(1)} ${(tyLeft + 12).toFixed(1)}, ${txLeft.toFixed(1)} ${tyLeft.toFixed(1)}`,
			].join(" ");

			// Right line anchors: from right edge of title -> bottom-right of stats card
			const txRight = titleRight + 6;
			const tyRight = titleTop + titleHeight * 0.58;
			const cxRight = cardRight + 2;
			const cyRight = cardTop + cardHeight * 0.65;

			const dyR = Math.max(40, cyRight - tyRight);
			const outerRight = Math.max(cxRight, txRight) + 26;
			const mxR = txRight + Math.max(24, outerRight - txRight) * 0.45;
			const myR = tyRight + dyR * 0.22;

			const endPath = [
				`M ${txRight.toFixed(1)} ${tyRight.toFixed(1)}`,
				`C ${(txRight + (mxR - txRight) * 0.35).toFixed(1)} ${(tyRight + 16).toFixed(1)}, ${(mxR - (mxR - txRight) * 0.3).toFixed(1)} ${(myR + 6).toFixed(1)}, ${mxR.toFixed(1)} ${myR.toFixed(1)}`,
				`C ${(outerRight + 4).toFixed(1)} ${(myR - 8).toFixed(1)}, ${(outerRight + 8).toFixed(1)} ${(cyRight - dyR * 0.22).toFixed(1)}, ${cxRight.toFixed(1)} ${cyRight.toFixed(1)}`,
			].join(" ");

			setGeometry({
				startPath,
				endPath,
				leftDot: { x: cxLeft, y: cyLeft },
				rightTopDot: { x: txRight, y: tyRight },
				rightBottomDot: { x: cxRight, y: cyRight },
				leftGrad: { x1: outerLeft, y1: cyLeft, x2: txLeft, y2: tyLeft },
				rightGrad: { x1: outerRight, y1: cyRight, x2: txRight, y2: tyRight },
			});
		};

		updateGeometry();

		const resizeObserver = new ResizeObserver(updateGeometry);
		resizeObserver.observe(container);
		resizeObserver.observe(titleEl);
		resizeObserver.observe(cardEl);

		window.addEventListener("resize", updateGeometry);
		if (typeof document !== "undefined" && document.fonts?.ready) {
			document.fonts.ready.then(updateGeometry).catch(() => {});
		}

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", updateGeometry);
		};
	}, [title, stats?.length]);

	useEffect(() => {
		if (!geometry) return;

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
			endPlane.style.transform = `translate(${geometry.rightBottomDot.x}px, ${geometry.rightBottomDot.y}px) rotate(42deg) scale(${PLANE_CONFIG.normalScale})`;
			endPlane.style.opacity = "1";
			return;
		}

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

			const lenStart = startGuide.getTotalLength();
			const lenEnd = endGuide.getTotalLength();

			if (lenStart > 0 && lenEnd > 0) {
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
					const rot = angle + 90;

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
					const pNext = endGuide.getPointAtLength(
						Math.min(lenEnd, dist + 1.5),
					);

					const angle =
						Math.atan2(pNext.y - p.y, pNext.x - p.x) * (180 / Math.PI);
					const rot = angle + 90;

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
			}

			animId = requestAnimationFrame(frame);
		};

		animId = requestAnimationFrame(frame);
		return () => cancelAnimationFrame(animId);
	}, [geometry]);

	if (!stats || stats.length === 0) return null;

	const startGradId = `start-line-grad-${uid}`;
	const endGradId = `end-line-grad-${uid}`;

	return (
		<div
			ref={containerRef}
			className={cn(
				"relative flex flex-col lg:justify-center w-full select-none",
				className,
			)}
		>
			{/* Dynamic SVG Overlay connecting Title left/right edges to Stats Card left/right edges */}
			{geometry && (
				<svg
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 block size-full overflow-visible z-10 select-none"
				>
					<defs>
						<linearGradient
							id={startGradId}
							x1={geometry.leftGrad.x1}
							y1={geometry.leftGrad.y1}
							x2={geometry.leftGrad.x2}
							y2={geometry.leftGrad.y2}
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="var(--primary)" stopOpacity="0.35" />
							<stop offset="1" stopColor="var(--primary)" />
						</linearGradient>
						<linearGradient
							id={endGradId}
							x1={geometry.rightGrad.x1}
							y1={geometry.rightGrad.y1}
							x2={geometry.rightGrad.x2}
							y2={geometry.rightGrad.y2}
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="var(--primary)" />
							<stop offset="1" stopColor="var(--secondary)" />
						</linearGradient>
					</defs>

					{/* Left Dashed Line + Bottom Card Dot */}
					<path
						d={geometry.startPath}
						fill="none"
						stroke={`url(#${startGradId})`}
						strokeWidth="1.5"
						strokeDasharray="4 4"
						strokeLinecap="round"
					/>
					<circle
						cx={geometry.leftDot.x}
						cy={geometry.leftDot.y}
						r="2.7"
						fill="var(--primary)"
						fillOpacity="0.65"
					/>
					<path
						ref={startGuideRef}
						d={geometry.startPath}
						fill="none"
						stroke="none"
						className="opacity-0 pointer-events-none"
					/>
					<g
						ref={startPlaneRef}
						className="pointer-events-none"
						style={{ opacity: 0 }}
					>
						<AirplanePath />
					</g>

					{/* Right Dashed Line + Title Dot + Bottom Card Dot */}
					<path
						d={geometry.endPath}
						fill="none"
						stroke={`url(#${endGradId})`}
						strokeWidth="1.5"
						strokeDasharray="4 4"
						strokeLinecap="round"
					/>
					<circle
						cx={geometry.rightTopDot.x}
						cy={geometry.rightTopDot.y}
						r="2.7"
						fill="var(--secondary)"
					/>
					<circle
						cx={geometry.rightBottomDot.x}
						cy={geometry.rightBottomDot.y}
						r="2.7"
						fill="var(--primary)"
					/>
					<path
						ref={endGuideRef}
						d={geometry.endPath}
						fill="none"
						stroke="none"
						className="opacity-0 pointer-events-none"
					/>
					<g
						ref={endPlaneRef}
						className="pointer-events-none"
						style={{ opacity: 0 }}
					>
						<AirplanePath />
					</g>
				</svg>
			)}

			{/* Heading */}
			<div className="relative inline-block text-center w-full sm:w-auto">
				{/* Main Headline with fluid typography */}
				<h2
					ref={titleRef}
					className="relative w-fit mx-auto leading-[1.12] tracking-tight"
				>
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

			{/* Stats Card */}
			<div
				ref={cardRef}
				className="relative lg:mt-4 w-full text-center bg-purple-tint/50 backdrop-blur-xs rounded-2xl p-3 grid grid-cols-2 sm:grid-cols-4 justify-items-around gap-y-3 border border-primary/5"
			>
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
