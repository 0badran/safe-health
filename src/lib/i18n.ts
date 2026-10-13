"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
import fr from "@/locales/fr.json";

export const defaultNS = "translation";
export const resources = {
	en: { translation: en },
	ar: { translation: ar },
	fr: { translation: fr },
} as const;

if (!i18n.isInitialized) {
	i18n.use(initReactI18next).init({
		resources,
		lng: "en",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
	});
}

export default i18n;
