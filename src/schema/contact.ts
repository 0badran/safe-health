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
		phone: z.string().trim().min(1, t("contact.form.validation.phoneRequired")),
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

