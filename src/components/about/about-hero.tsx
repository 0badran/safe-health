import { PageHero } from "@/components/shared/page-hero";

export function AboutHero() {
	return (
		<PageHero
			title="من نحن"
			imageSrc="/images/about/hero-banner.jpg"
			imageAlt="فريق Safe Health الطبي والإداري"
			breadcrumbs={[{ label: "عن Safe Health" }]}
		/>
	);
}
