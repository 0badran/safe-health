"use client";

import * as React from "react";
import Image from "next/image";
import { PlayIcon, XIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface HeroVideoCardProps {
	modalTitle?: string;
	modalDesc?: string;
}

export function HeroVideoCard({
	modalTitle = "Safe Health Experience",
	modalDesc = "Discover our personalized aesthetic care journey.",
}: HeroVideoCardProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<>
			<div
				role="button"
				tabIndex={0}
				onClick={() => setIsOpen(true)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setIsOpen(true);
					}
				}}
				aria-label="Play aesthetic care overview video"
				className="group relative aspect-[2.1/1] w-full max-w-140 overflow-hidden rounded-[26px] bg-purple-950/40 shadow-xl ring-1 ring-white/15 transition-all duration-300 hover:shadow-2xl hover:ring-white/30 cursor-pointer select-none"
			>
				{/* Aesthetic Model Image */}
				<Image
					src="/images/hero-treatment-video.png"
					alt="Safe Health aesthetic care patient preview"
					fill
					priority
					sizes="(max-width: 768px) 100vw, 460px"
					className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
				/>

				{/* Soft cinematic vignette overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 group-hover:from-black/50 transition-colors" />

				{/* Center Play Button with ripple effect */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="relative flex items-center justify-center">
						{/* Animated pulse ring */}
						<div className="absolute -inset-2.5 rounded-full bg-white/20 blur-xs transition-transform duration-300 group-hover:scale-125 animate-pulse" />

						{/* Glassmorphic Play circle */}
						<div className="relative flex size-14 sm:size-16 items-center justify-center rounded-full bg-white/35 backdrop-blur-md border border-white/50 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/45">
							<PlayIcon className="size-6 sm:size-7 fill-white text-white translate-x-0.5" />
						</div>
					</div>
				</div>
			</div>

			{/* Video Playback Modal */}
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#1e1342] p-0 text-white shadow-2xl">
					<div className="relative aspect-video w-full bg-black">
						<iframe
							className="size-full"
							src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
							title={modalTitle}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
					<div className="p-6">
						<DialogTitle className="text-xl font-bold text-white">
							{modalTitle}
						</DialogTitle>
						<p className="mt-2 text-sm text-white/70">{modalDesc}</p>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
