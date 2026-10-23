"use client";

import { cn } from "@/lib/utils";
import {
	Maximize,
	Minimize,
	Pause,
	Play,
	RotateCcw,
	RotateCw,
	Sparkles,
	Volume2,
	VolumeX,
	X,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface HeroVideoCardProps {
	modalTitle?: string;
	modalDesc?: string;
	videoSrc?: string;
	poster?: string;
	className?: string;
}

export function HeroVideoCard({
	modalTitle = "SafeHealth Aesthetic Care Experience",
	videoSrc = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
	poster = "/images/hero-treatment-video.png",
	className,
}: HeroVideoCardProps) {
	// Modal state
	const [isOpen, setIsOpen] = useState(false);
	const mounted = React.useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	// Lock body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	// 3D Tilt & Mouse highlight state
	const cardRef = useRef<HTMLDivElement>(null);
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	// Video playback state
	const videoRef = useRef<HTMLVideoElement>(null);
	const playerContainerRef = useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [volume, setVolume] = useState(1);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [buffered, setBuffered] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [showControls, setShowControls] = useState(true);
	const [showUnmutePrompt, setShowUnmutePrompt] = useState(false);
	const [isScrubbing, setIsScrubbing] = useState(false);

	const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Format time in MM:SS
	const formatTime = (timeInSeconds: number) => {
		if (isNaN(timeInSeconds) || timeInSeconds < 0) return "00:00";
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = Math.floor(timeInSeconds % 60);
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	// 3D Tilt calculation on mouse move
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((y - centerY) / centerY) * -6;
		const rotateY = ((x - centerX) / centerX) * 6;

		setTilt({ x: rotateX, y: rotateY });
	};

	const handleMouseLeave = () => {
		setTilt({ x: 0, y: 0 });
		setIsHovered(false);
	};

	// Video play / pause toggle
	const togglePlay = useCallback(() => {
		if (!videoRef.current) return;
		if (videoRef.current.paused || videoRef.current.ended) {
			videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
		} else {
			videoRef.current.pause();
			setIsPlaying(false);
		}
	}, []);

	// Unmute action
	const handleUnmute = () => {
		if (!videoRef.current) return;
		videoRef.current.muted = false;
		setIsMuted(false);
		setShowUnmutePrompt(false);
		if (volume === 0) {
			videoRef.current.volume = 0.8;
			setVolume(0.8);
		}
	};

	// Toggle mute
	const toggleMute = useCallback(() => {
		if (!videoRef.current) return;
		const nextMuted = !videoRef.current.muted;
		videoRef.current.muted = nextMuted;
		setIsMuted(nextMuted);
		if (!nextMuted) {
			setShowUnmutePrompt(false);
		}
	}, []);

	// Volume slider change
	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = parseFloat(e.target.value);
		setVolume(val);
		if (videoRef.current) {
			videoRef.current.volume = val;
			videoRef.current.muted = val === 0;
			setIsMuted(val === 0);
			if (val > 0) setShowUnmutePrompt(false);
		}
	};

	// Seek time
	const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!videoRef.current || !duration) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const clickPos = (e.clientX - rect.left) / rect.width;
		const newTime = clickPos * duration;
		videoRef.current.currentTime = newTime;
		setCurrentTime(newTime);
	};

	// Skip +/- 10 seconds
	const skipTime = useCallback((amount: number) => {
		if (!videoRef.current) return;
		const target = Math.max(0, Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + amount));
		videoRef.current.currentTime = target;
		setCurrentTime(target);
	}, []);

	// Toggle Fullscreen
	const toggleFullscreen = useCallback(() => {
		if (!playerContainerRef.current) return;
		if (!document.fullscreenElement) {
			playerContainerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
		} else {
			document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
		}
	}, []);

	// Auto-hide controls after inactivity
	const handlePlayerMouseMove = () => {
		setShowControls(true);
		if (controlsTimeoutRef.current) {
			clearTimeout(controlsTimeoutRef.current);
		}
		if (isPlaying && !isScrubbing) {
			controlsTimeoutRef.current = setTimeout(() => {
				setShowControls(false);
			}, 2800);
		}
	};

	// Sync duration & buffered
	const handleLoadedMetadata = () => {
		if (videoRef.current) {
			setDuration(videoRef.current.duration);
		}
	};

	const handleTimeUpdate = () => {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime);
			if (videoRef.current.buffered.length > 0) {
				const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
				setBuffered((bufferedEnd / videoRef.current.duration) * 100);
			}
		}
	};

	// Close handler
	const handleClose = useCallback(() => {
		setIsOpen(false);
		if (videoRef.current) {
			videoRef.current.pause();
		}
		setIsPlaying(false);
		setShowUnmutePrompt(false);
	}, []);

	// Autoplay with sound on modal open, fallback to muted autoplay if browser blocks
	useEffect(() => {
		if (!isOpen) return;

		const timer = setTimeout(() => {
			setShowControls(true);
			setShowUnmutePrompt(false);
			if (videoRef.current) {
				videoRef.current.currentTime = 0;
				videoRef.current.muted = false;
				const playPromise = videoRef.current.play();

				if (playPromise !== undefined) {
					playPromise
						.then(() => {
							setIsPlaying(true);
							setIsMuted(false);
						})
						.catch(() => {
							// Browser blocked sound autoplay - fallback to muted autoplay
							if (videoRef.current) {
								videoRef.current.muted = true;
								setIsMuted(true);
								setShowUnmutePrompt(true);
								videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
							}
						});
				}
			}
		}, 150);

		return () => clearTimeout(timer);
	}, [isOpen]);

	// Global Keyboard Shortcuts (ESC, Space, M, F)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isOpen) return;

			if (e.key === "Escape") {
				e.preventDefault();
				handleClose();
			} else if (e.key === " " && e.target === document.body) {
				e.preventDefault();
				togglePlay();
			} else if (e.key.toLowerCase() === "m") {
				toggleMute();
			} else if (e.key.toLowerCase() === "f") {
				toggleFullscreen();
			} else if (e.key === "ArrowLeft") {
				skipTime(-5);
			} else if (e.key === "ArrowRight") {
				skipTime(5);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, togglePlay, toggleMute, toggleFullscreen, skipTime, handleClose]);

	return (
		<>
			{/* Trigger / Thumbnail Card with 3D Tilt & Glassmorphism Play Button */}
			<div
				ref={cardRef}
				role="button"
				tabIndex={0}
				onClick={() => setIsOpen(true)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setIsOpen(true);
					}
				}}
				aria-label={`Play video: ${modalTitle}`}
				style={{
					transform: isHovered
						? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
						: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
					transition: isHovered
						? "transform 0.1s ease-out"
						: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
				}}
				className={cn(
					"group relative aspect-[2.1/1] w-full lg:max-w-150 overflow-hidden rounded-[26px] bg-card/40 cursor-pointer select-none",
					"border border-white/20 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/40 ring-1 ring-white/10 group-hover:ring-primary/40",
					className,
				)}
			>
				{/* Aesthetic Model Image */}
				<Image
					src={poster}
					alt={modalTitle}
					fill
					priority
					sizes="(max-width: 768px) 100vw, 560px"
					className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
				/>

				{/* Soft Cinematic Vignette Overlay */}
				<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors duration-300" />

				{/* Interactive Illuminated Border Highlight (Follows cursor position) */}


				{/* Center Play Button with Continuous Glowing Pulse Animation */}
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div className="relative flex items-center justify-center">
						{/* Ambient Pulsing Glow Blob matching section's primary color */}
						<div className="absolute -inset-6 rounded-full bg-primary/40 blur-xl animate-pulse" />

						{/* Continuous Expanding Wave Ring */}
						<div className="absolute -inset-3 rounded-full border border-white/30 animate-ping opacity-25" />

						{/* Secondary Gentle Glow Ring */}
						<div className="absolute -inset-1.5 rounded-full bg-white/20 blur-xs transition-transform duration-500 group-hover:scale-125" />

						{/* Glassmorphic Play Disc */}
						<div className="relative flex size-14 sm:size-16 items-center justify-center rounded-full bg-white/25 backdrop-blur-xl border border-white/50 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 group-hover:scale-110 group-hover:bg-white/40 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.45)]">
							<Play className="size-6 sm:size-7 fill-white text-white translate-x-0.5" />
						</div>
					</div>
				</div>


			</div>

			{/* Luxury Interactive Video Player Modal */}
			{isOpen &&
				mounted &&
				createPortal(
					<div
						role="dialog"
						aria-modal="true"
						aria-label={modalTitle}
						className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-300"
					>
					{/* Darkened Frosted-Glass Backdrop (Deep Blur) with Ambient Glow */}
					<div
						onClick={handleClose}
						className="fixed inset-0 bg-black/85 backdrop-blur-2xl transition-opacity cursor-pointer"
					/>

					{/* Subtle Ambient Purple / Primary Glow behind the player matching section */}
					<div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden">
						<div className="size-137.5 sm:size-187.5 rounded-full bg-primary/25 blur-[140px] animate-pulse" />
					</div>

					{/* Modal Card Container: Morphing / expanding transition into an immersive lightbox */}
					<div
						ref={playerContainerRef}
						onMouseMove={handlePlayerMouseMove}
						className={cn(
							"relative z-10 w-full max-w-4xl lg:max-w-5xl rounded-2xl sm:rounded-3xl border border-white/20 bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden",
							"animate-in zoom-in-95 duration-400 ease-out",
						)}
					>
						{/* Clean Close Button with Smooth 90deg Hover Rotation */}
						<button
							type="button"
							onClick={handleClose}
							aria-label="Close video player"
							className="group/close absolute top-4 end-4 z-40 flex size-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-black/75 hover:border-white/40 shadow-xl transition-all duration-200 cursor-pointer"
						>
							<X className="size-5 transition-transform duration-300 group-hover/close:rotate-90" />
						</button>

						{/* Quick Unmute Prompt Button (if autoplay was muted by browser policy) */}
						{showUnmutePrompt && isMuted && (
							<button
								type="button"
								onClick={handleUnmute}
								className="absolute top-4 start-4 z-40 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white small hover:bg-black/80 hover:border-white/40 shadow-xl transition-all duration-200 cursor-pointer animate-pulse"
							>
								<VolumeX className="size-4 text-secondary shrink-0" />
								<span>Tap to unmute sound</span>
							</button>
						)}

						{/* HTML5 Video Element */}
						<div
							className="relative aspect-video w-full bg-black flex items-center justify-center cursor-pointer"
							onClick={togglePlay}
						>
							<video
								ref={videoRef}
								src={videoSrc}
								poster={poster}
								playsInline
								onLoadedMetadata={handleLoadedMetadata}
								onTimeUpdate={handleTimeUpdate}
								onEnded={() => setIsPlaying(false)}
								className="size-full object-cover"
							/>

							{/* Center Play overlay indicator when paused */}
							{!isPlaying && (
								<div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity">
									<div className="flex size-16 sm:size-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/40 text-white shadow-2xl transition-transform hover:scale-110">
										<Play className="size-7 sm:size-8 fill-white text-white translate-x-0.5" />
									</div>
								</div>
							)}
						</div>

						{/* Custom Sleek Glassmorphic Media Controls (Auto-hides on inactivity, reveals on hover) */}
						<div
							className={cn(
								"absolute inset-x-0 bottom-0 z-30 p-3 sm:p-5 bg-linear-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300",
								showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none",
							)}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex flex-col gap-2 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/15 p-2.5 sm:p-3 shadow-2xl">
								{/* Interactive Timeline Scrubber with Hover Thumb & Buffer Bar */}
								<div
									role="slider"
									tabIndex={0}
									aria-label="Video scrubber"
									aria-valuemin={0}
									aria-valuemax={duration || 100}
									aria-valuenow={currentTime}
									onClick={handleSeek}
									onMouseDown={() => setIsScrubbing(true)}
									onMouseUp={() => setIsScrubbing(false)}
									className="group/scrubber relative flex h-2 sm:h-2.5 w-full items-center cursor-pointer rounded-full bg-white/20"
								>
									{/* Buffered Track Indicator */}
									<div
										className="absolute h-full rounded-full bg-white/30 transition-all duration-150"
										style={{ width: `${buffered}%` }}
									/>
									{/* Played Progress Bar with Brand Gradient */}
									<div
										className="relative h-full rounded-full bg-linear-to-r from-primary to-secondary transition-all"
										style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
									>
										{/* Scrubber Playhead Handle */}
										<div className="absolute end-0 top-1/2 -translate-y-1/2 size-3.5 sm:size-4 rounded-full bg-white shadow-md transition-transform scale-75 group-hover/scrubber:scale-110" />
									</div>
								</div>

								{/* Media Controls Bottom Row */}
								<div className="flex items-center justify-between gap-3 pt-1 text-white">
									{/* Left Controls: Play/Pause, Rewind, Fast Forward, Time Display */}
									<div className="flex items-center gap-2 sm:gap-3">
										{/* Play / Pause Button */}
										<button
											type="button"
											onClick={togglePlay}
											aria-label={isPlaying ? "Pause video" : "Play video"}
											className="flex size-8 items-center justify-center rounded-lg hover:bg-white/15 transition-colors cursor-pointer text-white"
										>
											{isPlaying ? (
												<Pause className="size-5 fill-white text-white" />
											) : (
												<Play className="size-5 fill-white text-white translate-x-0.5" />
											)}
										</button>

										{/* Skip -10s */}
										<button
											type="button"
											onClick={() => skipTime(-10)}
											aria-label="Skip backward 10 seconds"
											className="hidden xs:flex size-8 items-center justify-center rounded-lg hover:bg-white/15 transition-colors cursor-pointer text-white/80 hover:text-white"
										>
											<RotateCcw className="size-4" />
										</button>

										{/* Skip +10s */}
										<button
											type="button"
											onClick={() => skipTime(10)}
											aria-label="Skip forward 10 seconds"
											className="hidden xs:flex size-8 items-center justify-center rounded-lg hover:bg-white/15 transition-colors cursor-pointer text-white/80 hover:text-white"
										>
											<RotateCw className="size-4" />
										</button>

										{/* Time Indicator */}
										<div className="small font-mono text-white/90 select-none ps-1">
											<span>{formatTime(currentTime)}</span>
											<span className="opacity-40 px-1">/</span>
											<span className="opacity-70">{formatTime(duration)}</span>
										</div>
									</div>

									{/* Center Title Badge */}
									<div className="hidden md:flex items-center gap-1.5 truncate text-white/80 small">
										<Sparkles className="size-3 text-secondary shrink-0" />
										<span className="truncate max-w-64 font-medium">{modalTitle}</span>
									</div>

									{/* Right Controls: Volume Slider, Fullscreen */}
									<div className="flex items-center gap-2 sm:gap-3">
										{/* Volume Controls */}
										<div className="group/vol flex items-center gap-1.5">
											<button
												type="button"
												onClick={toggleMute}
												aria-label={isMuted ? "Unmute" : "Mute"}
												className="flex size-8 items-center justify-center rounded-lg hover:bg-white/15 transition-colors cursor-pointer text-white"
											>
												{isMuted || volume === 0 ? (
													<VolumeX className="size-4.5 text-secondary" />
												) : (
													<Volume2 className="size-4.5" />
												)}
											</button>
											<input
												type="range"
												min={0}
												max={1}
												step={0.05}
												value={isMuted ? 0 : volume}
												onChange={handleVolumeChange}
												aria-label="Volume slider"
												className="hidden sm:block h-1.5 w-16 cursor-pointer accent-white bg-white/20 rounded-full outline-none"
											/>
										</div>

										{/* Fullscreen Button */}
										<button
											type="button"
											onClick={toggleFullscreen}
											aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
											className="flex size-8 items-center justify-center rounded-lg hover:bg-white/15 transition-colors cursor-pointer text-white/80 hover:text-white"
										>
											{isFullscreen ? (
												<Minimize className="size-4.5" />
											) : (
												<Maximize className="size-4.5" />
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>,
				document.body,
			)}
		</>
	);
}

export default HeroVideoCard;
