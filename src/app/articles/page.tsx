import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ArticlesList } from "@/components/articles/articles-list";
import { ArticleCardSkeletonGrid } from "@/components/articles/skeletons";

export const metadata: Metadata = {
	title: "المقالات الطبية والمعرفية | Safe Health",
	description:
		"استكشف أحدث المقالات والإرشادات الطبية المعتمدة من كبار الجراحين والاستشاريين في مجالات التجميل والرعاية الصحية.",
};

export default function ArticlesPage() {
	return (
		<main className="flex flex-col flex-1">
			<PageHeader
				badge="KNOWLEDGE LIBRARY"
				title="Medical Articles & Research"
				description="Explore the latest certified medical articles, surgical guides, and clinical insights from leading specialists."
				badgeKey="articles.header.badge"
				titleKey="articles.header.title"
				descriptionKey="articles.header.description"
			/>

			<div className="container mb-20">
				<Suspense fallback={<ArticleCardSkeletonGrid count={6} />}>
					<ArticlesList />
				</Suspense>
			</div>
		</main>
	);
}
