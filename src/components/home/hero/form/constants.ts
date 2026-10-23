import type { ConsultationFormValues } from "./schema";

export const COUNTRIES = [
	"Turkey",
	"Egypt",
	"Saudi Arabia",
	"United Arab Emirates",
	"United Kingdom",
	"Germany",
	"United States",
	"Canada",
	"France",
	"Kuwait",
	"Qatar",
	"Other",
] as const;

export const DEFAULT_FORM_VALUES: ConsultationFormValues = {
	name: "",
	email: "",
	phone: "",
	country: "",
	message: "",
	agree: false,
};

export const INPUT_BASE_CLASSES =
	"w-full bg-transparent rounded-xl px-3.5 text-base text-foreground outline-none transition-all duration-200 " +
	"border border-input placeholder:text-muted-foreground " +
	"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 font-sans disabled:opacity-50 disabled:cursor-not-allowed";
