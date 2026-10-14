import type { ConsultationFormValues } from "./schema";

export const COUNTRIES = [
	"Turkey",
	"Egypt",
	"Saudi Arabia",
	"United Arab Emirates",
	"United Kingdom",
	"Germany",
	"United States",
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
	"w-full bg-white rounded-xl px-3.5 text-[14px] text-[#282331] outline-none transition-all duration-200 " +
	"shadow-[inset_0_0_0_1px_rgba(11,60,93,0.12)] placeholder:text-[#868588] " +
	"focus:shadow-[inset_0_0_0_2px_#392579] font-sans disabled:opacity-50 disabled:cursor-not-allowed";
