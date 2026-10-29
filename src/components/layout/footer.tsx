"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import useSettings from "@/hooks/use-settings";
import { useTranslation } from "@/lib/language-context";
import {
	BootstrapWhatsappIcon,
	BootstrapFacebookIcon,
	BootstrapInstagramIcon,
} from "@/components/icons";

export function Footer() {
	const { settings } = useSettings();
	const { t } = useTranslation();

	const exploreLinks = [
		{ label: t("footer.treatments"), href: "/treatments" },
		{ label: t("footer.ourApproach"), href: "/about" },
		{ label: t("footer.ourTeam"), href: "/doctors" },
		{ label: t("footer.beforeAfter"), href: "/before-after" },
		{ label: t("footer.journal"), href: "/blogs" },
	];

	const yourVisitLinks = [
		{ label: t("footer.bookConsultation"), href: "/contact" },
		{ label: t("footer.contactTeam"), href: "/contact" },
	];

	const informationLinks = [
		{ label: t("footer.privacyNotice"), href: "/privacy" },
		{ label: t("footer.termsOfUse"), href: "/terms" },
	];

	return (
		<footer>
			<div className="relative bg-primary text-primary-foreground overflow-hidden pt-16 select-none pb-32">
				<div className="container relative z-10 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
					{/* Top Grid: Logo & Tagline + 3 Link Columns */}
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
						{/* Brand Column */}
						<div className="lg:col-span-4 flex flex-col items-start">
							{settings?.logo && (
								<Link
									href="/"
									className="inline-block transition-opacity hover:opacity-90"
								>
									<div className="relative size-24 sm:size-28 lg:size-32">
										<Image
											src={settings.logo}
											alt={settings.brand_name || ""}
											fill
											sizes="(min-width: 640px) 112px, 96px"
											className="object-contain"
										/>
									</div>
								</Link>
							)}

							{settings?.footer_description && (
								<p className="mt-4 max-w-xs leading-relaxed">
									{settings.footer_description}
								</p>
							)}

							{/* Contact Information (Render only what exists) */}
							{(settings?.phone || settings?.email || settings?.address) && (
								<div className="mt-4 space-y-1.5 small text-primary-foreground/80">
									{settings.phone && (
										<a
											href={`tel:${settings.phone.replace(/\s+/g, "")}`}
											className="block hover:text-secondary transition-colors"
											dir="ltr"
										>
											{settings.phone}
										</a>
									)}
									{settings.email && (
										<a
											href={`mailto:${settings.email}`}
											className="block hover:text-secondary transition-colors"
										>
											{settings.email}
										</a>
									)}
									{settings.address && (
										<p className="block">
											{settings.address}
										</p>
									)}
								</div>
							)}

							{/* Social Media Links (Render only what exists) */}
							{(settings?.facebook_url || settings?.instagram_url || settings?.whatsapp_url) && (
								<div className="mt-5 flex items-center gap-3">
									{settings.whatsapp_url && (
										<a
											href={settings.whatsapp_url}
											target="_blank"
											rel="noopener noreferrer"
											className="size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
											aria-label="WhatsApp"
										>
											<BootstrapWhatsappIcon className="size-4" />
										</a>
									)}
									{settings.facebook_url && (
										<a
											href={settings.facebook_url}
											target="_blank"
											rel="noopener noreferrer"
											className="size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
											aria-label="Facebook"
										>
											<BootstrapFacebookIcon className="size-4" />
										</a>
									)}
									{settings.instagram_url && (
										<a
											href={settings.instagram_url}
											target="_blank"
											rel="noopener noreferrer"
											className="size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
											aria-label="Instagram"
										>
											<BootstrapInstagramIcon className="size-4" />
										</a>
									)}
								</div>
							)}
						</div>

						{/* Navigation Links Columns */}
						<div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 small">
							{/* EXPLORE */}
							<div className="flex flex-col space-y-3.5">
								<h3 className="text-border font-semibold uppercase tracking-wider">
									{t("footer.explore")}
								</h3>
								<ul className="space-y-2.5">
									{exploreLinks.map((link) => (
										<li key={link.href}>
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
									{t("footer.yourVisit")}
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
									{t("footer.information")}
								</h3>
								<ul className="space-y-2.5">
									{informationLinks.map((link) => (
										<li key={link.href}>
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

					{/* Copyright (Render only what exists) */}
					{settings?.footer_copyright && (
						<div className="small">
							<p>{settings.footer_copyright}</p>
						</div>
					)}
				</div>

				{/* Large Watermark Wordmark (Render only if brand_name exists) */}
				{settings?.brand_name && (
					<div className="absolute bottom-0 flex w-full justify-center pointer-events-none">
						<p className="font-heading italic flex-1 text-[#624DA8] text-[14vw] text-center whitespace-nowrap leading-30 tracking-[0%]">
							{settings.brand_name}
						</p>
					</div>
				)}
			</div>
		</footer>
	);
}

export default Footer;
