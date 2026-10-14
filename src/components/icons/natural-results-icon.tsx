import * as React from "react";

export function NaturalResultsIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="size-10 text-secondary shrink-0"
			{...props}
		>
			<path
				d="M8 14L14 8L16.5 10.5L10.5 16.5L8 14Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M14 8L16 6M10.5 11.5L8.5 9.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M13.5 13.5L20 20"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M20 20L22 22"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M17 26C19 28 21.5 29 23 27C24.5 25 24 22 26 20C28 18 29.5 18 30 15"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeDasharray="2 3"
			/>
			<path
				d="M23 27C24 30 25.5 32 28 32"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M12 21L12.5 23L14.5 23.5L12.5 24L12 26L11.5 24L9.5 23.5L11.5 23L12 21Z"
				fill="currentColor"
			/>
			<path
				d="M29 9L29.5 10.5L31 11L29.5 11.5L29 13L28.5 11.5L27 11L28.5 10.5L29 9Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default NaturalResultsIcon;
