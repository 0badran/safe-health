import Link from "next/link";
import {
	PhoneCallIcon,
	MessageCircleIcon,
	MailIcon,
	MapPinIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ContactCards() {
	const contactItems = [
		{
			title: "هاتف الاستشارات",
			englishTitle: "Phone",
			value: "+966 50 123 4567",
			subValue: "متاح 24/7 لخدمتكم",
			href: "tel:+966501234567",
			icon: PhoneCallIcon,
			colorClass: "bg-primary/10 text-primary",
		},
		{
			title: "واتساب الرعاية",
			englishTitle: "WhatsApp",
			value: "+966 55 987 6543",
			subValue: "محادثة فورية مع المستشار",
			href: "https://wa.me/966559876543",
			icon: MessageCircleIcon,
			colorClass: "bg-primary/10 text-primary",
		},
		{
			title: "البريد الإلكتروني",
			englishTitle: "Email",
			value: "care@safehealth.com",
			subValue: "الرد خلال ساعتين كحد أقصى",
			href: "mailto:care@safehealth.com",
			icon: MailIcon,
			colorClass: "bg-secondary text-secondary-foreground",
		},
		{
			title: "المقر الرئيسي",
			englishTitle: "Our Clinic HQ",
			value: "طريق الملك فهد، الرياض",
			subValue: "برج الرعاية، الطابق 14",
			href: "https://maps.google.com",
			icon: MapPinIcon,
			colorClass: "bg-primary/10 text-primary",
		},
	];

	return (
		<div className="flex flex-col gap-6">
			{/* 4 Cards in 2x2 Grid matching template */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{contactItems.map((item) => {
					const IconComponent = item.icon;
					return (
						<Card
							key={item.title}
							className="border bg-card/70 backdrop-blur-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group py-0"
						>
							<CardContent className="p-6 flex flex-col items-center text-center space-y-3">
								<div
									className={`flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${item.colorClass}`}
								>
									<IconComponent className="size-6" />
								</div>

								<div className="space-y-1 w-full">
									<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
										{item.title}
									</span>
									<Link
										href={item.href}
										dir="ltr"
										className="block font-heading text-sm sm:text-base font-bold text-foreground transition-colors hover:text-primary truncate"
									>
										{item.value}
									</Link>
									<span className="block text-[11px] text-muted-foreground">
										{item.subValue}
									</span>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Interactive Location Map matching template */}
			<div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl border bg-card shadow-md">
				<iframe
					title="موقع المركز الطبي Safe Health"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115982.00000000001!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d48939b%3A0x6fb96f6b39da0178!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
					className="size-full border-0 filter contrast-95 grayscale-20 dark:grayscale-40"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				/>
				{/* Top Map Location Badge */}
				<div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
					<div className="flex items-center gap-2 rounded-xl bg-background/90 px-3 py-1.5 shadow-md backdrop-blur-md border text-xs font-semibold text-foreground">
						<MapPinIcon className="size-3.5 text-primary" />
						<span>الرياض - طريق الملك فهد</span>
					</div>
				</div>
			</div>
		</div>
	);
}
