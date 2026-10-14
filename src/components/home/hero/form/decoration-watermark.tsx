export function DecorationWatermark() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none select-none absolute -right-6 -top-6 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] opacity-[0.07] text-[#392579] overflow-hidden"
		>
			<svg
				viewBox="0 0 300 300"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="w-full h-full"
			>
				{/* Globe Circle and Latitude / Longitude lines */}
				<circle cx="170" cy="130" r="110" stroke="currentColor" strokeWidth="4" />
				<ellipse cx="170" cy="130" rx="110" ry="45" stroke="currentColor" strokeWidth="3" strokeDasharray="6 4" />
				<ellipse cx="170" cy="130" rx="45" ry="110" stroke="currentColor" strokeWidth="3" />
				<line x1="60" y1="130" x2="280" y2="130" stroke="currentColor" strokeWidth="3" />
				<line x1="170" y1="20" x2="170" y2="240" stroke="currentColor" strokeWidth="3" />

				{/* Stylized Safe Health S Motif */}
				<path
					d="M210 80C195 65 170 65 155 75C135 88 140 110 165 125C195 142 195 170 170 185C150 196 125 190 110 175"
					stroke="currentColor"
					strokeWidth="18"
					strokeLinecap="round"
					opacity="0.75"
				/>

				{/* Airplane Silhouette Flying Across */}
				<g transform="translate(145, 55) rotate(-25) scale(0.9)">
					<path
						d="M21 16V10L13 5V1.5C13 0.67 12.33 0 11.5 0C10.67 0 10 0.67 10 1.5V5L2 10V16L10 13.5V19L8 20.5V23L11.5 22L15 23V20.5L13 19V13.5L21 16Z"
						fill="currentColor"
					/>
				</g>
			</svg>
		</div>
	);
}
