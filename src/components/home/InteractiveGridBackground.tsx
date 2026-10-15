"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface InteractiveGridProps {
	children?: React.ReactNode;
	className?: string;
	squareSize?: number; // حجم المربع بالبيكسل
	hoverColor?: string; // لون المربع عند الهوفر
	borderColor?: string; // لون خطوط الشبكة
	maskImage?: string; // مسار صورة الماسك إن وجدت
	style?: React.CSSProperties;
}

export const InteractiveGridBackground: React.FC<InteractiveGridProps> = ({
	children,
	className,
	squareSize = 60,
	hoverColor = "rgba(255, 255, 255, 0.2)",
	borderColor = "rgba(255, 255, 255, 0.08)",
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
				maskImage: `url(${maskImage})`,
				WebkitMaskImage: `url(${maskImage})`,
				maskSize: "cover",
				WebkitMaskSize: "cover",
				maskPosition: "top center",
				WebkitMaskPosition: "top center",
				maskRepeat: "no-repeat",
				WebkitMaskRepeat: "no-repeat",
			}
		: {};

	return (
		<div
			ref={containerRef}
			style={{
				...maskStyles,
				...style,
			}}
			className={cn("relative overflow-hidden", className)}
		>
			{/* طبقة شبكة المربعات */}
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
								borderColor: borderColor,
								"--hover-bg": hoverColor,
							} as React.CSSProperties
						}
						className="border-r border-b bg-transparent transition-colors duration-1000 ease-out hover:bg-(--hover-bg) hover:duration-0"
					/>
				))}
			</div>

			{/* المحتوى فوق الخلفية في حال تمرير children */}
			{children && (
				<div className="relative z-10 pointer-events-none">
					{children}
				</div>
			)}
		</div>
	);
};

export default InteractiveGridBackground;