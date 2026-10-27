import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Cairo, Inter, Merienda } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { fetchData } from "@/lib/api";
import type { SettingsApiResponse } from "@/types/settings";

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

async function getSettings() {
	"use cache";
	try {
		const json = await fetchData<SettingsApiResponse>({
			route: "/settings",
		});
		return json?.data || null;
	} catch {
		return null;
	}
}

export async function generateMetadata(): Promise<Metadata> {
	"use cache";
	const settings = await getSettings();

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

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			dir="ltr"
			suppressHydrationWarning
			className={cn(
				"h-full antialiased font-sans rtl:font-arabic scroll-smooth",
				headingFont.variable,
				sansFont.variable,
				arabicFont.variable,
			)}
		>
			<body className="min-h-full flex flex-col h6 bg-background text-foreground">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
