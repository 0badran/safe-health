"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ClockIcon, CheckCircle2Icon, ArrowLeftIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBadge } from "@/components/shared/section-badge";

export function ArticlesList() {
	const [activeCategory, setActiveCategory] = React.useState("الكل");

	const categories = [
		"الكل",
		"طب الأسنان",
		"جراحات السمنة",
		"صحة العيون",
		"الخصوبة والإخصاب",
		"جراحات التجميل",
	];

	const articles = [
		{
			id: "dental-veneers-vs-zirconia",
			category: "طب الأسنان",
			title: "ابتسامة هوليوود الدائمة: الفينير مقابل الزيركون والفروق الجوهرية",
			excerpt:
				"تعرف على الفروق الإكلينيكية بين عدسات الفينير وتركيبات الزيركون من حيث القوة والشفافية والتكلفة ومدى ملاءمة كل نوع لحالتك.",
			readTime: "5 دقائق",
			doctorName: "د. هاري وارث",
			doctorRole: "استشاري طب وتجميل الأسنان",
			doctorImage: "/images/about/team-cmo.jpg",
			coverImage: "/images/about/video-preview.jpg",
		},
		{
			id: "gastric-sleeve-guide",
			category: "جراحات السمنة",
			title: "كل ما يجب معرفته قبل الخضوع لعملية تكميم المعدة بالمنظار",
			excerpt:
				"دليل تفصيلي لمؤشرات كتلة الجسم المناسبة، الفحوصات الاستباقية المطلوبة، والجدول الغذائي لمراحل التعافي لضمان الحفاظ على الوزن المثالي.",
			readTime: "8 دقائق",
			doctorName: "د. سوني ماديسون",
			doctorRole: "استشارية الجراحة العامة والمناظير",
			doctorImage: "/images/about/team-ceo.jpg",
			coverImage: "/images/how-it-works/hero-banner.jpg",
		},
		{
			id: "femto-lasik-vision-correction",
			category: "صحة العيون",
			title: "الفيمتو ليزك وتصحيح النظر: شروط الترشح للعملية ومراحل التعافي",
			excerpt:
				"كيف أحدثت تقنية ليزر الفيمتو ثانية ثورة في أمان تصحيح الإبصار؟ فحص سمك القرنية ودرجة الاستجماتيزم وسرعة العودة للحياة الطبيعية.",
			readTime: "4 دقائق",
			doctorName: "د. سارة جنكينز",
			doctorRole: "استشارية جراحة وتصحيح الإبصار",
			doctorImage: "/images/about/team-director.jpg",
			coverImage: "/images/contact/hero-banner.jpg",
		},
		{
			id: "ivf-success-factors",
			category: "الخصوبة والإخصاب",
			title: "نسب نجاح الحقن المجهري وأطفال الأنابيب: العوامل الطبية المؤثرة",
			excerpt:
				"قراءة إحصائية معتمدة حول بروتوكولات تحفيز التبويض، التشخيص الوراثي للأجنة PGT، والتقنيات الحديثة لرفع نسب الحمل التراكمية.",
			readTime: "7 دقائق",
			doctorName: "د. مايكل إيفانز",
			doctorRole: "استشاري علاج العقم وأطفال الأنابيب",
			doctorImage: "/images/about/team-supervisor.jpg",
			coverImage: "/images/about/hero-banner.jpg",
		},
		{
			id: "vaser-body-contouring",
			category: "جراحات التجميل",
			title:
				"نحت القوام والفيزر عالي الدقة: ما الفارق بينه وبين شفط الدهون التقليدي؟",
			excerpt:
				"توضيح دور الموجات فوق الصوتية في تفكيك الدهون بدقة متناهية مع شد الجلد المترهل وتحقيق إبراز العضلات المتناسق بأمان.",
			readTime: "5 دقائق",
			doctorName: "د. جيني هوب",
			doctorRole: "استشارية الرعاية والتنسيق الجراحي",
			doctorImage: "/images/about/team-director.jpg",
			coverImage: "/images/about/team-workspace.jpg",
		},
		{
			id: "rhinoplasty-expectations",
			category: "جراحات التجميل",
			title:
				"تجميل الأنف الوظيفي والجمالي: التوفيق بين التنفس والمظهر المتناسق",
			excerpt:
				"تعديل انحراف وتيرة الأنف مع الحفاظ على التناسق الطبيعي لملامح الوجه، وأهمية اختيار جراح متخصص في تشريح الوجه والأنف.",
			readTime: "6 دقائق",
			doctorName: "د. هاري وارث",
			doctorRole: "استشاري الجراحات الدقيقة",
			doctorImage: "/images/about/team-cmo.jpg",
			coverImage: "/images/about/video-preview.jpg",
		},
	];

	const filteredArticles =
		activeCategory === "الكل"
			? articles
			: articles.filter((a) => a.category === activeCategory);

	return (
		<section className="py-12 md:py-16 bg-muted/20 border-t">
			<div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header & Category Filter Buttons */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
					<div className="space-y-2">
						<SectionBadge>المكتبة المعرفية</SectionBadge>
						<h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
							أحدث المقالات والإرشادات الطبية
						</h2>
					</div>

					{/* Category Filter Pills */}
					<div className="flex flex-wrap items-center gap-1.5">
						{categories.map((category) => (
							<Button
								key={category}
								variant={activeCategory === category ? "default" : "outline"}
								size="sm"
								onClick={() => setActiveCategory(category)}
								className="text-xs transition-colors"
							>
								{category}
							</Button>
						))}
					</div>
				</div>

				{/* Articles Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredArticles.map((article) => (
						<Card
							key={article.id}
							className="border bg-card shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden group py-0"
						>
							<div className="space-y-4">
								{/* Thumbnail Image */}
								<div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
									<Image
										src={article.coverImage}
										alt={article.title}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute top-3 inset-s-3">
										<Badge variant="secondary" className="backdrop-blur-md">
											{article.category}
										</Badge>
									</div>
								</div>

								{/* Details */}
								<CardContent className="p-5 pt-0 space-y-3">
									<div className="flex items-center gap-2 text-xs text-muted-foreground">
										<ClockIcon className="size-3 text-primary" />
										<span>{article.readTime} قراءة</span>
									</div>

									<h3 className="font-heading text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
										{article.title}
									</h3>

									<p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
										{article.excerpt}
									</p>
								</CardContent>
							</div>

							{/* Doctor Footer */}
							<div className="p-5 pt-3 border-t border-border/60 flex items-center justify-between mt-auto">
								<div className="flex items-center gap-2.5">
									<div className="relative size-8 overflow-hidden rounded-full border bg-muted">
										<Image
											src={article.doctorImage}
											alt={article.doctorName}
											fill
											sizes="32px"
											className="object-cover"
										/>
									</div>
									<div className="flex flex-col text-start">
										<span className="text-xs font-bold text-foreground flex items-center gap-1">
											{article.doctorName}
											<CheckCircle2Icon className="size-2.5 text-primary" />
										</span>
										<span className="text-[10px] text-muted-foreground">
											{article.doctorRole}
										</span>
									</div>
								</div>

								<Button
									asChild
									variant="ghost"
									size="sm"
									className="gap-1 px-2"
								>
									<Link
										href="/contact"
										aria-label={`استفسر عن ${article.title}`}
									>
										<span className="text-xs font-semibold">استفسر</span>
										<ArrowLeftIcon className="size-3 rtl:rotate-0 rotate-180" />
									</Link>
								</Button>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
