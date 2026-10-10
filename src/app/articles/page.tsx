import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ArticlesFeatured } from "@/components/articles/articles-featured";
import { ArticlesList } from "@/components/articles/articles-list";
import { ArticlesNewsletter } from "@/components/articles/articles-newsletter";

export const metadata: Metadata = {
	title: "المقالات الطبية والمعرفية | Safe Health",
	description:
		"استكشف أحدث المقالات والإرشادات الطبية المعتمدة من كبار الجراحين والاستشاريين في زراعة الشعر، طب الأسنان، جراحات السمنة، وتصحيح النظر.",
};

export default function ArticlesPage() {
	return (
		<main className="flex flex-col flex-1">
			{/* Hero Banner with Breadcrumbs */}
			<PageHero
				title="المقالات"
				imageSrc="/images/articles/hero-banner.jpg"
				imageAlt="المقالات والأبحاث الطبية المعتمدة في منصة Safe Health"
				breadcrumbs={[{ label: "المقالات" }]}
			/>

			{/* Featured Flagship Article */}
			<ArticlesFeatured />

			{/* Category Filterable Article Grid */}
			<ArticlesList />

			{/* Clinical Newsletter & Updates */}
			<ArticlesNewsletter />
		</main>
	);
}
