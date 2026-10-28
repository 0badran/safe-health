import { z } from "zod";
import { useTranslation } from "@/lib/language-context";

export function useConsultationSchema() {
	const { t } = useTranslation();

	return z.object({
		name: z.string().trim().min(1, t("contact.form.validation.nameRequired")),
		email: z
			.string()
			.trim()
			.min(1, t("contact.form.validation.emailRequired"))
			.email(t("contact.form.validation.emailInvalid")),
		phone: z.string().trim().min(1, t("contact.form.validation.phoneRequired")),
		country: z.string().trim().min(1, t("contact.form.validation.countryRequired")),
		message: z.string().trim().min(1, t("contact.form.validation.messageRequired")),
		agree: z.boolean().refine((val) => val === true, {
			message: t("consultation.agreeRequired"),
		}),
	});
}

export const consultationFormSchema = z.object({
	name: z.string().trim().min(1),
	email: z.string().trim().min(1).email(),
	phone: z.string().trim().min(1),
	country: z.string().trim().min(1),
	message: z.string().trim().min(1),
	agree: z.boolean().refine((val) => val === true),
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
