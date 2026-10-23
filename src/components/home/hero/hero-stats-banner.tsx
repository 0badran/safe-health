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

const START_LINE_PATH =
	"M 22.74 99.12 C 22.65 99.03, 23.17 99.39, 22.2 98.55 C 21.23 97.71, 18.71 95.79, 16.9 94.07 C 15.09 92.35, 13.04 90.29, 11.34 88.24 C 9.63 86.19, 8.04 84.02, 6.67 81.74 C 5.3 79.46, 4.08 77.04, 3.14 74.55 C 2.2 72.06, 1.47 69.44, 1.04 66.81 C 0.61 64.19, 0.45 61.46, 0.56 58.8 C 0.68 56.14, 1.09 53.45, 1.73 50.87 C 2.37 48.29, 3.29 45.72, 4.39 43.3 C 5.49 40.88, 6.85 38.52, 8.36 36.32 C 9.87 34.12, 11.58 32.02, 13.43 30.1 C 15.28 28.18, 17.3 26.36, 19.44 24.77 C 21.58 23.18, 23.89 21.73, 26.28 20.56 C 28.67 19.39, 31.21 18.38, 33.79 17.77 C 36.37 17.16, 39.26 16.82, 41.75 16.88 C 44.24 16.94, 47.24 17.81, 48.72 18.14 C 50.2 18.47, 49.19 18.42, 50.6 18.86 C 52.01 19.3, 54.77 20.39, 57.18 20.76 C 59.59 21.14, 62.48 21.44, 65.04 21.11 C 67.6 20.78, 70.25 19.99, 72.53 18.8 C 74.81 17.61, 76.95 15.86, 78.75 13.98 C 80.55 12.1, 82.08 9.81, 83.35 7.54 C 84.62 5.27, 85.87 1.56, 86.37 0.36";

const END_LINE_PATH =
	"M 2.87 2.67 C 3.45 3.87, 4.97 7.58, 6.32 9.86 C 7.67 12.13, 9.25 14.33, 10.98 16.32 C 12.71 18.32, 14.62 20.23, 16.71 21.83 C 18.8 23.43, 21.1 24.87, 23.5 25.9 C 25.9 26.93, 28.53 27.67, 31.12 28.02 C 33.71 28.37, 36.44 28.31, 39.04 28 C 41.64 27.69, 44.25 27, 46.74 26.16 C 49.23 25.32, 51.81 24.09, 54.01 22.98 C 56.21 21.87, 58.67 20.24, 59.94 19.47 C 61.21 18.7, 60.32 19.12, 61.64 18.36 C 62.96 17.6, 65.56 15.97, 67.84 14.93 C 70.12 13.88, 72.75 12.83, 75.3 12.09 C 77.84 11.35, 80.48 10.8, 83.11 10.46 C 85.74 10.13, 88.44 10, 91.09 10.08 C 93.74 10.16, 96.42 10.45, 99.03 10.94 C 101.64 11.43, 104.24 12.13, 106.74 13.01 C 109.24 13.89, 111.71 14.97, 114.04 16.24 C 116.37 17.5, 118.64 18.97, 120.74 20.6 C 122.83 22.23, 124.83 24.04, 126.61 26 C 128.39 27.96, 130.04 30.1, 131.44 32.35 C 132.84 34.6, 134.06 37.02, 135 39.49 C 135.94 41.96, 136.65 44.58, 137.09 47.19 C 137.53 49.8, 137.7 52.5, 137.63 55.15 C 137.56 57.8, 137.21 60.47, 136.68 63.06 C 136.15 65.65, 135.37 68.22, 134.44 70.71 C 133.51 73.2, 132.25 75.79, 131.1 77.99 C 129.95 80.19, 128.17 82.79, 127.52 83.9 C 126.87 85.01, 127.26 84.54, 127.21 84.67";

function AirplanePath() {
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

interface LineProps {
	className?: string;
	guideRef: React.RefObject<SVGPathElement | null>;
	planeRef: React.RefObject<SVGGElement | null>;
}

function StartLine({ className, guideRef, planeRef }: LineProps) {
	return (
		<svg
			width="87"
			height="102"
			viewBox="0 0 87 102"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(
				"pointer-events-none select-none overflow-visible",
				className,
			)}
		>
			<path
				d="M49.7478 18.5209L49.9381 18.0585L49.7478 18.5209ZM22.9453 99.1231L23.2461 98.7237C22.6956 98.3091 22.1567 97.8928 21.6293 97.475L21.3188 97.8669L21.0083 98.2587C21.5422 98.6817 22.0875 99.103 22.6445 99.5225L22.9453 99.1231ZM18.2625 95.3172L18.5927 94.9417C17.5622 94.0354 16.5829 93.1229 15.6534 92.2053L15.3021 92.5611L14.9508 92.9169C15.8944 93.8484 16.8877 94.774 17.9323 95.6926L18.2625 95.3172ZM12.5258 89.6434L12.8989 89.3106C11.9942 88.2962 11.147 87.2768 10.3556 86.2537L9.96009 86.5596L9.56462 86.8656C10.3707 87.9075 11.2327 88.9448 12.1526 89.9762L12.5258 89.6434ZM7.63003 83.3008L8.04776 83.026C7.30373 81.8948 6.62432 80.7608 6.00688 79.6257L5.56765 79.8646L5.12842 80.1035C5.75942 81.2636 6.45322 82.4215 7.21229 83.5755L7.63003 83.3008ZM3.80995 76.258L4.26896 76.0598C3.73296 74.8189 3.26756 73.5787 2.86937 72.3411L2.3934 72.4943L1.91744 72.6474C2.32555 73.9158 2.8023 75.1862 3.35095 76.4563L3.80995 76.258ZM1.35582 68.6122L1.84479 68.5078C1.56467 67.1964 1.35696 65.8905 1.2176 64.5925L0.720458 64.6459L0.223315 64.6993C0.366333 66.0313 0.57949 67.3714 0.866849 68.7167L1.35582 68.6122ZM0.500225 60.6318L1.00022 60.6305C0.996597 59.297 1.06282 57.975 1.19439 56.6673L0.696902 56.6173L0.199414 56.5672C0.0644625 57.9085 -0.00349385 59.2648 0.000226736 60.6332L0.500225 60.6318ZM1.30017 52.6442L1.79015 52.7438C2.05473 51.4422 2.38266 50.1587 2.76918 48.8964L2.29109 48.75L1.813 48.6036C1.41727 49.8959 1.08134 51.2107 0.810191 52.5446L1.30017 52.6442ZM3.64537 44.9667L4.10788 45.1566C4.61216 43.9288 5.17127 42.7259 5.78029 41.5513L5.33642 41.3212L4.89254 41.091C4.27022 42.2912 3.69862 43.5209 3.18286 44.7767L3.64537 44.9667ZM7.33763 37.836L7.76029 38.1032C8.47056 36.9793 9.22652 35.8879 10.0231 34.8321L9.62395 34.531L9.22481 34.2298C8.41188 35.3072 7.6402 36.4214 6.91497 37.5689L7.33763 37.836ZM12.1726 31.4244L12.546 31.7569C13.4323 30.7618 14.3551 29.8072 15.309 28.8966L14.9637 28.5349L14.6185 28.1733C13.6451 29.1024 12.7036 30.0765 11.7993 31.0918L12.1726 31.4244ZM17.9842 25.8796L18.2985 26.2684C19.3392 25.4271 20.407 24.6364 21.4959 23.9002L21.2159 23.486L20.9358 23.0718C19.823 23.8241 18.7324 24.6318 17.6698 25.4907L17.9842 25.8796ZM24.6436 21.3851L24.8852 21.8229C26.0588 21.1754 27.2486 20.5915 28.4481 20.0754L28.2504 19.6161L28.0528 19.1568C26.8224 19.6862 25.6033 20.2846 24.4021 20.9473L24.6436 21.3851ZM32.0148 18.228L32.1617 18.7059C33.445 18.3115 34.7311 17.998 36.0121 17.7704L35.9246 17.2781L35.8372 16.7859C34.514 17.0209 33.1883 17.3442 31.8679 17.75L32.0148 18.228ZM39.9191 16.8463L39.9373 17.346C41.2645 17.2976 42.5771 17.3497 43.8661 17.5075L43.9269 17.0113L43.9877 16.515C42.6436 16.3503 41.2782 16.2965 39.9009 16.3467L39.9191 16.8463ZM47.8537 17.8425L47.707 18.3205C48.3324 18.5124 48.9496 18.7331 49.5576 18.9832L49.7478 18.5209L49.9381 18.0585C49.3012 17.7964 48.6549 17.5653 48.0004 17.3645L47.8537 17.8425ZM49.7478 18.5209L49.5576 18.9832C50.1963 19.2461 50.8251 19.4888 51.4442 19.712L51.6138 19.2417L51.7835 18.7713C51.1786 18.5532 50.5635 18.3158 49.9381 18.0585L49.7478 18.5209ZM55.3901 20.3962L55.2694 20.8814C56.6386 21.2219 57.9548 21.4621 59.2198 21.6116L59.2784 21.1151L59.3371 20.6185C58.1159 20.4742 56.8411 20.2418 55.5108 19.911L55.3901 20.3962ZM63.2324 21.2874L63.2499 21.7871C64.6603 21.7378 65.9956 21.5688 67.2589 21.2981L67.1541 20.8092L67.0493 20.3203C65.8442 20.5785 64.5673 20.7405 63.2149 20.7877L63.2324 21.2874ZM70.9201 19.623L71.1148 20.0836C72.3947 19.5425 73.5807 18.8936 74.6781 18.1663L74.4018 17.7496L74.1256 17.3328C73.0766 18.028 71.945 18.6469 70.7254 19.1625L70.9201 19.623ZM77.4999 15.2908L77.8417 15.6557C78.8483 14.7128 79.7552 13.7124 80.5697 12.6928L80.1791 12.3807L79.7884 12.0687C79.0005 13.0549 78.126 14.0193 77.1581 14.9259L77.4999 15.2908ZM82.4483 9.14254L82.8742 9.40456C83.6287 8.17835 84.262 6.98127 84.7867 5.87908L84.3353 5.66415L83.8838 5.44922C83.3724 6.52352 82.7558 7.68865 82.0225 8.88051L82.4483 9.14254ZM85.8509 2.00544L86.3224 2.17189C86.5315 1.57979 86.6824 1.10134 86.7814 0.769507C86.8309 0.603575 86.8674 0.474252 86.8918 0.385658C86.904 0.341359 86.9131 0.307238 86.9193 0.283808C86.9224 0.272093 86.9248 0.26305 86.9264 0.256745C86.9272 0.253592 86.9278 0.251123 86.9283 0.249346C86.9285 0.248458 86.9287 0.247742 86.9288 0.247201C86.9289 0.24693 86.929 0.246703 86.929 0.24652C86.929 0.246428 86.9291 0.246347 86.9291 0.246277C86.9291 0.246242 86.9291 0.246198 86.9291 0.24618C86.9291 0.246139 86.9291 0.2461 86.4445 0.12313C85.9598 0.000159606 85.9598 0.00012628 85.9598 9.56729e-05C85.9598 8.91015e-05 85.9599 6.12065e-05 85.9599 4.80562e-05C85.9599 2.17408e-05 85.9599 6.28829e-06 85.9599 1.69128e-06C85.9599 -7.50273e-06 85.9599 2.66954e-05 85.9598 0.000104174C85.9598 0.000259131 85.9597 0.00058718 85.9596 0.00108732C85.9593 0.00208761 85.9589 0.00377624 85.9583 0.0061452C85.9571 0.0108832 85.9551 0.0183423 85.9524 0.0284585C85.9471 0.0486912 85.9389 0.0795502 85.9276 0.120524C85.905 0.202474 85.8705 0.324862 85.8231 0.483596C85.7284 0.801099 85.5825 1.2638 85.3795 1.83898L85.8509 2.00544ZM20.2786 99.1231C20.2786 100.596 21.4726 101.79 22.9453 101.79C24.4181 101.79 25.612 100.596 25.612 99.1231C25.612 97.6504 24.4181 96.4565 22.9453 96.4565C21.4726 96.4565 20.2786 97.6504 20.2786 99.1231Z"
				fill="url(#paint0_linear_start_line)"
			/>
			{/* Guide path for accurate plane motion */}
			<path
				ref={guideRef}
				d={START_LINE_PATH}
				fill="none"
				stroke="none"
				className="opacity-0 pointer-events-none"
			/>
			{/* Animated Airplane */}
			<g ref={planeRef} className="pointer-events-none" style={{ opacity: 0 }}>
				<AirplanePath />
			</g>
			<defs>
				<linearGradient
					id="paint0_linear_start_line"
					x1="-104.444"
					y1="42.5675"
					x2="121.197"
					y2="-69.461"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--primary)" stopOpacity="0.2" />
					<stop offset="1" stopColor="var(--primary)" />
				</linearGradient>
			</defs>
		</svg>
	);
}

function EndLine({ className, guideRef, planeRef }: LineProps) {
	return (
		<svg
			width="145"
			height="95"
			viewBox="0 0 145 95"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(
				"pointer-events-none select-none overflow-visible",
				className,
			)}
		>
			<path
				d="M60.7177 18.9616L60.9977 19.3759V19.3759L60.7177 18.9616ZM127 84.6667L126.589 84.3822C126.977 83.821 127.354 83.2609 127.719 82.702L128.138 82.9754L128.556 83.2489C128.186 83.8153 127.805 84.3828 127.411 84.9512L127 84.6667ZM130.216 79.5944L129.783 79.3446C130.461 78.1697 131.088 77.0007 131.666 75.8385L132.114 76.0613L132.561 76.284C131.974 77.4649 131.337 78.6519 130.65 79.8441L130.216 79.5944ZM133.78 72.416L133.318 72.2237C133.837 70.979 134.299 69.7433 134.709 68.5175L135.183 68.6759L135.657 68.8342C135.24 70.0833 134.769 71.3417 134.241 72.6082L133.78 72.416ZM136.299 64.8458L135.814 64.725C136.138 63.4229 136.401 62.1336 136.607 60.8585L137.1 60.9381L137.594 61.0177C137.384 62.3209 137.115 63.6376 136.784 64.9665L136.299 64.8458ZM137.561 56.9734L137.062 56.9382C137.156 55.6047 137.187 54.2888 137.157 52.9921L137.657 52.9805L138.157 52.9689C138.187 54.297 138.156 55.6442 138.06 57.0087L137.561 56.9734ZM137.371 48.9935L136.874 49.0536C136.715 47.733 136.491 46.4353 136.207 45.1622L136.695 45.0534L137.183 44.9445C137.474 46.2497 137.704 47.58 137.867 48.9335L137.371 48.9935ZM135.632 41.2003L135.157 41.3571C134.742 40.1008 134.267 38.8724 133.735 37.6739L134.192 37.471L134.649 37.2682C135.194 38.4964 135.681 39.7555 136.107 41.0435L135.632 41.2003ZM132.394 33.9007L131.959 34.1468C131.31 32.9996 130.607 31.8848 129.853 30.8048L130.264 30.5187L130.674 30.2326C131.445 31.3381 132.165 32.4794 132.829 33.6545L132.394 33.9007ZM127.828 27.3491L127.446 27.6714C126.598 26.6656 125.703 25.6964 124.766 24.7658L125.118 24.411L125.471 24.0562C126.429 25.0072 127.343 25.9981 128.211 27.0268L127.828 27.3491ZM122.163 21.7194L121.843 22.103C120.834 21.2595 119.786 20.4561 118.705 19.6948L118.992 19.2859L119.28 18.877C120.384 19.6541 121.454 20.4743 122.484 21.3357L122.163 21.7194ZM115.633 17.1202L115.379 17.5511C114.245 16.8835 113.082 16.2591 111.891 15.6798L112.11 15.2302L112.329 14.7806C113.543 15.3715 114.73 16.0084 115.886 16.6894L115.633 17.1202ZM108.45 13.623L108.267 14.0883C107.043 13.6067 105.796 13.1711 104.529 12.7832L104.676 12.3051L104.822 11.827C106.113 12.2225 107.385 12.6667 108.633 13.1577L108.45 13.623ZM100.811 11.2826L100.702 11.7705C99.4185 11.4833 98.1194 11.2445 96.8083 11.0559L96.8795 10.561L96.9507 10.0661C98.2874 10.2584 99.6118 10.5018 100.921 10.7946L100.811 11.2826ZM92.9036 10.1455L92.8709 10.6444C91.5594 10.5586 90.2392 10.5232 88.9136 10.54L88.9073 10.04L88.901 9.54006C90.2528 9.52299 91.5989 9.55908 92.9362 9.64658L92.9036 10.1455ZM84.9147 10.2471L84.9602 10.745C83.653 10.8644 82.3435 11.0355 81.0347 11.26L80.9501 10.7672L80.8656 10.2744C82.2005 10.0454 83.5361 9.8709 84.8692 9.74915L84.9147 10.2471ZM77.039 11.5982L77.1621 12.0828C75.8938 12.4051 74.6287 12.7793 73.3696 13.207L73.2088 12.7336L73.0479 12.2602C74.332 11.824 75.6222 11.4423 76.9159 11.1136L77.039 11.5982ZM69.4801 14.1649L69.6773 14.6244C68.4781 15.1391 67.2868 15.7049 66.1058 16.323L65.874 15.88L65.6421 15.4371C66.8458 14.807 68.0602 14.2303 69.2829 13.7055L69.4801 14.1649ZM62.4083 17.8639L62.6727 18.2883C62.1113 18.6381 61.5529 19.0006 60.9977 19.3759L60.7177 18.9616L60.4377 18.5473C61.0031 18.1652 61.5719 17.796 62.1438 17.4396L62.4083 17.8639ZM60.7177 18.9616L60.9977 19.3759C60.424 19.7636 59.8549 20.1378 59.2904 20.4986L59.0211 20.0773L58.7518 19.656C59.309 19.2999 59.8709 18.9304 60.4377 18.5473L60.7177 18.9616ZM55.6206 22.1228L55.8659 22.5584C54.6611 23.237 53.4785 23.8536 52.3178 24.4113L52.1012 23.9606L51.8847 23.51C53.025 22.962 54.1885 22.3555 55.3752 21.6871L55.6206 22.1228ZM48.4583 25.5482L48.64 26.014C47.3432 26.52 46.0757 26.9509 44.8372 27.3115L44.6974 26.8314L44.5576 26.3514C45.7666 25.9993 47.0061 25.5781 48.2765 25.0824L48.4583 25.5482ZM40.8377 27.7482L40.9275 28.2401C39.5615 28.4895 38.2343 28.6514 36.9456 28.7334L36.9138 28.2345L36.882 27.7355C38.1309 27.6559 39.4193 27.4989 40.7479 27.2563L40.8377 27.7482ZM32.9261 28.2306L32.8924 28.7294C31.5105 28.6361 30.1793 28.4492 28.898 28.181L29.0004 27.6916L29.1029 27.2022C30.3392 27.461 31.6245 27.6415 32.9598 27.7317L32.9261 28.2306ZM25.1747 26.6031L25.0043 27.0732C23.7141 26.6056 22.4839 26.056 21.3126 25.4409L21.5451 24.9982L21.7775 24.5555C22.9107 25.1506 24.0995 25.6816 25.3451 26.1331L25.1747 26.6031ZM18.1524 22.9305L17.8664 23.3406C16.7447 22.5581 15.6886 21.7204 14.6965 20.8473L15.0269 20.4719L15.3572 20.0966C16.3232 20.9468 17.3499 21.761 18.4385 22.5204L18.1524 22.9305ZM12.1795 17.6968L11.8135 18.0374C10.8722 17.0258 10.0049 15.9961 9.20969 14.974L9.60431 14.667L9.99895 14.3599C10.7777 15.361 11.626 16.368 12.5456 17.3561L12.1795 17.6968ZM7.2901 11.4308L6.8723 11.7054C6.07477 10.4923 5.38446 9.33289 4.79758 8.27612L5.2347 8.03337L5.67181 7.79061C6.24791 8.82797 6.92543 9.96589 7.7079 11.1561L7.2901 11.4308ZM3.44226 4.49348L2.98738 4.70105C2.72354 4.12282 2.52734 3.66 2.39667 3.34057C2.33133 3.18084 2.28236 3.05694 2.24951 2.97235C2.23308 2.93006 2.22067 2.89759 2.21227 2.87538C2.20805 2.86428 2.20485 2.85574 2.20264 2.84982C2.20152 2.84686 2.20067 2.84456 2.20006 2.84291C2.19975 2.84209 2.19951 2.84144 2.19933 2.84095C2.19923 2.8407 2.19916 2.8405 2.1991 2.84034C2.19907 2.84026 2.19905 2.84019 2.19902 2.84013C2.19901 2.8401 2.19899 2.84006 2.19899 2.84004C2.19897 2.84001 2.19896 2.83998 2.66797 2.66667C3.13698 2.49335 3.13696 2.49333 3.13695 2.4933C3.13695 2.4933 3.13695 2.49328 3.13693 2.49327C3.13693 2.49325 3.13693 2.49324 3.13693 2.49324C3.13693 2.49325 3.13695 2.4933 3.13698 2.49338C3.13705 2.49356 3.13718 2.4939 3.13736 2.49441C3.13774 2.49542 3.13837 2.49709 3.13924 2.49942C3.14098 2.50407 3.14369 2.51133 3.14742 2.52114C3.15485 2.54077 3.16624 2.57062 3.18164 2.61025C3.21243 2.68952 3.25922 2.80791 3.32222 2.96196C3.44826 3.27006 3.63921 3.72065 3.89714 4.28592L3.44226 4.49348ZM129.667 84.6667C129.667 86.1394 128.473 87.3333 127 87.3333C125.528 87.3333 124.334 86.1394 124.334 84.6667C124.334 83.1939 125.528 82 127 82C128.473 82 129.667 83.1939 129.667 84.6667ZM5.33464 2.66667C5.33464 4.13943 4.14073 5.33333 2.66797 5.33333C1.19521 5.33333 0.001297 4.13943 0.001297 2.66667C0.001297 1.19391 1.19521 -7.15256e-07 2.66797 -7.15256e-07C4.14073 -7.15256e-07 5.33464 1.19391 5.33464 2.66667Z"
				fill="url(#paint0_linear_end_line)"
			/>
			{/* Guide path for accurate plane motion */}
			<path
				ref={guideRef}
				d={END_LINE_PATH}
				fill="none"
				stroke="none"
				className="opacity-0 pointer-events-none"
			/>
			{/* Animated Airplane */}
			<g ref={planeRef} className="pointer-events-none" style={{ opacity: 0 }}>
				<AirplanePath />
			</g>
			<defs>
				<linearGradient
					id="paint0_linear_end_line"
					x1="252.424"
					y1="40.0272"
					x2="3.70861"
					y2="-100.716"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--primary)" />
					<stop offset="1" stopColor="var(--secondary)" />
				</linearGradient>
			</defs>
		</svg>
	);
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
				"relative flex flex-col justify-center  select-none",
				className,
			)}
		>
			{/* Heading with Anchored Flight Lines */}
			<div className="relative inline-block text-center w-full sm:w-auto">
				{/* Main Headline with fluid typography */}
				<h2 className="relative w-fit  mx-auto leading-[1.12] tracking-tight">
					{/* Left Decorative Line:
				    - Tip connects to top peak of 'Y'
				    - Dot at (23, 99) lands exactly on top-left corner of stats card
				*/}
					<div
						aria-hidden="true"
						className="absolute max-lg:hidden right-[calc(100%-8px)] top-2 pointer-events-none block z-10"
					>
						<StartLine guideRef={startGuideRef} planeRef={startPlaneRef} />
					</div>

					{/* Right Decorative Line:
				    - Starts to the right of 'Care' / 'Journey,'
				    - Airplane at (127, 84) lands exactly on top-right corner of stats card
				*/}
					<div
						aria-hidden="true"
						className="absolute max-lg:hidden right-0 lg:left-[calc(100%-10px)] top-4 pointer-events-none block z-10"
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
			<div className="relative mt-4 w-full text-center bg-purple-tint/50 backdrop-blur-xs rounded-2xl p-3 grid grid-cols-2 sm:grid-cols-4 justify-items-around gap-y-3 border border-primary/5 shadow-xs">
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
