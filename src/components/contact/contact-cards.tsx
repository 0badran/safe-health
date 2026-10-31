"use client";

import { Link } from "@/i18n/navigation";
import { PhoneCallIcon, MailIcon, MapPinIcon } from "lucide-react";
import { BootstrapWhatsappIcon } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/lib/language-context";
import useSettings from "@/hooks/use-settings";
import type { SettingsData } from "@/types/settings";

interface ContactCardsProps {
	settings?: SettingsData | null;
}

export function ContactCards({
	settings: propSettings,
}: ContactCardsProps = {}) {
	const { t } = useTranslation();
	const { settings: contextSettings, isLoading } = useSettings();
	const settings = propSettings ?? contextSettings;

	if (isLoading && !settings) {
		return null;
	}

	const contactItems: Array<{
		title: string;
		value: string;
		href?: string;
		icon: React.ComponentType<{ className?: string }>;
		colorClass: string;
	}> = [];

	if (settings?.phone) {
		contactItems.push({
			title: t("contact.cards.phone.title"),
			value: settings.phone,
			href: `tel:${settings.phone.replace(/\s+/g, "")}`,
			icon: PhoneCallIcon,
			colorClass: "bg-primary/10 text-primary",
		});
	}

	if (settings?.whatsapp_url) {
		contactItems.push({
			title: t("contact.cards.whatsapp.title"),
			value: settings.phone || settings.whatsapp_url,
			href: settings.whatsapp_url,
			icon: BootstrapWhatsappIcon,
			colorClass: "bg-primary/10 text-primary",
		});
	}

	if (settings?.email) {
		contactItems.push({
			title: t("contact.cards.email.title"),
			value: settings.email,
			href: `mailto:${settings.email}`,
			icon: MailIcon,
			colorClass: "bg-secondary/15 text-secondary",
		});
	}

	if (settings?.address) {
		contactItems.push({
			title: t("contact.cards.hq.title"),
			value: settings.address,
			href: settings.google_maps_url || undefined,
			icon: MapPinIcon,
			colorClass: "bg-primary/10 text-primary",
		});
	}

	if (contactItems.length === 0 && !settings?.google_maps_url) {
		return null;
	}

	return (
		<div className="flex flex-col gap-6">
			{/* Contact Cards Grid matching theme */}
			{contactItems.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{contactItems.map((item) => {
						const IconComponent = item.icon;
						return (
							<Link key={item.title} href={item.href || "#"} className="block">
								<Card className="transition-all duration-300 hover:-translate-y-0.5 group py-0">
									<CardContent className="p-6 flex flex-col items-center text-center space-y-3">
										<div
											className={`flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${item.colorClass}`}
										>
											<IconComponent className="size-6" />
										</div>

										<div className="space-y-1 w-full">
											<span className="block small font-semibold text-muted-foreground uppercase tracking-wider">
												{item.title}
											</span>
											<p
												dir="ltr"
												className="font-heading h6 font-bold text-foreground transition-colors hover:text-primary truncate"
											>
												{item.value}
											</p>
										</div>
									</CardContent>
								</Card>
							</Link>
						);
					})}
				</div>
			)}

			{/* Interactive Location Map (Rendered ONLY if google_maps_url exists in API) */}
			{settings?.google_maps_url && (
				<div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl border border-border bg-card">
					<iframe
						title={t("contact.map.title")}
						src={settings.google_maps_url}
						className="size-full border-0 filter contrast-95 opacity-90"
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
					{settings?.address && (
						<div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
							<div className="flex items-center gap-2 rounded-xl bg-background/90 px-3.5 py-2 backdrop-blur-md border border-border small font-semibold text-foreground shadow-xs">
								<MapPinIcon className="size-3.5 text-primary shrink-0" />
								<span>{settings.address}</span>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default ContactCards;
