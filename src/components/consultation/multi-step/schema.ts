import { z } from "zod";
import { useTranslation } from "@/lib/language-context";

export function useMultiStepConsultationSchema() {
	const { t } = useTranslation();

	return z.object({
		// Step 1: Service & Doctor (key is service_id)
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
		doctor_id: z.union([z.number(), z.string()]).optional(),

		// Step 2: Patient Details
		name: z.string().trim().min(1, t("contact.form.validation.nameRequired")),
		email: z
			.union([
				z.email(t("contact.form.validation.emailInvalid")),
				z.literal(""),
			])
			.optional(),
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

		// Step 3: Details & Attachments
		message: z.string().optional(),
		privacy_policy_accepted: z.boolean().refine((val) => val === true, {
			message: t("consultation.agreeRequired"),
		}),
		images: z
			.array(z.custom<File>())
			.max(3, t("consultation.imagesMaxError"))
			.refine(
				(files) => files.every((f) => f.size <= 1024 * 1024),
				{
					message: t("consultation.imageSizeError"),
				},
			),
	});
}

export type MultiStepFormValues = z.infer<
	ReturnType<typeof useMultiStepConsultationSchema>
>;

export const DEFAULT_MULTI_STEP_VALUES: MultiStepFormValues = {
	service_id: "",
	treatment: "",
	doctor_id: undefined,
	name: "",
	email: "",
	phone: "",
	country: "",
	message: "",
	privacy_policy_accepted: false,
	images: [],
};
