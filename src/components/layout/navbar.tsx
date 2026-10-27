"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage, useTranslation } from "@/lib/language-context";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { ConsultationDrawer } from "@/components/consultation/consultation-drawer";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { cn } from "@/lib/utils";
import useSettings from "@/hooks/use-settings";

function subscribe(callback: () => void) {
	window.addEventListener("scroll", callback, { passive: true });
	window.addEventListener("hashchange", callback);
	window.addEventListener("popstate", callback);
	return () => {
		window.removeEventListener("scroll", callback);
		window.removeEventListener("hashchange", callback);
		window.removeEventListener("popstate", callback);
	};
}

function getScrollSnapshot() {
	return window.scrollY > 20;
}

function getScrollServerSnapshot() {
	return false;
}

function getHashSnapshot() {
	return typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
}

function getHashServerSnapshot() {
	return "";
}

export function Navbar() {
	const { settings } = useSettings();
	const { isRtl } = useLanguage();
	const { t } = useTranslation();
	const pathname = usePathname();
	const isScrolled = useSyncExternalStore(subscribe, getScrollSnapshot, getScrollServerSnapshot);
	const currentHash = useSyncExternalStore(subscribe, getHashSnapshot, getHashServerSnapshot);

	const isActive = (href: string) => {
		const currentPath = pathname?.replace(/\/$/, "") || "/";

		if (href.includes("#")) {
			const [path, hash] = href.split("#");
			const targetPath = path.replace(/\/$/, "") || "/";
			if (currentPath !== targetPath) return false;
			return currentHash === hash;
		}

		const target = href.replace(/\/$/, "") || "/";
		if (target === "/") {
			if (currentPath === "/" && currentHash) {
				return false;
			}
			return currentPath === "/";
		}
		return currentPath === target || currentPath.startsWith(`${target}/`);
	};

	const navLinks = [
		{ href: "/", label: t("navbar.home") },
		{ href: "/about", label: t("navbar.aboutUs") },
		{ href: "/treatments", label: t("navbar.treatments") },
		{ href: "/doctors", label: t("navbar.ourDoctors") },
		{ href: "/#patient-journey", label: t("navbar.patientJourney") },
		{ href: "/before-after", label: t("navbar.beforeAfter") },
		{ href: "/contact", label: t("navbar.contact") },
	];

	return (
		<motion.header
			initial={false}
			animate={{
				maxWidth: isScrolled ? "1100px" : "1360px",
				width: isScrolled ? "92%" : "100%",
				top: isScrolled ? "0.75rem" : "1.25rem",
			}}
			transition={{
				duration: 0.4,
			}}
			className={cn(
				"fixed inset-x-0 z-50 mx-auto ",
				isScrolled ? "px-2 sm:px-4" : "px-4 md:px-12 2xl:px-10",
			)}
		>
			<div
				className={cn(
					"flex bg-primary rounded-full border border-white/10 backdrop-blur-md items-center justify-between transition-all duration-300",
					isScrolled
						? "shadow-2xl shadow-primary/80 border-white/20 bg-primary/95 py-0.5"
						: " bg-primary py-1",
				)}
			>
				{/* Brand Logo from settings or fallback */}
				<Link
					href="/"
					className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-90 select-none"
				>
					<div
						className={cn(
							"relative flex shrink-0 items-center justify-center rounded-xl overflow-hidden p-1 mx-2 transition-all duration-300",
							isScrolled ? "size-10 sm:size-11" : "size-11 sm:size-12",
						)}
					>
						<Image
							src={settings?.logo || "/images/logo.png"}
							alt={settings?.brand_name || ""}
							fill
							sizes="48px"
							className="object-contain p-1 size-full"
							priority
						/>
					</div>
				</Link>

				{/* Desktop Navigation Links */}
				<nav className="hidden xl:flex whitespace-nowrap items-center gap-1 small font-medium">
					{navLinks.map((link) => {
						const active = isActive(link.href);
						return (
							<Link
								key={link.href + link.label}
								href={link.href}
								aria-current={active ? "page" : undefined}
								className={cn(
									"relative rounded-full transition-all duration-200 select-none",
									isScrolled ? "px-2.5 py-1 text-xs" : "px-3 py-1.5",
									active
										? "text-white font-semibold"
										: "text-white/85 hover:bg-white/10 hover:text-white",
								)}
							>
								{active && (
									<motion.span
										layoutId="activeNavPill"
										className="absolute inset-0 rounded-full bg-white/20 border border-white/15 shadow-xs"
										transition={{
											type: "spring",
											stiffness: 380,
											damping: 30,
										}}
									/>
								)}
								<span className="relative z-10">{link.label}</span>
							</Link>
						);
					})}
				</nav>

				{/* Right Controls: CTA & Language Switcher & Theme */}
				<div className="hidden xl:flex items-center gap-2.5">
					{/* Language Switcher Dropdown */}
					<LanguageSwitcher />
					{/* Primary Call to Action Button */}
					<ConsultationDrawer
						variant="secondary"
						className="m-2"
					/>
				</div>

				{/* Mobile Navigation Drawer Trigger */}
				<div className="flex xl:hidden items-center gap-2 px-2">
					{/* Language Switcher on Mobile Header */}
					<LanguageSwitcher />
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="text-white hover:bg-white/10"
								aria-label="Toggle menu"
							>
								<MenuIcon className="size-6" />
							</Button>
						</SheetTrigger>
						<SheetContent
							side={isRtl ? "left" : "right"}
							className="w-80 bg-primary text-white border-white/15 p-6"
						>
							<SheetHeader className="text-start pb-4 border-b border-white/10">
								<SheetTitle className="flex items-center gap-2.5 text-white">
									<div className="relative size-9 overflow-hidden rounded-lg bg-white/10 p-0.5 ring-1 ring-white/20">
										<Image
											src={settings?.logo || "/images/logo.png"}
											alt={settings?.brand_name || ""}
											fill
											sizes="36px"
											className="object-contain"
										/>
									</div>
									<span className="font-heading font-bold text-lg text-white">
										{settings?.brand_name || "SafeHealth.me"}
									</span>
								</SheetTitle>
							</SheetHeader>

							<div className="flex flex-col gap-2 py-6">
								{navLinks.map((link) => {
									const active = isActive(link.href);
									return (
										<SheetClose asChild key={link.href + link.label}>
											<Link
												href={link.href}
												aria-current={active ? "page" : undefined}
												className={cn(
													"rounded-xl px-3 py-2.5 small font-medium transition-colors flex items-center justify-between",
													active
														? "bg-white/20 text-white font-semibold border border-white/15 shadow-xs"
														: "text-white/90 hover:bg-white/10 hover:text-white",
												)}
											>
												<span>{link.label}</span>
												{active && (
													<span className="size-1.5 rounded-full bg-secondary" />
												)}
											</Link>
										</SheetClose>
									);
								})}
							</div>

							<div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
								<ConsultationDrawer
									variant="nav-white"
									className="w-full text-center"
								/>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</motion.header>
	);
}
