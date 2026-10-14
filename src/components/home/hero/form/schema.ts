import { z } from "zod";

export const consultationFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Please enter your full name."),
	email: z
		.string()
		.trim()
		.min(1, "Please enter your email address.")
		.email("Enter a valid email address."),
	phone: z.string(),
	country: z.string(),
	message: z.string(),
	agree: z.boolean().refine((val) => val === true, {
		message: "Please agree to be contacted.",
	}),
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
