"use client";

import SectionHeader from "@/components/shared/section-header";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
	{
		id: "01",
		question: "What does the medical travel package include?",
		answer:
			"Depending on your package, it may include consultations, surgery, airport transfers, accommodation, and follow-up care.",
	},
	{
		id: "02",
		question: "How do you select and verify certified doctors?",
		answer:
			"We partner exclusively with accredited medical centers and board-certified surgeons with proven track records and verified patient outcomes.",
	},
	{
		id: "03",
		question: "Are the prices transparent and all-inclusive?",
		answer:
			"Yes, our quotes are 100% transparent with zero hidden fees. Your personalized quotation covers the procedure, hospital stay, and agreed travel services.",
	},
	{
		id: "04",
		question: "How is post-operative follow-up handled after returning home?",
		answer:
			"Our clinical care team coordinates virtual follow-ups with your specialist and remains available 24/7 to monitor your healing journey.",
	},
];

export interface FaqSectionProps {
	className?: string;
	faqs?: FaqItem[];
}

export function FaqSection({ faqs = DEFAULT_FAQS }: FaqSectionProps) {
	return (
		<section id="faq">
			<SectionHeader
				subTitle="QUESTIONS & ANSWERS"
				title="Frequently Asked Questions"
				desc="Clear information, personal attention, and clinically guided decisions for your healthcare journey."
			/>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
				{/* Left Column: Shadcn Accordion in cards variant */}
				<div className="lg:col-span-7">
					<Accordion
						type="single"
						collapsible
						defaultValue="01"
						variant="cards"
					>
						{faqs.map((faq) => (
							<AccordionItem
								key={faq.id}
								value={faq.id}
								variant="card"
								className="border-none shadow-[0_1px_12px_0] shadow-primary/8"
							>
								<AccordionTrigger variant="card" iconVariant="plus">
									<span className="flex items-center gap-4 sm:gap-6">
										<span className="font-heading h3 text-primary shrink-0 w-8 sm:w-10">
											{faq.id}
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
				</div>

				{/* Right Column: FAQ Illustration */}
				<div className="lg:col-span-5 flex items-center justify-center max-lg:hidden">
					<div className="relative w-full aspect-4/3 max-w-md lg:max-w-none">
						<Image
							src="/images/faq-illustration.png"
							alt="Frequently Asked Questions"
							fill
							sizes="(max-width: 1024px) 100vw, 40vw"
							className="object-contain"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default FaqSection;
