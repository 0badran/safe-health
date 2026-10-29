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
const countryMapByNameEn = new Map<string, Country>(
	COUNTRIES.map((c) => [c.name_en.toLowerCase(), c]),
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
 * Returns a country by its 2-letter ISO code or English name.
 */
export function getCountryByCode(codeOrName?: string): Country | undefined {
	if (!codeOrName) return undefined;
	const trimmed = codeOrName.trim();
	return (
		countryMapByCode.get(trimmed.toUpperCase()) ||
		countryMapByNameEn.get(trimmed.toLowerCase())
	);
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
): Country[] {
	const normalizedQuery = normalizeText(query);

	const filtered = COUNTRIES.filter((country) => {
		if (!normalizedQuery) return true;
		const enNorm = normalizeText(country.name_en);
		const arNorm = normalizeText(country.name_ar);
		const frNorm = normalizeText(country.name_fr);
		const codeNorm = country.code.toLowerCase();

		return (
			enNorm.includes(normalizedQuery) ||
			arNorm.includes(normalizedQuery) ||
			frNorm.includes(normalizedQuery) ||
			codeNorm.includes(normalizedQuery)
		);
	});

	// Sort alphabetically by English name
	return filtered.sort((a, b) => a.name_en.localeCompare(b.name_en, "en"));
}

