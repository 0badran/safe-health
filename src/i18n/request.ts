import * as rootParams from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
	let currentLocale = locale;

	if (!currentLocale) {
		const paramValue = await rootParams.locale();
		if (hasLocale(routing.locales, paramValue)) {
			currentLocale = paramValue;
		} else {
			currentLocale = routing.defaultLocale;
		}
	}

	return {
		locale: currentLocale,
		messages: (await import(`@/locales/${currentLocale}.json`)).default,
	};
});
