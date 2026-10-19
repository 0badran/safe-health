import Image from "next/image";
import Link from "next/link";
import InteractiveGridBackground from "@/components/shared/interactive-grid-background";
import { TransformationSection } from "../home/transformation-section";

export function Footer() {
	const exploreLinks = [
		{ label: "Treatments", href: "/#treatments" },
		{ label: "Our approach", href: "/about" },
		{ label: "Our team", href: "/about#team" },
		{ label: "Before & After", href: "/#before-after" },
		{ label: "Journal", href: "/articles" },
	];

	const yourVisitLinks = [
		{ label: "Book consultation", href: "/contact" },
		{ label: "Your first consultation", href: "/how-it-works" },
		{ label: "Aftercare information", href: "/how-it-works#aftercare" },
		{ label: "Contact our team", href: "/contact" },
	];

	const informationLinks = [
		{ label: "Privacy notice", href: "/privacy" },
		{ label: "Cookie preferences", href: "#cookie-preferences" },
		{ label: "Accessibility", href: "#accessibility" },
		{ label: "Terms of use", href: "/terms" },
	];

	return (
		<footer >
			<div className="container mt-10 lg:mt-16">

				<TransformationSection />
			</div>
			<div className="relative bg-primary text-primary-foreground overflow-hidden pt-16  select-none pb-32 ">


				<div className="container relative z-10 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
					{/* Top Grid: Logo & Tagline + 3 Link Columns */}
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
						{/* Brand Column */}
						<div className="lg:col-span-4 flex flex-col items-start">
							<Link
								href="/"
								className="inline-block transition-opacity hover:opacity-90"
							>
								<div className="relative size-24 sm:size-28 lg:size-32">
									<Image
										src="/images/footer-logo.png"
										alt="safehealthme"
										fill
										sizes="(min-width: 640px) 112px, 96px"
										className="object-contain"
										priority
									/>
								</div>
							</Link>

							<p className="mt-4 max-w-xs leading-relaxed">
								Thoughtful aesthetic care. Clear information, personal attention
								and clinically guided decisions.
							</p>
						</div>

						{/* Navigation Links Columns */}
						<div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 small">
							{/* EXPLORE */}
							<div className="flex flex-col space-y-3.5">
								<h3 className="text-border font-semibold uppercase tracking-wider">
									EXPLORE
								</h3>
								<ul className="space-y-2.5">
									{exploreLinks.map((link) => (
										<li key={link.label}>
											<Link
												href={link.href}
												className="transition-colors hover:text-secondary"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* YOUR VISIT */}
							<div className="flex flex-col space-y-3.5">
								<h3 className="text-border font-semibold uppercase tracking-wider">
									YOUR VISIT
								</h3>
								<ul className="space-y-2.5">
									{yourVisitLinks.map((link) => (
										<li key={link.label}>
											<Link
												href={link.href}
												className="transition-colors hover:text-secondary"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* INFORMATION */}
							<div className="flex flex-col space-y-3.5">
								<h3 className="text-border font-semibold uppercase tracking-wider">
									INFORMATION
								</h3>
								<ul className="space-y-2.5">
									{informationLinks.map((link) => (
										<li key={link.label}>
											<Link
												href={link.href}
												className="transition-colors hover:text-secondary"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Divider Line */}
					<div className="w-full border-t border-[#312262] my-6 sm:my-8" />

					{/* Copyright */}
					<div className="small">
						<p>© 2026 safehealthme.</p>
					</div>

				</div>
				{/* Large Watermark Wordmark */}
				<div className="absolute  bottom-0 flex w-full justify-center">
					<p className="font-heading italic flex-1 text-[#624DA8] text-[14vw] text-center whitespace-nowrap leading-30 tracking-[0%]">
						Safehealthme
					</p>
				</div>
			</div>
		</footer>
	);
}
