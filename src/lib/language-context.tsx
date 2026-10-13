"use client";

import * as React from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
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

function LanguageContextProvider({
	children,
	initialLanguage = "en",
}: {
	children: React.ReactNode;
	initialLanguage?: LanguageCode;
}) {
	const [language, setLanguageState] =
		React.useState<LanguageCode>(initialLanguage);

	const direction: DirectionType = language === "ar" ? "rtl" : "ltr";
	const isRtl = direction === "rtl";

	React.useEffect(() => {
		const saved = localStorage.getItem("preferred-language") as LanguageCode;
		if (saved && (saved === "ar" || saved === "en" || saved === "fr")) {
			setLanguageState(saved);
			i18n.changeLanguage(saved);
		}
	}, []);

	React.useEffect(() => {
		if (typeof document !== "undefined") {
			document.documentElement.dir = direction;
			document.documentElement.lang = language;
			if (direction === "rtl") {
				document.documentElement.classList.add("rtl");
				document.documentElement.classList.remove("ltr");
			} else {
				document.documentElement.classList.add("ltr");
				document.documentElement.classList.remove("rtl");
			}
		}
	}, [direction, language]);

	const setLanguage = React.useCallback((lang: LanguageCode) => {
		setLanguageState(lang);
		i18n.changeLanguage(lang);
		try {
			localStorage.setItem("preferred-language", lang);
		} catch {
			// ignore storage errors
		}
	}, []);

	const value = React.useMemo(
		() => ({
			language,
			direction,
			isRtl,
			setLanguage,
			availableLanguages: AVAILABLE_LANGUAGES,
		}),
		[language, direction, isRtl, setLanguage],
	);

	return (
		<LanguageContext.Provider value={value}>
			<DirectionProvider dir={direction} direction={direction}>
				{children}
			</DirectionProvider>
		</LanguageContext.Provider>
	);
}

export function LanguageProvider({
	children,
	initialLanguage = "en",
}: {
	children: React.ReactNode;
	initialLanguage?: LanguageCode;
}) {
	return (
		<I18nextProvider i18n={i18n}>
			<LanguageContextProvider initialLanguage={initialLanguage}>
				{children}
			</LanguageContextProvider>
		</I18nextProvider>
	);
}

export function useLanguage() {
	const context = React.useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}

export { useTranslation };
