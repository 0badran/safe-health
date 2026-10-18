// Requires Tailwind CSS. Move the font import below into your global CSS

import Image from "next/image";
import { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";

// (or use next/font) if you prefer.
const FONTS = `
  @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Inter:wght@400&family=Merienda+One&display=swap");
`;

const BLOB_A =
	"M361.9 3.07C430.64 13.59 480.98 67.09 533.02 113.21C579.79 154.66 624.19 197.95 647.27 256.02C671.55 317.11 689 385.97 665.87 447.51C643.12 508.02 580.29 539.39 527.01 576C475.29 611.52 424.63 655.3 361.9 656.33C298.72 657.38 246.99 613.98 192.79 581.51C132.47 545.37 61.3 519.37 29.02 456.9C-5.76 389.62 -7.38 308.37 14.09 235.73C35.92 161.85 83.95 97.16 147.99 54.32C210.46 12.53 287.6 -8.29 361.9 3.07Z";
const BLOB_B =
	"M124.46 0.17C156.86 -1.51 189.22 9.46 212.5 32.12C236.1 55.1 248.69 87.44 247.97 120.42C247.27 152.72 231.81 182.41 208.73 204.94C185.98 227.14 156.2 241.72 124.46 240.97C93.38 240.24 66.41 222.74 44.05 201.08C21.19 178.94 -0.2 152.29 0 120.42C0.2 88.69 22.27 62.79 45.05 40.77C67.3 19.28 93.62 1.76 124.46 0.17Z";

/* ---------- icons (24px grid, inherit colour from the parent) ---------- */
const icon = (children: ReactNode) =>
	function Icon() {
		return (
			<svg
				viewBox="0 0 24 24"
				className="size-7"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				{children}
			</svg>
		);
	};

const ChatIcon = icon(
	<>
		<path d="M20 11.5a7.5 7.5 0 0 1-11.4 6.4L4 19l1.1-3.6A7.5 7.5 0 1 1 20 11.5Z" />
		<path d="M9 10h6M9 13.5h3.5" />
	</>,
);
const DocIcon = icon(
	<>
		<path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
		<path d="M14 3v4h4M8.5 12h7M8.5 15.5h7M8.5 18.5h4" />
	</>,
);
const CalendarIcon = icon(
	<>
		<rect x="3" y="4.5" width="18" height="16.5" rx="3" />
		<path d="M8 2.5v4M16 2.5v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
	</>,
);
const HeartPlusIcon = icon(
	<>
		<path d="M12 20.5C7 16.8 3 13.4 3 9.2 3 6.5 5.1 4.5 7.6 4.5c1.7 0 3.2.9 4.4 2.5 1.2-1.6 2.7-2.5 4.4-2.5 2.5 0 4.6 2 4.6 4.7 0 .7-.1 1.3-.3 1.9" />
		<path d="M18 15v6M15 18h6" />
	</>,
);

/* ---------- data ---------- */
const STEPS = [
	{
		title: "Initial Consultation",
		text: "We listen to your concerns, understand your needs, and discuss the best options for you.",
		Icon: ChatIcon,
		offset: "lg:mt-[100px]",
		imgSrc: "/images/steps/img1.png",
		svg: "",
	},
	{
		title: "Treatment Planning",
		text: "We create a personalized treatment plan based on your goals and medical needs.",
		Icon: DocIcon,
		offset: "lg:mt-[47px]",
		imgSrc: "/images/steps/img2.png",
	},
	{
		title: "Care Coordination",
		text: "We handle the details — appointments, logistics, and communication with your care team.",
		Icon: CalendarIcon,
		offset: "lg:mt-0",
		imgSrc: "/images/steps/img3.png",
	},
	{
		title: "Follow-Up Support",
		text: "We stay connected to ensure your progress, answer your questions, and support your ongoing care.",
		Icon: HeartPlusIcon,
		offset: "lg:mt-[39px]",
		imgSrc: "/images/steps/img4.png",
	},
];

function Step({
	n,
	title,
	text,
	Icon,
	offset,
	imgSrc,
}: {
	n: number;
	title: string;
	text: string;
	Icon: React.ComponentType;
	offset: string;
	imgSrc: string;
}) {
	return (
		<li className={`flex flex-col gap-2 ${offset}`}>
			<div className="relative h-[203px] w-[209px] shrink-0">
				<svg
					viewBox="0 0 676.72 656.35"
					preserveAspectRatio="none"
					aria-hidden="true"
					className="absolute inset-0 size-full"
				>
					<path d={BLOB_A} fill="#EAF5F4" />
				</svg>
				<svg
					viewBox="0 0 248 241"
					preserveAspectRatio="none"
					aria-hidden="true"
					className="absolute left-0.75 -top-1.25 h-48 w-47"
				>
					<path d={BLOB_B} fill="#EAF5F4" />
				</svg>
				<Image
					src={imgSrc}
					alt=""
					width={200}
					height={200}
					className="relative z-10"
				/>
				<span className="absolute -bottom-1 left-2 z-11 grid size-15.75 place-items-center rounded-full bg-[#EAF5F4] text-[#159BA8]">
					<Icon />
				</span>
			</div>

			<div className="flex flex-col gap-1">
				<span className="font-['Merienda_One'] text-3xl leading-9 tracking-tight text-[#159BA8]">
					{String(n).padStart(2, "0")}
				</span>
				<h3 className="font-['Merienda_One'] text-xl font-normal leading-7 text-[#0F172A]">
					{title}
				</h3>
				<p className="max-w-67.5 py-0.75 font-['Inter'] text-sm leading-[22.75px] text-[#475569]">
					{text}
				</p>
			</div>
		</li>
	);
}

function Annotation() {
	return (
		<div
			className="pointer-events-none absolute right-6 top-16 hidden w-62.5 md:block"
			aria-hidden="true"
		>
			<p className="rotate-[-5deg] font-['Caveat'] text-[clamp(22px,2.9vw,36px)] font-bold leading-10 tracking-[0.9px] text-[#78A9B8]">
				Health Care
				<br />
				<span className="ml-3">Beyond Borders</span>
			</p>
			<svg
				viewBox="0 0 22.16 23.33"
				className="ml-52.5 mt-1 size-9 -rotate-12 fill-[#159BA8]"
			>
				<path d="M22.16 16.33V14L12.83 8.16V1.75a1.75 1.75 0 0 0-3.5 0v6.41L0 14v2.33l9.33-2.92v6.42L7 21.58v1.75l4.08-1.17 4.08 1.17v-1.75l-2.33-1.75v-6.42l9.33 2.92Z" />
			</svg>
		</div>
	);
}

/* ---------- section ---------- */
export default function StepsSection() {
	return (
		<section className="relative w-full overflow-hidden rounded-[47px] bg-[url('/images/steps/back.png')] bg-cover bg-center bg-no-repeat">
			<style>{FONTS}</style>
			<Annotation />

			<div className="">
				<header className="flex max-w-182 flex-col gap-3">
					<h2 className="font-['Merienda_One'] text-3xl font-normal leading-[1.1] tracking-[-0.04em] text-[#392579] md:text-5xl">
						Your Journey,
						<br />
						Every Step of the Way.
					</h2>
					<p className="max-w-142 font-['Inter'] text-base leading-7 text-paragraph md:text-lg">
						From understanding your needs to supporting your recovery, we re
						here to help make every step clearer.
					</p>
				</header>

				<div className="relative mt-12 lg:mt-0">
					<ol className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:items-start ">
						{STEPS.map((s, i) => (
							<Step key={s.title} n={i + 1} {...s} />
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}
