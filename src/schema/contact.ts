import { z } from "zod";
import { useTranslation } from "@/lib/language-context";

export function useContactSchema() {
	const { t } = useTranslation();

	return z.object({
		name: z.string().trim().min(1, t("contact.form.validation.nameRequired")),
		email: z
			.string()
			.trim()
			.min(1, t("contact.form.validation.emailRequired"))
			.email(t("contact.form.validation.emailInvalid")),
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
		message: z
			.string()
			.trim()
			.min(1, t("contact.form.validation.messageRequired")),
	});
}

export type ContactFormValues = z.infer<ReturnType<typeof useContactSchema>>;

