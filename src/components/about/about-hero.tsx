import { PageHero } from "@/components/shared/page-hero";

export function AboutHero() {
	return (
		<PageHero
			title="من نحن"
			imageSrc="/images/about/hero-banner.jpg"
			imageAlt="فريق Safe Health الطبي والإداري"
			breadcrumbs={[{ label: "عن Safe Health" }]}
			description="رؤيتنا ترتكز على إتاحة رعاية طبية موثوقة وعالمية الجودة عبر دمج خبرات الاستشاريين المعتمدين مع أحدث حلول إدارة الرعاية الصحية الرقمية."
		/>
	);
}
