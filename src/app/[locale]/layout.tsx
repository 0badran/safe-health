import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Cairo, Inter, Merienda } from "next/font/google";
import "../globals.css";
import Providers from "../providers";
import { fetchData } from "@/lib/api";
import type { SettingsApiResponse } from "@/types/settings";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const instant = false;

const headingFont = Merienda({
	subsets: ["latin"],
	variable: "--font-heading",
	display: "swap",
});

const sansFont = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

const arabicFont = Cairo({
	subsets: ["arabic"],
	variable: "--font-arabic",
	display: "swap",
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

async function getSettings(lang?: string) {
	"use cache";
	try {
		const json = await fetchData<SettingsApiResponse>({
			route: "/settings",
			lang,
		});
		return json?.data || null;
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	"use cache";
	const { locale } = await params;
	const settings = await getSettings(locale);

	return {
		title: settings?.brand_name || undefined,
		description: settings?.footer_description || undefined,
		icons: settings?.favicon
			? [
					{
						rel: "icon",
						url: settings.favicon,
					},
				]
			: undefined,
	};
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	const [messages, settings] = await Promise.all([
		getMessages(),
		getSettings(locale),
	]);
	const direction = locale === "ar" ? "rtl" : "ltr";

	return (
		<html
			lang={locale}
			dir={direction}
			suppressHydrationWarning
			className={cn(
				"h-full antialiased ltr:font-sans rtl:font-arabic scroll-smooth",
				headingFont.variable,
				sansFont.variable,
				arabicFont.variable,
			)}
		>
			<body className="min-h-full flex flex-col h6 bg-background text-foreground">
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Providers initialSettings={settings}>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
