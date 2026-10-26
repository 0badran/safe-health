"use client";

import { ArticleCard } from "@/components/articles/article-card";
import { SectionCarousel } from "@/components/shared/section-carousel";
import SectionHeader from "@/components/shared/section-header";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import type { BlogsApiResponse } from "@/types/blogs";
import type { HomeBlogsSection } from "@/types/home";

export interface BlogsSectionProps {
	data?: HomeBlogsSection;
}

export function BlogsSection({ data }: BlogsSectionProps = {}) {
	const { t } = useTranslation();

	const { data: apiResponse, isLoading } = useFetchData<BlogsApiResponse>({
		route: "/blogs",
		params: { per_page: "8" },
	});

	const posts = apiResponse?.data;

	if (!isLoading && (!posts || posts.length === 0)) {
		return null;
	}

	if (isLoading && !posts) {
		return null;
	}

	if (!data || !data.headline) {
		return null;
	}

	const subTitle = data.tag_text;
	const title = data.headline;

	return (
		<section id="blogs">
			<SectionHeader
				subTitle={subTitle}
				title={title}
				buttonText={t("blogs.viewAll")}
				buttonLink="/articles"
			/>

			<SectionCarousel
				items={posts ?? []}
				keyExtractor={(post) => String(post.id)}
				itemClassName="ps-4 basis-[70%] sm:basis-[40%] md:basis-[40%] lg:basis-1/3"
				contentClassName="-ms-4 py-2"
				renderItem={(post) => <ArticleCard article={post} />}
			/>
		</section>
	);
}

export default BlogsSection;
