import { z } from "zod";
import { useTranslation } from "@/lib/language-context";

export function useHeroConsultationSchema() {
	const { t } = useTranslation();

	return z.object({
		service_id: z
			.union([z.number(), z.string()])
			.refine(
				(val) =>
					val !== undefined &&
					val !== null &&
					String(val).trim().length > 0,
				{
					message: t("consultation.serviceRequired"),
				},
			),
		treatment: z.string().optional(),
		name: z.string().trim().min(1, t("contact.form.validation.nameRequired")),
		phone: z
			.string()
			.trim()
			.min(1, t("contact.form.validation.phoneRequired"))
			.regex(
				/^\+?[0-9\s\-()]{7,20}$/,
				t("contact.form.validation.phoneInvalid"),
			)
			.refine(
				(val) => {
					const digits = val.replace(/\D/g, "");
					return digits.length >= 7 && digits.length <= 15;
				},
				{
					message: t("contact.form.validation.phoneInvalid"),
				},
			),
		country: z
			.string()
			.trim()
			.min(1, t("contact.form.validation.countryRequired")),
	});
}

export type HeroConsultationFormValues = z.infer<
	ReturnType<typeof useHeroConsultationSchema>
>;

export const DEFAULT_HERO_CONSULTATION_VALUES: HeroConsultationFormValues = {
	service_id: "",
	treatment: "",
	name: "",
	phone: "",
	country: "",
};

