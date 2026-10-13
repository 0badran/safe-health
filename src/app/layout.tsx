import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Cairo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const headingFont = Plus_Jakarta_Sans({
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
	subsets: ["arabic", "latin"],
	variable: "--font-arabic",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Safe Health | الرعاية الطبية وحلول إدارة العيادات",
	description:
		"منظومة متكاملة لربط المرضى بأفضل الأطباء المعتمدين وإدارة العيادات الطبية باحترافية.",
};

import { LanguageProvider } from "@/lib/language-context";

export default function RootLayout({
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
				"h-full antialiased font-sans rtl:font-arabic",
				headingFont.variable,
				sansFont.variable,
				arabicFont.variable,
			)}
		>
			<body className="min-h-full flex flex-col bg-white text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<LanguageProvider initialLanguage="en">
						<Navbar />
						<div className="flex-1">{children}</div>
						<Footer />
					</LanguageProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
