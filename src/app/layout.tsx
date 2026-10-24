import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Cairo, Inter, Merienda } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

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

export const metadata: Metadata = {
	title: "Safe Health | الرعاية الطبية وحلول إدارة العيادات",
	description:
		"منظومة متكاملة لربط المرضى بأفضل الأطباء المعتمدين وإدارة العيادات الطبية باحترافية.",
};

// Create a client

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
