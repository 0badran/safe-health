import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ContactCards } from "@/components/contact/contact-cards";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
	title: "اتصل بنا | Contact Us | Safe Health",
	description:
		"تواصل مع فريق Safe Health الطبي لحجز الاستشارات الطبية، معرفة التكاليف والخيارات العلاجية، وتنسيق الرعاية المباشرة على مدار الساعة. Connect with our medical coordinators for personalized care.",
};

export default function ContactPage() {
	return (
		<main className="flex flex-col flex-1">
			{/* PageHeader with grid background, section badge and fluid display heading */}
			<PageHeader
				badge="GET IN TOUCH"
				title="We're Here to Guide Your Health Journey."
				description="Connect with our international care specialists for consultations, treatment options, personalized pricing, and seamless medical coordination."
				badgeKey="contact.header.badge"
				titleKey="contact.header.title"
				descriptionKey="contact.header.description"
			/>

			{/* Main Content: 2-column Grid matching the project layout & theme */}
			<section className="container">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
					{/* Column 1: 4 Contact Cards & Location Map */}
					<div className="lg:col-span-6">
						<ContactCards />
					</div>

					{/* Column 2: Contact Form */}
					<div className="lg:col-span-6">
						<ContactForm />
					</div>
				</div>
			</section>
		</main>
	);
}
