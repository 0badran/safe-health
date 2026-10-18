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

export const TREATMENTS = [
	"Plastic Surgery",
	"Hair Transplant",
	"Dental Treatments",
	"Rhinoplasty Surgery",
	"Aesthetic Medicine",
	"Bariatric Surgery",
	"Orthopedics & Spine",
	"Eye Care & LASIK",
	"Other Treatment",
] as const;

export const DOCTORS = [
	"Any Available Specialist",
	"Dr. Ananya Mehta - Dermatology & Aesthetics",
	"Dr. Marcus Vance - Plastic Surgery",
	"Dr. Elena Rostova - Hair Restoration",
	"Dr. Sarah Jenkins - Aesthetic Dentistry",
	"Dr. Ahmed Hassan - Rhinoplasty Specialist",
] as const;

export const DEFAULT_FORM_VALUES: ConsultationFormValues = {
	name: "",
	email: "",
	phone: "",
	country: "",
	treatment: "",
	doctor: "",
	message: "",
	agree: false,
};

export const INPUT_BASE_CLASSES =
	"w-full bg-transparent rounded-xl px-3.5 text-base text-foreground outline-none transition-all duration-200 " +
	"border border-input placeholder:text-muted-foreground " +
	"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 font-sans disabled:opacity-50 disabled:cursor-not-allowed";
