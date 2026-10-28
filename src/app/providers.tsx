"use client";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/language-context";
import { SettingsProvider } from "@/hooks/use-settings";
import type { SettingsData } from "@/types/settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LucideProvider } from "lucide-react";
import { Suspense } from "react";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 1000 * 60 * 60,
		},
	},
});

export default function Providers({
	children,
	initialSettings,
}: {
	children: React.ReactNode;
	initialSettings?: SettingsData | null;
}) {
	return (
		<QueryClientProvider client={queryClient}>
			<SettingsProvider initialSettings={initialSettings}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem={false}
					forcedTheme="light"
					disableTransitionOnChange
				>
					<LucideProvider strokeWidth={1.5}>
						<LanguageProvider>
							<Suspense fallback={null}>
								<Navbar />
							</Suspense>
							<div className="flex-1 min-h-screen">{children}</div>
							<Footer />
						</LanguageProvider>
					</LucideProvider>
				</ThemeProvider>
			</SettingsProvider>
		</QueryClientProvider>
	);
}
