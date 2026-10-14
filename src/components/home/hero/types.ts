import type { ConsultationFormValues } from "./form/schema";

export type { ConsultationFormValues };

export interface HeroSectionProps {
	onSubmit?: (data: ConsultationFormValues) => void | Promise<void>;
	className?: string;
}
