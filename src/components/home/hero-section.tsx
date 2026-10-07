"use client"
import Image from "next/image";
import Link from "next/link";
import {
	SearchIcon,
	ShieldCheckIcon,
	StarIcon,
	SparklesIcon,
	HeartPulseIcon,
	AwardIcon,
	CheckCircle2Icon,
	ClockIcon,
	ArrowLeftIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function HeroSection() {
	const popularTags = [
		{ label: "زراعة الشعر", href: "#treatments" },
		{ label: "ابتسامة هوليوود", href: "#treatments" },
		{ label: "تجميل الأنف", href: "#treatments" },
		{ label: "تكميم المعدة", href: "#treatments" },
		{ label: "تصحيح النظر", href: "#treatments" },
	];

	const trustBadges = [
		{
			icon: ShieldCheckIcon,
			title: "أطباء ومراكز معتمدة 100%",
			desc: "تدقيق صارم لتراخيص وخبرات الجراحين",
		},
		{
			icon: AwardIcon,
			title: "معايير جودة دولية",
			desc: "مستشفيات حاصلة على اعتمادات JCI و ISO",
		},
		{
			icon: CheckCircle2Icon,
			title: "ضمان شفافية التكلفة",
			desc: "عروض أسعار ثابتة ومباشرة بدون رسوم خفية",
		},
		{
			icon: ClockIcon,
			title: "متابعة واستشارة 24/7",
			desc: "فريق طبي مخصص لمرافقتك في كل خطوة",
		},
	];

	return (
		<section className="relative overflow-hidden bg-background pt-8 pb-16 md:pt-14 md:pb-24">
			{/* Decorative background aura */}
			<div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden">
				<div className="h-100 w-200 rounded-full bg-secondary/50 blur-3xl" />
			</div>

			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
					{/* Left / Start Column: Value proposition & Search */}
					<div className="flex flex-col space-y-6 lg:col-span-7">
						{/* Trust Pill */}
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="gap-1.5 py-1 px-3 text-xs">
								<SparklesIcon className="size-3.5 text-accent-foreground" />
								<span>المنصة الأولى المعتمدة للرعاية التخصصية</span>
							</Badge>
						</div>

						{/* Main Headline */}
						<h1 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
							رعايتك الطبية بأيدي{" "}
							<span className="text-foreground">أفضل الأطباء والمراكز</span> المعتمدة
						</h1>

						{/* Subtitle */}
						<p className="max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
							نساعدك في اختيار الطبيب الجراح الأنسب لحالتك، ومقارنة التكاليف بكل شفافية، وتنسيق خطتك العلاجية مع استشارات مجانية ومتابعة شخصية مستمرة.
						</p>

						{/* Interactive Treatment Search Card */}
						<div className="rounded-3xl border bg-card p-3 sm:p-4 shadow-sm text-card-foreground">
							<form
								onSubmit={(e) => e.preventDefault()}
								className="flex flex-col gap-3 sm:flex-row sm:items-center"
							>
								<div className="relative flex-1">
									<SearchIcon className="absolute inset-s-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										type="text"
										placeholder="ابحث عن العملية، التخصص، أو اسم الطبيب..."
										className="h-12 ps-10 pe-4 text-sm rounded-2xl"
									/>
								</div>
								<Button
									type="submit"
									variant="default"
									size="lg"
									className="h-12 px-6 rounded-2xl font-semibold gap-2 shrink-0"
								>
									<span>بحث وتوافر الأطباء</span>
									<ArrowLeftIcon className="size-4 rtl:rotate-0" />
								</Button>
							</form>

							{/* Popular Quick Search Pills */}
							<div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t">
								<span className="text-xs font-medium text-muted-foreground">
									العلاجات الشائعة:
								</span>
								{popularTags.map((tag) => (
									<Button
										key={tag.label}
										variant="ghost"
										size="xs"
										asChild
									>
										<Link href={tag.href}>
											<Badge variant="outline">
												{tag.label}
											</Badge>
										</Link>
									</Button>
								))}
							</div>
						</div>

						{/* Micro Trust Stats */}
						<div className="grid grid-cols-3 gap-4 pt-2">
							<div className="flex flex-col">
								<span className="font-heading text-2xl sm:text-3xl font-bold text-primary">
									+25,000
								</span>
								<span className="text-xs text-muted-foreground">
									مريض تمت خدمتهم
								</span>
							</div>

							<div className="flex flex-col border-s ps-4">
								<div className="flex items-center gap-1 font-heading text-2xl sm:text-3xl font-bold text-foreground">
									<span>4.9</span>
									<StarIcon className="size-5 fill-amber-400 text-amber-400" />
								</div>
								<span className="text-xs text-muted-foreground">
									تقييم من أكثر من 5,000 مريض
								</span>
							</div>

							<div className="flex flex-col border-s ps-4">
								<span className="font-heading text-2xl sm:text-3xl font-bold text-primary">
									100%
								</span>
								<span className="text-xs text-muted-foreground">
									أطباء ومستشفيات معتمدة
								</span>
							</div>
						</div>
					</div>

					{/* Right / End Column: Hero Visual with Floating Trust Badges */}
					<div className="relative lg:col-span-5">
						<div className="relative mx-auto max-w-md lg:max-w-none">
							{/* Doctor Image Container */}
							<div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border bg-card shadow-2xl">
								<Image
									src="/images/hero-doctor.jpg"
									alt="استشارة طبية متخصصة في Safe Health"
									fill
									priority
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
									className="object-cover object-center"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

								{/* Bottom In-Image Badge */}
								<div className="absolute bottom-4 inset-x-4 flex items-center justify-between rounded-2xl bg-card/90 p-3.5 backdrop-blur-md shadow-lg border">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
											<HeartPulseIcon className="size-5" />
										</div>
										<div className="flex flex-col">
											<span className="text-xs font-bold text-foreground">
												فريق استشاري معتمد
											</span>
											<span className="text-[11px] text-muted-foreground">
												مرافقة طبية مجانية بدون التزام
											</span>
										</div>
									</div>
									<Badge variant="secondary">
										متاح الآن
									</Badge>
								</div>
							</div>

							{/* Floating Top Rating Card */}
							<div className="absolute -top-5 inset-s-4 sm:-inset-s-6 flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-xl text-card-foreground">
								<div className="flex size-9 items-center justify-center rounded-xl bg-amber-400/15 text-amber-500">
									<StarIcon className="size-5 fill-amber-400 text-amber-400" />
								</div>
								<div className="flex flex-col">
									<span className="text-xs font-bold">تقييم موثق 4.9 ★</span>
									<span className="text-[10px] text-muted-foreground">
										أعلى معايير الرضا والنتائج
									</span>
								</div>
							</div>

							{/* Floating Side Guarantee Badge */}
							<div className="hidden sm:flex absolute -bottom-5 inset-e-4 items-center gap-2.5 rounded-2xl border bg-card p-3 shadow-xl text-card-foreground">
								<div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
									<ShieldCheckIcon className="size-5" />
								</div>
								<div className="flex flex-col">
									<span className="text-xs font-bold">ضمان مطابقة الأسعار</span>
									<span className="text-[10px] text-muted-foreground">
										أفضل تكلفة مباشرة من المشافي
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Under-Hero Accreditations & Standards Bar */}
				<div className="mt-16 rounded-3xl border bg-card p-6 shadow-sm">
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{trustBadges.map((badge) => {
							const IconComponent = badge.icon;
							return (
								<div key={badge.title} className="flex items-center gap-3.5">
									<div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
										<IconComponent className="size-5.5" />
									</div>
									<div className="flex flex-col">
										<span className="text-sm font-bold text-foreground">
											{badge.title}
										</span>
										<span className="text-xs text-muted-foreground">
											{badge.desc}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
