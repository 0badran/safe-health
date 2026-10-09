import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ContactCards } from "@/components/contact/contact-cards";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
	title: "اتصل بنا | Safe Health للرعاية الطبية والاستشارات",
	description:
		"تواصل مع فريق Safe Health الطبي لحجز الاستشارات الطبية، معرفة التكاليف والخيارات العلاجية، وتنسيق الرعاية المباشرة على مدار الساعة.",
};

export default function ContactPage() {
	return (
		<main className="flex flex-col flex-1">
			{/* Reusable PageHero with Contact banner */}
			<PageHero
				title="اتصل بنا"
				imageSrc="/images/contact/hero-banner.jpg"
				imageAlt="استقبال واستشارات Safe Health الطبية"
				breadcrumbs={[{ label: "اتصل بنا" }]}
				description="نحن هنا لمساعدتك في كل استفسار وتوجيهك إلى أفضل رعاية طبية متخصصة مع نخبة من الجراحين والاستشاريين المعتمدين."
			/>

			{/* Main Content: 2-column Grid matching the template layout */}
			<section className="py-16 md:py-24 bg-background">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
						{/* Column 1: 4 Contact Cards & Location Map */}
						<div className="lg:col-span-6">
							<ContactCards />
						</div>

						{/* Column 2: Contact Form */}
						<div className="lg:col-span-6">
							<ContactForm />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
