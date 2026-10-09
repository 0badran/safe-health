import {
	FileTextIcon,
	UserCheckIcon,
	CalendarCheckIcon,
	HeartHandshakeIcon,
} from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorksSteps() {
	const steps = [
		{
			stepNumber: "01",
			title: "طلب الاستشارة وتقييم الحالة",
			description:
				"شارك تفاصيل حالتك وتقاريرك الطبية بسهولة عبر منصتنا. يقوم فريقنا الطبي بدراستها وتقديم تقييم أولي دقيق مجاناً.",
			icon: FileTextIcon,
			details: [
				"مراجعة سريرية مستقلة لتقاريرك",
				"استشارة مجانية 100% بدون أي التزام",
				"رد استشاري خلال أقل من ساعتين",
			],
		},
		{
			stepNumber: "02",
			title: "مطابقة الطبيب وخطة العلاج",
			description:
				"نصلك بأفضل كبار الجراحين والمراكز المعتمدة. تستلم خطة علاجية مخصصة وعروض أسعار شفافة وثابتة قبل اتخاذ أي قرار.",
			icon: UserCheckIcon,
			details: [
				"سير ذاتية موثقة ونسب نجاح معتمدة",
				"أسعار شاملة وثابتة بدون رسوم خفية",
				"إمكانية مناقشة الحالة مباشرة مع الجراح",
			],
		},
		{
			stepNumber: "03",
			title: "تنسيق الموعد والإجراء الطبي",
			description:
				"نتولى تنظيم كافة التفاصيل اللوجستية والطبية: تثبيت المواعيد، استقبال المريض، والتحضيرات السريرية بأعلى معايير الأمان.",
			icon: CalendarCheckIcon,
			details: [
				"تنسيق المواعيد في أفضل المستشفيات",
				"مساعد شخصي مخصص لمرافقتك",
				"مستشفيات حاصلة على اعتمادات JCI",
			],
		},
		{
			stepNumber: "04",
			title: "المتابعة السريرية والتعافي",
			description:
				"تستمر رعايتنا بعد انتهاء الإجراء؛ نوفر برنامج متابعة دوري مع فريقك الطبي لضمان استقرار حالتك وتحقيق أفضل نتائج.",
			icon: HeartHandshakeIcon,
			details: [
				"جدول متابعة دوري بعد العلاج",
				"تواصل فوري مع الفريق الطبي 24/7",
				"ضمان رعاية ممتد لمرحلة ما بعد التعافي",
			],
		},
	];

	return (
		<section className="py-16 md:py-24 bg-background">
			<div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center space-y-3 mb-16 max-w-2xl mx-auto">
					<SectionBadge>خطوات رحلتك العلاجية</SectionBadge>

					<h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
						<span className="text-primary">4 خطوات بسيطة</span> لرحلة استشفاء
						آمنة
					</h2>

					<p className="text-sm text-muted-foreground leading-relaxed">
						صممنا كل مرحلة من رحلتك لتكون واضحة، سهلة، ومريحة، لتتفرغ تماماً
						لصحتك وتعافيك مع نخبة من الخبراء.
					</p>
				</div>

				{/* Steps Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{steps.map((step) => {
						const IconComponent = step.icon;
						return (
							<Card
								key={step.stepNumber}
								className="border bg-card/70 backdrop-blur-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group py-0"
							>
								<CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
									<div className="space-y-4">
										{/* Step Header with Step Badge & Icon */}
										<div className="flex items-center justify-between">
											<div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
												<IconComponent className="size-6" />
											</div>
											<span className="font-heading text-2xl font-black text-muted-foreground/30 group-hover:text-primary transition-colors">
												{step.stepNumber}
											</span>
										</div>

										<div className="space-y-2">
											<h3 className="font-heading text-lg font-bold text-foreground">
												{step.title}
											</h3>
											<p className="text-xs text-muted-foreground leading-relaxed">
												{step.description}
											</p>
										</div>
									</div>

									{/* Feature Checklist */}
									<ul className="space-y-2 pt-4 border-t border-border/60 text-xs text-foreground/80">
										{step.details.map((detail) => (
											<li key={detail} className="flex items-center gap-2">
												<div className="size-1.5 rounded-full bg-primary shrink-0" />
												<span>{detail}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
