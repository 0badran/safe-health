import {
	ShieldCheckIcon,
	CheckCircle2Icon,
	ClockIcon,
	AwardIcon,
} from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorksStandards() {
	const standards = [
		{
			title: "فحص وتدقيق التراخيص بنسبة 100%",
			description:
				"لا ينضم إلى شبكتنا سوى كبار الاستشاريين والجراحين المرخصين رسمياً مع مراجعة مستقلة لعدد العمليات ونسب النجاح والشهادات الدولية.",
			icon: ShieldCheckIcon,
		},
		{
			title: "ضمان مطابقة الأسعار والشفافية",
			description:
				"عروض أسعار واضحة ومحددة مسبقاً قبل أي خطوة، تشمل كافة الإجراءات والخدمات بدون أي تكاليف خفية أو مفاجآت بعد العملية.",
			icon: CheckCircle2Icon,
		},
		{
			title: "مرافقة استشارية مجانية على مدار الساعة",
			description:
				"فريق استشاري مخصص لمرافقتك والإجابة عن كل تساؤل، بدءاً من حجز الموعد وحتى الاطمئنان الكامل على تعافيك النهائي.",
			icon: ClockIcon,
		},
		{
			title: "مستشفيات معتمدة دولياً (JCI & ISO)",
			description:
				"نتعاون حصراً مع منشآت ومراكز طبية تطبق بروتوكولات الأمان السريرية ومكافحة العدوى المعتمدة من الهيئات الصحية العالمية.",
			icon: AwardIcon,
		},
	];

	return (
		<section className="py-16 md:py-24 bg-muted/40 border-y">
			<div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
					{/* Left Column: Context & Overview */}
					<div className="lg:col-span-5 space-y-4">
						<SectionBadge>معايير الأمان والجودة</SectionBadge>

						<h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
							معايير تدقيق صارمة{" "}
							<span className="text-primary">لا نقبل المساومة عليها</span>
						</h2>

						<p className="text-sm text-muted-foreground leading-relaxed">
							سلامتك هي أولويتنا المطلقة. لذلك وضعنا نظام تدقيق سريري صارم
							(SafeScore™) يخضع له كل طبيب ومركز علاجي قبل إتاحته للمرضى عبر
							المنظومة.
						</p>

						<div className="pt-2">
							<div className="inline-flex items-center gap-3 rounded-2xl bg-card p-4 border shadow-xs">
								<div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
									<AwardIcon className="size-5" />
								</div>
								<div className="flex flex-col text-start">
									<span className="text-xs font-bold text-foreground">
										بروتوكول SafeScore™ المعتمد
									</span>
									<span className="text-[11px] text-muted-foreground">
										تدقيق شامل يشمل أكثر من 30 معيار أمان طبي
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column: 4 Standards Cards */}
					<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
						{standards.map((standard) => {
							const IconComponent = standard.icon;
							return (
								<Card
									key={standard.title}
									className="border bg-card shadow-xs transition-all duration-300 hover:shadow-md py-0"
								>
									<CardContent className="p-6 space-y-3">
										<div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
											<IconComponent className="size-5" />
										</div>
										<div className="space-y-1">
											<h3 className="font-heading text-sm sm:text-base font-bold text-foreground">
												{standard.title}
											</h3>
											<p className="text-xs text-muted-foreground leading-relaxed">
												{standard.description}
											</p>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
