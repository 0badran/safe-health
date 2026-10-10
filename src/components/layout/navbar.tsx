"use client";

import * as React from "react";
import Link from "next/link";
import {
	GlobeIcon,
	SearchIcon,
	MenuIcon,
	ChevronDownIcon,
	SparklesIcon,
	StethoscopeIcon,
	StarIcon,
	HeartPulseIcon,
	SmileIcon,
	ShieldCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
	const [selectedLang, setSelectedLang] = React.useState("العربية");

	const languages = [
		{ code: "ar", label: "العربية" },
		{ code: "en", label: "English" },
		{ code: "fr", label: "Français" },
	];

	const popularTreatments = [
		{
			title: "زراعة الشعر",
			subtitle: "تقنيات متقدمة FUE & DHI",
			icon: SparklesIcon,
			href: "#treatments",
		},
		{
			title: "طب وتجميل الأسنان",
			subtitle: "ابتسامة هوليوود وزراعة فورية",
			icon: SmileIcon,
			href: "#treatments",
		},
		{
			title: "جراحات التجميل",
			subtitle: "نحت القوام وتجميل الوجه",
			icon: StethoscopeIcon,
			href: "#treatments",
		},
		{
			title: "جراحات السمنة المتقدمة",
			subtitle: "تكميم وتحويل مسار بالمنظار",
			icon: HeartPulseIcon,
			href: "#treatments",
		},
		{
			title: "علاج العقم وأطفال الأنابيب",
			subtitle: "أعلى نسب نجاح معتمدة",
			icon: ShieldCheckIcon,
			href: "#treatments",
		},
	];

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80">
			<div className="container flex h-18 max-w-7xl items-center justify-between">
				{/* Brand Logo */}
				<Link
					href="/"
					className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-90 select-none"
				>
					<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
						<HeartPulseIcon className="size-6" />
					</div>
					<div className="flex flex-col shrink-0 text-start leading-tight">
						<span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-primary whitespace-nowrap">
							Safe Health
						</span>
						<span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
							الرعاية الطبية المعتمدة
						</span>
					</div>
				</Link>

				{/* Desktop Navigation Links */}
				<nav className="hidden lg:flex items-center">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/">الرئيسية</Link>
					</Button>

					<Button variant="ghost" size="sm" asChild>
						<Link href="/how-it-works">كيف نعمل</Link>
					</Button>

					<Button variant="ghost" size="sm" asChild>
						<Link href="#reviews">
							<span>آراء المرضى</span>
							<Badge variant="secondary">
								<StarIcon className="size-3 fill-amber-400 text-amber-400" />
								4.8
							</Badge>
						</Link>
					</Button>

					{/* Popular Treatments Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm">
								<span>التخصصات الطبية</span>
								<ChevronDownIcon className="size-4 opacity-60" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-68 p-1.5">
							{popularTreatments.map((treatment) => {
								const IconComponent = treatment.icon;
								return (
									<DropdownMenuItem key={treatment.title} asChild>
										<Link
											href={treatment.href}
											className="flex items-start gap-3 w-full p-2"
										>
											<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground mt-0.5">
												<IconComponent className="size-4" />
											</div>
											<div className="flex flex-col text-start">
												<span className="text-xs font-semibold">
													{treatment.title}
												</span>
												<span className="text-[11px] text-muted-foreground">
													{treatment.subtitle}
												</span>
											</div>
										</Link>
									</DropdownMenuItem>
								);
							})}
						</DropdownMenuContent>
					</DropdownMenu>

					<Button variant="ghost" size="sm" asChild>
						<Link href="/articles">المقالات</Link>
					</Button>

					<Button variant="ghost" size="sm" asChild>
						<Link href="/about">من نحن</Link>
					</Button>

					<Button variant="ghost" size="sm" asChild>
						<Link href="/contact">اتصل بنا</Link>
					</Button>
				</nav>

				{/* Right Action Controls: Language, Search, CTA */}
				<div className="hidden lg:flex items-center gap-3">
					{/* Static Language Switcher */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<GlobeIcon className="size-4 text-muted-foreground" />
								<span>{selectedLang}</span>
								<ChevronDownIcon className="size-3.5 opacity-60" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-32">
							{languages.map((lang) => (
								<DropdownMenuItem
									key={lang.code}
									onClick={() => setSelectedLang(lang.label)}
									className="justify-between"
								>
									<span>{lang.label}</span>
									{selectedLang === lang.label && (
										<Badge variant="secondary">نشط</Badge>
									)}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Search Trigger Button */}
					<Button
						variant="ghost"
						size="icon"
						aria-label="البحث عن علاج أو طبيب"
					>
						<SearchIcon className="size-5" />
					</Button>

					{/* Theme Mode Toggle */}
					<ModeToggle />

					{/* Primary CTA */}
					<Button variant="default" size="sm">
						حجز استشارة مجانية
					</Button>
				</div>

				{/* Mobile Navigation Drawer (Sheet) */}
				<div className="flex lg:hidden items-center gap-2">
					{/* Mobile Language Switcher */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="xs">
								<GlobeIcon className="size-3.5" />
								<span>{selectedLang}</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-28">
							{languages.map((lang) => (
								<DropdownMenuItem
									key={lang.code}
									onClick={() => setSelectedLang(lang.label)}
								>
									{lang.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Mobile Theme Toggle */}
					<ModeToggle />

					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								aria-label="القائمة الرئيسية"
							>
								<MenuIcon className="size-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-80 p-6">
							<SheetHeader className="text-start pb-4 border-b">
								<SheetTitle className="flex items-center gap-2 text-primary font-heading font-bold text-lg">
									<div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
										<HeartPulseIcon className="size-5" />
									</div>
									<span>Safe Health</span>
								</SheetTitle>
							</SheetHeader>

							<div className="flex flex-col gap-3 py-6">
								<Link
									href="/"
									className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium hover:bg-muted"
								>
									<span>الرئيسية</span>
								</Link>

								<Link
									href="/how-it-works"
									className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium hover:bg-muted"
								>
									<span>كيف نعمل</span>
								</Link>

								<Link
									href="#reviews"
									className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium hover:bg-muted"
								>
									<span>آراء المرضى</span>
									<Badge variant="secondary" className="text-xs">
										4.8 ★
									</Badge>
								</Link>

								<Link
									href="#treatments"
									className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium hover:bg-muted"
								>
									<span>التخصصات الطبية</span>
								</Link>

								<Link
									href="/articles"
									className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium hover:bg-muted"
								>
									<span>المقالات</span>
								</Link>

								<Link
									href="/about"
									className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium hover:bg-muted"
								>
									<span>من نحن</span>
								</Link>

								<Link
									href="/contact"
									className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium hover:bg-muted"
								>
									<span>اتصل بنا</span>
								</Link>
							</div>

							<div className="mt-auto pt-6 border-t flex flex-col gap-3">
								<Button variant="default" className="w-full">
									حجز استشارة مجانية
								</Button>
								<Button variant="outline" className="w-full">
									دخول الأطباء والعيادات
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
