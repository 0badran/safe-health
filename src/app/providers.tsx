"use client";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { LanguageProvider } from "@/lib/language-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LucideProvider } from "lucide-react";
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 1000 * 60 * 60,
		},
	},
});

export default function Providers({children}: {children: React.ReactNode}) {
	return (
				<QueryClientProvider client={queryClient}>
					<DirectionProvider dir="ltr" direction="ltr">
						<ThemeProvider
							attribute="class"
							defaultTheme="light"
							enableSystem={false}
							forcedTheme="light"
							disableTransitionOnChange
						>
							<LucideProvider strokeWidth={1.5}>
								<LanguageProvider initialLanguage="en">
									<Navbar />
									<div className="flex-1 min-h-screen">{children}</div>
									<Footer />
								</LanguageProvider>
							</LucideProvider>
						</ThemeProvider>
					</DirectionProvider>
				</QueryClientProvider>
	);
}
