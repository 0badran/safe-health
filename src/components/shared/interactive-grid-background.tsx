"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface InteractiveGridProps {
	children?: React.ReactNode;
	className?: string;
	squareSize?: number;
	hoverColor?: string;
	borderColor?: string;
	borderOpacity?: number;
	maskImage?: string;
	style?: React.CSSProperties;
}

const InteractiveGridBackground: React.FC<InteractiveGridProps> = ({
	children,
	className,
	squareSize = 60,
	hoverColor = "rgba(255, 255, 255, 0.2)",
	borderColor = "rgba(255, 255, 255, 0.08)",
	borderOpacity,
	maskImage,
	style,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [grid, setGrid] = useState({ rows: 0, cols: 0 });

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const calculateGrid = () => {
			const { width, height } = el.getBoundingClientRect();
			if (width === 0 || height === 0) return;
			const cols = Math.ceil(width / squareSize);
			const rows = Math.ceil(height / squareSize);
			setGrid((prev) => {
				if (prev.rows === rows && prev.cols === cols) return prev;
				return { rows, cols };
			});
		};

		calculateGrid();

		const resizeObserver = new ResizeObserver(() => {
			calculateGrid();
		});
		resizeObserver.observe(el);

		window.addEventListener("resize", calculateGrid);
		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", calculateGrid);
		};
	}, [squareSize]);

	const totalSquares = grid.rows * grid.cols;

	const maskStyles: React.CSSProperties = maskImage
		? {
				maskImage: `url("${maskImage}")`,
				WebkitMaskImage: `url("${maskImage}")`,
				maskSize: "cover",
				WebkitMaskSize: "cover",
				maskPosition: "top center",
				WebkitMaskPosition: "top center",
				maskRepeat: "no-repeat",
				WebkitMaskRepeat: "no-repeat",
			}
		: {};

	const resolvedBorderColor =
		borderOpacity !== undefined
			? `color-mix(in srgb, ${borderColor} ${borderOpacity <= 1 ? borderOpacity * 100 : borderOpacity}%, transparent)`
			: borderColor;

	return (
		<div
			ref={containerRef}
			style={{
				...maskStyles,
				...style,
			}}
			className={cn("overflow-hidden absolute pointer-events-auto inset-0 z-0", className)}
		>
			{/* Grid Layer */}
			<div
				className="absolute inset-0 grid pointer-events-auto"
				style={{
					gridTemplateColumns: `repeat(${grid.cols}, ${squareSize}px)`,
					gridTemplateRows: `repeat(${grid.rows}, ${squareSize}px)`,
				}}
			>
				{Array.from({ length: totalSquares }).map((_, index) => (
					<div
						key={index}
						style={
							{
								borderColor: resolvedBorderColor,
								"--hover-bg": hoverColor,
							} as React.CSSProperties
						}
						className="border-r border-b bg-transparent transition-colors duration-1500 ease-out hover:bg-(--hover-bg) hover:duration-0"
					/>
				))}
			</div>

			{/* Content Layer (when children are provided) */}
			{children && (
				<div className="relative z-10 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
					{children}
				</div>
			)}
		</div>
	);
};

export default InteractiveGridBackground;
