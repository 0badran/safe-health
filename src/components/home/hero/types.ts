import type { ConsultationFormValues } from "./form/schema";
import type { HomeHeroSection } from "@/types/home";

export type { ConsultationFormValues };

export interface HeroSectionProps {
	data?: HomeHeroSection;
	onSubmit?: (data: ConsultationFormValues) => void | Promise<void>;
	className?: string;
}
