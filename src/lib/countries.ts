import countriesData from "@/data/countries.json";

export interface Country {
	code: string;
	name_en: string;
	name_ar: string;
	name_fr: string;
}

export const COUNTRIES: Country[] = countriesData as Country[];

const countryMapByCode = new Map<string, Country>(
	COUNTRIES.map((c) => [c.code.toUpperCase(), c]),
);

/**
 * Normalizes text for insensitive searching, handling Arabic letter variations.
 */
function normalizeText(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[أإآ]/g, "ا")
		.replace(/ة/g, "ه")
		.replace(/ى/g, "ي")
		.replace(/[\u064B-\u065F]/g, ""); // strip Arabic diacritics / harakat
}

/**
 * Returns a country by its 2-letter ISO code.
 */
export function getCountryByCode(code?: string): Country | undefined {
	if (!code) return undefined;
	return countryMapByCode.get(code.toUpperCase());
}

/**
 * Returns the localized country name based on the current locale.
 */
export function getLocalizedCountryName(
	country?: Country,
	locale?: string,
): string {
	if (!country) return "";
	if (locale === "ar") return country.name_ar;
	if (locale === "fr") return country.name_fr;
	return country.name_en;
}

/**
 * Formats country into a multi-language comma-separated string for API submission.
 * Example: "Egypt, مصر, Égypte"
 */
export function formatCountryMultiLang(country: Country): string {
	return `${country.name_en}, ${country.name_ar}, ${country.name_fr}`;
}

/**
 * Filters and sorts countries based on search query and current locale.
 */
export function searchCountries(
	query: string,
	locale: string = "en",
): Country[] {
	const normalizedQuery = normalizeText(query);

	const filtered = COUNTRIES.filter((country) => {
		if (!normalizedQuery) return true;
		const arNorm = normalizeText(country.name_ar);
		const enNorm = normalizeText(country.name_en);
		const frNorm = normalizeText(country.name_fr);
		const codeNorm = country.code.toLowerCase();

		return (
			arNorm.includes(normalizedQuery) ||
			enNorm.includes(normalizedQuery) ||
			frNorm.includes(normalizedQuery) ||
			codeNorm.includes(normalizedQuery)
		);
	});

	// Sort alphabetically by the localized name in current locale
	return filtered.sort((a, b) => {
		const nameA = getLocalizedCountryName(a, locale);
		const nameB = getLocalizedCountryName(b, locale);
		return nameA.localeCompare(nameB, locale);
	});
}
