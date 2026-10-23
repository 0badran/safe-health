import { z } from "zod";

export const consultationFormSchema = z.object({
	name: z.string().trim().min(1, "Please enter your full name."),
	email: z
		.email("Enter a valid email address.")
		.min(1, "Please enter your email address."),
	phone: z.string().optional(),
	country: z.string().optional(),
	message: z.string().optional(),
	agree: z.boolean().refine((val) => val === true, {
		message: "Please agree to the terms to proceed.",
	}),
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
