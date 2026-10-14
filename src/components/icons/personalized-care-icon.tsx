import * as React from "react";

export function PersonalizedCareIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="size-10 text-secondary shrink-0"
			{...props}
		>
			<path
				d="M8 28.5L15 25.5C16.5 25 18 25.5 19 26.5L22 29.5C23.5 31 25.5 31.5 27.5 30.5L33 27"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8 28.5C8 28.5 10 32 14 33C17 33.8 21 32 23.5 30"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="23"
				cy="15"
				r="4"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M16 23C16 19.5 19 18 23 18C27 18 30 19.5 30 23"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M31 10L31.5 11.5L33 12L31.5 12.5L31 14L30.5 12.5L29 12L30.5 11.5L31 10Z"
				fill="currentColor"
			/>
			<path
				d="M14 13L14.4 14.2L15.6 14.6L14.4 15L14 16.2L13.6 15L12.4 14.6L13.6 14.2L14 13Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default PersonalizedCareIcon;
