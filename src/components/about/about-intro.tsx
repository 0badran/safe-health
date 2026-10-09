import Image from "next/image";
import {
	ShieldCheckIcon,
	StethoscopeIcon,
	UsersIcon,
	PlayIcon,
} from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";
import { Card, CardContent } from "@/components/ui/card";
import { AboutVideoDialog } from "./about-video-dialog";

export function AboutIntro() {
	const features = [
		{
			title: "ضمان أفضل تكلفة وجودة",
			description:
				"خطط علاجية واضحة وشفافة بدون أي مصاريف خفية، مع التزام تام بأعلى معايير السلامة والجودة العالمية.",
			icon: ShieldCheckIcon,
			colorClass: "bg-primary text-primary-foreground shadow-sm",
		},
		{
			title: "استشارات وتحليلات دقيقة",
			description:
				"تقييم سريري شامل للحالة المرضية بواسطة أحدث التقنيات لوضع الخطة العلاجية الأكثر ملاءمة ودقة.",
			icon: StethoscopeIcon,
			colorClass: "bg-secondary text-secondary-foreground shadow-sm",
		},
		{
			title: "فريق طبي معتمد ومحترف",
			description:
				"نخبة من كبار الجراحين والاستشاريين ومساعدي الرعاية المؤهلين لمرافقتك في جميع مراحل الاستشفاء.",
			icon: UsersIcon,
			colorClass: "bg-primary text-primary-foreground shadow-sm",
		},
	];

	return (
		<section className="py-16 md:py-24 bg-background">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Top Section Header */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
					<div className="lg:col-span-5 space-y-3">
						{/* Tag matching template: • ABOUT US • */}
						<SectionBadge>نبذة عن Safe Health</SectionBadge>

						{/* Headline with 2-color styling */}
						<h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
							<span className="text-primary">مقدمة عن</span> المنظومة الطبية
							الرائدة!
						</h2>
					</div>

					{/* Description Paragraphs side by side on desktop */}
					<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-muted-foreground leading-relaxed pt-2">
						<p>
							تأسست{" "}
							<strong className="text-foreground font-semibold">
								Safe Health
							</strong>{" "}
							لتكون الجسر الموثوق الذي يربط المرضى بأفضل المنشآت الطبية ونخبة
							الأطباء المتخصصين. نحن نؤمن بأن الرعاية الصحية حق يستحق أعلى درجات
							النزاهة والاحترافية.
						</p>
						<p>
							من خلال بنية رقمية حديثة، نعمل على تسهيل حجز المواعيد، التدقيق
							الطبي للتقارير، والتنسيق العلاجي المستمر، لنمنحك تجربة استشفائية
							متكاملة ومريحة تضع سلامتك في المقام الأول.
						</p>
					</div>
				</div>

				{/* 3 Feature Cards matching template */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
					{features.map((feature) => {
						const IconComponent = feature.icon;
						return (
							<Card
								key={feature.title}
								className="border bg-card/60 backdrop-blur-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1 py-0"
							>
								<CardContent className="p-6 flex items-start gap-4">
									<div
										className={`flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-lg ${feature.colorClass}`}
									>
										<IconComponent className="size-7" />
									</div>
									<div className="space-y-1.5">
										<h3 className="font-heading text-base font-bold text-foreground">
											{feature.title}
										</h3>
										<p className="text-xs text-muted-foreground leading-relaxed">
											{feature.description}
										</p>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* Overlapping Media Showcase matching template */}
				<div className="relative mx-auto max-w-5xl">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
						{/* Primary Big Photo */}
						<div className="lg:col-span-8 relative aspect-4/3 w-full overflow-hidden rounded-3xl border bg-muted shadow-2xl">
							<Image
								src="/images/about/team-workspace.jpg"
								alt="اجتماع فريق عمل Safe Health الطبي"
								fill
								sizes="(max-width: 1024px) 100vw, 65vw"
								className="object-cover object-center transition-transform duration-700 hover:scale-105"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
						</div>

						{/* Secondary Floating Video Thumbnail overlapping */}
						<div className="lg:col-span-6 lg:absolute lg:inset-e-0 lg:bottom-4 w-full lg:max-w-md">
							<div className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl border-4 border-background bg-card shadow-2xl transition-all duration-300">
								<Image
									src="/images/about/video-preview.jpg"
									alt="استشارة طبية رقمية مع استشاري Safe Health"
									fill
									sizes="(max-width: 1024px) 100vw, 40vw"
									className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

								{/* Center Play Button with Pulse Effect */}
								<div className="absolute inset-0 flex items-center justify-center">
									<AboutVideoDialog>
										<button
											type="button"
											className="relative flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-all duration-300 hover:scale-115 active:scale-95 hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-ring/50 cursor-pointer"
											aria-label="تشغيل الفيديو التعريفي"
										>
											<span className="absolute -inset-2 rounded-full bg-primary/30 animate-ping pointer-events-none" />
											<PlayIcon className="size-7 fill-current translate-x-0.5 rtl:-translate-x-0.5" />
										</button>
									</AboutVideoDialog>
								</div>

								{/* Micro label */}
								<div className="absolute bottom-3 inset-x-3 text-center">
									<span className="inline-block rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white">
										شاهد جولة تعريفية في دقيقتين
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
