import Link from "next/link";
import Image from "next/image";
import {
	ClockIcon,
	CalendarIcon,
	CheckCircle2Icon,
	ArrowLeftIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBadge } from "@/components/shared/section-badge";

export function ArticlesFeatured() {
	return (
		<section className="py-12 md:py-16 bg-background">
			<div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-8 space-y-2">
					<SectionBadge>المقال المميز</SectionBadge>
					<h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
						قراءة سريرية موصى بها
					</h2>
				</div>

				<Card className="border bg-card/70 backdrop-blur-xs overflow-hidden transition-all duration-300 hover:shadow-xl py-0">
					<CardContent className="p-0">
						<div className="grid grid-cols-1 lg:grid-cols-12 items-center">
							{/* Featured Image */}
							<div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto lg:h-full min-h-75 w-full bg-muted">
								<Image
									src="/images/about/team-workspace.jpg"
									alt="دليل تقنيات زراعة الشعر"
									fill
									sizes="(max-width: 1024px) 100vw, 50vw"
									className="object-cover object-center"
								/>
								<div className="absolute top-4 inset-s-4">
									<Badge variant="default" className="shadow-xs">
										دليل طبي شامل
									</Badge>
								</div>
							</div>

							{/* Content Details */}
							<div className="lg:col-span-6 p-6 sm:p-10 space-y-5">
								<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
									<Badge variant="secondary">زراعة الشعر</Badge>
									<span className="flex items-center gap-1">
										<ClockIcon className="size-3.5 text-primary" />
										<span>6 دقائق قراءة</span>
									</span>
									<span className="flex items-center gap-1">
										<CalendarIcon className="size-3.5 text-primary" />
										<span>مُحدّث لعام 2026</span>
									</span>
								</div>

								<div className="space-y-2.5">
									<h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-snug">
										دليل متكامل: كيف تختار تقنية زراعة الشعر الأنسب لحالتك (FUE
										مقابل DHI)؟
									</h3>
									<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
										مقارنة طبية موضوعية تستعرض الفروق الجوهرية بين اقتطاف
										البصيلات FUE وأقلام تشوي DHI، مع معايير الكثافة، فترات
										الاستشفاء، وكيفية تحديد الجراح المؤهل لتجنب المضاعفات.
									</p>
								</div>

								{/* Author Byline */}
								<div className="flex items-center justify-between pt-4 border-t border-border/60">
									<div className="flex items-center gap-3">
										<div className="relative size-10 overflow-hidden rounded-full border bg-muted">
											<Image
												src="/images/about/team-ceo.jpg"
												alt="د. سوني ماديسون"
												fill
												sizes="40px"
												className="object-cover"
											/>
										</div>
										<div className="flex flex-col text-start">
											<div className="flex items-center gap-1">
												<span className="text-xs font-bold text-foreground">
													د. سوني ماديسون
												</span>
												<CheckCircle2Icon className="size-3 text-primary" />
											</div>
											<span className="text-[11px] text-muted-foreground">
												استشارية الجراحة والترميم الطبي
											</span>
										</div>
									</div>

									<Button asChild variant="outline" size="sm">
										<Link href="/contact" className="gap-1.5">
											<span>استفسر عن العلاج</span>
											<ArrowLeftIcon className="size-3.5 rtl:rotate-0 rotate-180" />
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
