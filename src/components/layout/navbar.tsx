"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage, useTranslation } from "@/lib/language-context";
import {
	MenuIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ConsultationDrawer } from "@/components/consultation/consultation-drawer";
import { LanguageSwitcher } from "../LanguageSwitcher";

export function Navbar() {
	const { isRtl } = useLanguage();
	const { t } = useTranslation();

	const navLinks = [
		{ href: "/", label: t("navbar.home") },
		{ href: "/about", label: t("navbar.aboutUs") },
		{ href: "/treatments", label: t("navbar.treatments") },
		{ href: "/doctors", label: t("navbar.ourDoctors") },
		{ href: "/how-it-works", label: t("navbar.patientJourney") },
		{ href: "/before-after", label: t("navbar.beforeAfter") },
		{ href: "/contact", label: t("navbar.contact") },
	];

	return (
		<header className="fixed top-5 inset-x-0 z-50 w-full   container  transition-colors">
			<div className="flex  bg-primary rounded-full   border border-white/10 backdrop-blur-md items-center justify-between ">
				{/* Brand Logo from user provided asset */}
				<Link
					href="/"
					className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-90 select-none"
				>
					<div className="relative flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl overflow-hidden p-1 mx-2">
						<Image
							src="/images/logo.png"
							alt="Safe Health Me"
							fill
							sizes="48px"
							className="object-contain p-1 size-full"
							priority
						/>
					</div>

				</Link>

				{/* Desktop Navigation Links */}
				<nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
					{navLinks.map((link) => (
						<Link
							key={link.href + link.label}
							href={link.href}
							className="rounded-full px-3 py-1.5 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
						>
							{link.label}
						</Link>
					))}
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
											src="/images/logo.png"
											alt="Safe Health Me"
											fill
											sizes="36px"
											className="object-contain"
										/>
									</div>
									<span className="font-heading font-bold text-lg text-white">
										SafeHealth<span className="text-[#159BA8]">.me</span>
									</span>
								</SheetTitle>
							</SheetHeader>

							<div className="flex flex-col gap-2 py-6">
								{navLinks.map((link) => (
									<Link
										key={link.href + link.label}
										href={link.href}
										className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
									>
										{link.label}
									</Link>
								))}
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
		</header>
	);
}
