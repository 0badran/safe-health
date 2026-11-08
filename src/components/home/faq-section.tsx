"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslation } from "@/lib/language-context";
import Image from "next/image";

import type { HomeFaqSection } from "@/types/home";

export interface FaqItem {
	number: string;
	question: string;
	answer: string;
}

export interface FaqSectionProps {
	className?: string;
	data?: HomeFaqSection;
	faqs?: FaqItem[];
}

export function FaqSection({ data }: FaqSectionProps = {}) {
	const { t } = useTranslation();
	const activeFaqs: FaqItem[] = data?.faq_card ?? [];
	const illustrationSrc = data?.section_image || "/images/faq-illustration.png";

	if (activeFaqs.length === 0) {
		return null; // Don't render the section if there are no FAQs
	}

	return (
		<section
			id="faq"
			className="-mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
		>
			{/* Left Column: Shadcn Accordion in cards variant */}
			<div className="lg:col-span-7 order-2 lg:order-1">
				<Accordion type="single" collapsible defaultValue="01" variant="cards">
					{activeFaqs?.slice(0,4)?.map((faq) => (
						<AccordionItem
							key={faq.number}
							value={faq.number}
							variant="card"
						>
							<AccordionTrigger variant="card" iconVariant="plus">
								<span className="flex items-center gap-4 sm:gap-6">
									<span className="font-heading h3 text-primary shrink-0 w-8 sm:w-10">
										{faq.number}
									</span>
									<span className="text-primary h5 leading-snug">
										{faq.question}
									</span>
								</span>
							</AccordionTrigger>
							<AccordionContent variant="card">
								<div className="ps-12 sm:ps-16 h6">{faq.answer}</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>

				<div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
					<Link href="/faqs">
						<Button variant="outline" withArrow>
							{t("faqs.viewMore")}
						</Button>
					</Link>
				</div>
			</div>

			{/* Right Column: FAQ Illustration */}
			<div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
				<div className="relative w-full aspect-4/3 max-w-md lg:max-w-none">
					<Image
						src={illustrationSrc}
						alt="Frequently Asked Questions"
						fill
						sizes="(max-width: 1024px) 100vw, 40vw"
						className="object-contain"
					/>
				</div>
			</div>
		</section>
	);
}

export default FaqSection;
