"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { DirectionProvider } from "@/components/ui/direction";

export type LanguageCode = "ar" | "en" | "fr";
export type DirectionType = "rtl" | "ltr";

export interface LanguageContextType {
	language: LanguageCode;
	direction: DirectionType;
	isRtl: boolean;
	setLanguage: (lang: LanguageCode) => void;
	availableLanguages: { code: LanguageCode; label: string; flag: string }[];
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
	undefined,
);

const AVAILABLE_LANGUAGES: {
	code: LanguageCode;
	label: string;
	flag: string;
}[] = [
	{ code: "en", label: "English", flag: "🇬🇧" },
	{ code: "ar", label: "العربية", flag: "🇸🇦" },
	{ code: "fr", label: "Français", flag: "🇫🇷" },
];

export function LanguageProvider({
	children,
}: {
	children: React.ReactNode;
	initialLanguage?: LanguageCode;
}) {
	const currentLocale = (useLocale() || "en") as LanguageCode;
	const router = useRouter();
	const pathname = usePathname();

	const direction: DirectionType = currentLocale === "ar" ? "rtl" : "ltr";
	const isRtl = direction === "rtl";

	React.useEffect(() => {
		if (typeof document !== "undefined") {
			document.documentElement.dir = direction;
			document.documentElement.lang = currentLocale;
			if (direction === "rtl") {
				document.documentElement.classList.add("rtl");
				document.documentElement.classList.remove("ltr");
			} else {
				document.documentElement.classList.add("ltr");
				document.documentElement.classList.remove("rtl");
			}
		}
	}, [direction, currentLocale]);

	const setLanguage = React.useCallback(
		(lang: LanguageCode) => {
			try {
				localStorage.setItem("preferred-language", lang);
			} catch {
				// ignore storage errors
			}
			const search = typeof window !== "undefined" ? window.location.search : "";
			router.replace(`${pathname}${search}`, { locale: lang });
		},
		[pathname, router],
	);

	const value = React.useMemo(
		() => ({
			language: currentLocale,
			direction,
			isRtl,
			setLanguage,
			availableLanguages: AVAILABLE_LANGUAGES,
		}),
		[currentLocale, direction, isRtl, setLanguage],
	);

	return (
		<LanguageContext.Provider value={value}>
			<DirectionProvider dir={direction} direction={direction}>
				{children}
			</DirectionProvider>
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = React.useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}

export function useTranslation(ns?: string) {
	const t = useTranslations(ns as any);
	return { t };
}

export { useTranslations };
